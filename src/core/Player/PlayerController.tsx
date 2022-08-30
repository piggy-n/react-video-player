import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/playerController.scss';
import { useContext, useRef } from 'react';
import { useRafInterval, useReactive } from 'ahooks';
import { VideoContext } from '@/utils/hooks/useVideoContext';
import type { PlayerControllerInterface, PlayerControllerProps } from '@/core/Player/type';
import type { Timeout } from 'ahooks/es/useRequest/src/types';

const cn = 'Player-Controller';

const PlayerController: PlayerControllerInterface = (
    {
        resizing
    }: PlayerControllerProps
) => {
    const { dispatch } = useContext(VideoContext);

    const playerControllerRef = useRef<HTMLDivElement>(null);
    const inactivityTimeoutRef = useRef<Timeout | null>(null);

    const mouseState = useReactive({
        mouseIsMoving: false,
        mouseIsOnController: false,
    });

    const playerControllerVisibleHandler = (status: 'enter' | 'leave') => {
        dispatch({
            type: 'controlled',
            payload: status === 'enter' && !resizing,
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
                payload: true,
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
            />
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