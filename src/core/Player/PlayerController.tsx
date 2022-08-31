import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/playerController.scss';
import { useContext, useRef } from 'react';
import { useRafInterval, useReactive } from 'ahooks';
import { VideoContext } from '@/utils/hooks/useVideoContext';
import { LayoutContext } from '@/utils/hooks/useLayoutContext';
import type { PlayerControllerInterface } from '@/core/Player/type';
import Icon from '@/components/Icon';

const cn = 'Player-Controller';

const PlayerController: PlayerControllerInterface = () => {
    const { resizing } = useContext(LayoutContext);
    const {
        dispatch,
        changePlayStatusHandler,
        playing,
        ended,
        totalTime,
        currentTime,
    } = useContext(VideoContext);

    const playerControllerRef = useRef<HTMLDivElement>(null);
    const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const mouseState = useReactive({
        mouseIsMoving: false,
        mouseIsOnController: false,
    });

    const playerControllerVisibleHandler = (status: 'enter' | 'leave') => {
        dispatch({
            type: 'controlled',
            payload: status === 'enter' && !resizing && !ended,
        });
    };

    const playerControllerMouseStatusHandler = (status: 'move' | 'leave') => {
        if (status === 'move') {
            mouseState.mouseIsMoving = true;
            mouseState.mouseIsOnController = false;
        }

        if (status === 'leave') {
            mouseState.mouseIsMoving = false;
        }
    };

    const controllerPanelMouseStatusHandler = (status: 'enter' | 'leave') => {
        mouseState.mouseIsOnController = status === 'enter';
    };

    const mouseAndControllerStyleChangeHandler = () => {
        if (mouseState.mouseIsMoving) {
            playerControllerMouseStatusHandler('leave');

            dispatch({
                type: 'controlled',
                payload: !resizing && !ended,
            });

            inactivityTimeoutRef.current && clearTimeout(inactivityTimeoutRef.current);
            inactivityTimeoutRef.current = setTimeout(
                () => {
                    if (
                        !mouseState.mouseIsMoving &&
                        !mouseState.mouseIsOnController
                    ) {
                        dispatch({
                            type: 'controlled',
                            payload: false,
                        });
                    }
                },
                2000
            );
        }
    };

    const endBtnClickHandler = () => {
        changePlayStatusHandler && changePlayStatusHandler();
        playerControllerVisibleHandler('enter');
    };

    useRafInterval(
        mouseAndControllerStyleChangeHandler,
        200,
        {
            immediate: true,
        }
    );

    return (
        <div
            ref={playerControllerRef}
            className={classes(cn, '')}
            onMouseEnter={() => playerControllerVisibleHandler('enter')}
            onMouseLeave={() => playerControllerVisibleHandler('leave')}
        >
            <div
                className={classes(cn, 'play-or-pause-wrapper')}
                onMouseMove={() => playerControllerMouseStatusHandler('move')}
                onMouseLeave={() => playerControllerMouseStatusHandler('leave')}
                onClick={() => changePlayStatusHandler && changePlayStatusHandler()}
            />
            <div
                className={classes(cn, 'pause-or-replay-btn')}
                onClick={() => changePlayStatusHandler && changePlayStatusHandler()}
            >
                {
                    !playing && !ended &&
                    <Icon name={'player'} size={55}/>
                }
            </div>
            <div
                className={classes(cn, 'pause-or-replay-btn')}
                onClick={endBtnClickHandler}
            >
                {
                    ended &&
                    <Icon name={'replay'} size={55}/>
                }
            </div>
            <div
                className={classes(cn, 'controller-and-progress-wrapper')}
                onMouseEnter={() => controllerPanelMouseStatusHandler('enter')}
                onMouseLeave={() => controllerPanelMouseStatusHandler('leave')}
            >
                <PlayerController.ProgressBar/>
                <PlayerController.Panel/>
            </div>
        </div>
    );
};

PlayerController.ProgressBar = require('./ProgressBar').default;
PlayerController.Panel = require('./ControlPanel').default;

export default PlayerController;