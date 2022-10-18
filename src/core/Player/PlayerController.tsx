import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/playerController.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDebounceEffect, useRafInterval, useReactive } from 'ahooks';
import screenfull from 'screenfull';
import { VideoContext } from '@/utils/hooks/useVideoContext';
import Icon from '@/components/Icon';
import { useVideo } from '@/utils/hooks/useVideo';
import type { PlayerControllerInterface } from '@/core/Player/type';

const cn = 'Player-Controller';

const PlayerController: PlayerControllerInterface = () => {
    const {
        dispatch,
        videoEle,
        videoContainerEle,
        isLive,
        fullScreen = true,
        streamPlayer,
        videoModel: {
            waiting,
            error,
            downloading,
            resizing
        }
    } = useContext(VideoContext);

    const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [playBtnVisible, setPlayBtnVisible] = useState<boolean>(false);

    const mouseState = useReactive({
        mouseIsMoving: false,
        mouseIsOnController: false,
        mouseClickCount: 0,
    });

    const {
        changePlayStatusHandler,
        playing,
        ended,
        readyState,
        networkState
    } = useVideo(
        videoEle as HTMLVideoElement,
        [videoEle]
    );

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
                5000
            );
        }
    };

    const endBtnClickHandler = () => {
        changePlayStatusHandler && changePlayStatusHandler();

        playerControllerVisibleHandler('enter');
    };

    const pauseOrReplayBtnClickHandler = () => {
        if (waiting || downloading || error) return;
        if (isLive && ended) return;

        if (isLive) {
            playing ? streamPlayer.stop() : streamPlayer.start();
        }

        changePlayStatusHandler && changePlayStatusHandler();
    };

    const clickHandler = () => {
        if (error) return;
        mouseState.mouseClickCount += 1;

        clickTimeoutRef.current && clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = setTimeout(
            () => {
                if (mouseState.mouseClickCount === 1) {
                    pauseOrReplayBtnClickHandler();
                }

                if (mouseState.mouseClickCount === 2 && fullScreen) {
                    if (screenfull.isEnabled) {
                        screenfull.toggle(videoContainerEle as HTMLDivElement);
                        screenfull.on('change', () => {
                            dispatch({
                                type: 'isFullscreen',
                                payload: screenfull.isFullscreen,
                            });
                        });
                    }
                }

                mouseState.mouseClickCount = 0;
            },
            300);
    };

    useRafInterval(
        mouseAndControllerStyleChangeHandler,
        200,
        {
            immediate: true,
        }
    );

    useEffect(
        () => {
            dispatch({
                type: 'waiting',
                payload: networkState === 2 && readyState <= 1
            });

            dispatch({
                type: 'error',
                payload: networkState === 3 || networkState === 0 || readyState === 0
            });
        },
        [
            networkState,
            readyState
        ]
    );

    useEffect(
        () => {
            if (playing || ended || waiting || downloading || error) {
                setPlayBtnVisible(false);
            }
        },
        [
            playing,
            ended,
            waiting,
            downloading
        ]
    );

    useDebounceEffect(
        () => {
            if (!playing && !ended && !waiting && !downloading && !error) {
                setPlayBtnVisible(true);
            }
        },
        [
            playing,
            ended,
            waiting,
            downloading
        ],
        {
            wait: 100,
        }
    );

    return (
        <div
            className={classes(cn, '')}
            style={{ backgroundColor: (ended || !playing) && !waiting && !error ? 'rgba(0, 0, 0, 0.5)' : 'transparent' }}
            onMouseEnter={() => playerControllerVisibleHandler('enter')}
            onMouseLeave={() => playerControllerVisibleHandler('leave')}
        >
            <div
                className={classes(cn, 'play-or-pause-wrapper')}
                onMouseMove={() => playerControllerMouseStatusHandler('move')}
                onMouseLeave={() => playerControllerMouseStatusHandler('leave')}
                onClick={clickHandler}
            />
            <div
                className={classes(cn, 'pause-or-replay-btn')}
                onClick={pauseOrReplayBtnClickHandler}
            >
                {
                    playBtnVisible &&
                    <Icon name={'player'} size={55} title={'播放'}/>
                }
            </div>
            <div
                className={classes(cn, 'pause-or-replay-btn')}
                onClick={endBtnClickHandler}
            >
                {
                    ended && !isLive &&
                    <Icon name={'replay'} size={55} title={'重播'}/>
                }
            </div>
            <div
                className={classes(cn, 'controller-and-progress-wrapper')}
                onMouseEnter={() => controllerPanelMouseStatusHandler('enter')}
                onMouseLeave={() => controllerPanelMouseStatusHandler('leave')}
            >
                {
                    !isLive &&
                    <PlayerController.ProgressBar/>
                }
                <PlayerController.Panel/>
            </div>
        </div>
    );
};

PlayerController.ProgressBar = require('./ProgressBar').default;
PlayerController.Panel = require('./ControlPanel').default;

export default PlayerController;
