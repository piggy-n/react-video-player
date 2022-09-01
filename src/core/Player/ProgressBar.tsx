import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/progressBar.scss';
import type { MouseEventHandler } from 'react';
import { useContext, useEffect, useMemo, useRef } from 'react';
import { VideoContext } from '@/utils/hooks/useVideoContext';
import { useVideo } from '@/utils/hooks/useVideo';
import useWindowClient from '@/utils/hooks/useWindowClient';
import { useProgressBarModel } from '@/utils/hooks/useProgressBarModel';
import { hoverStylesHandler } from '@/utils/methods/hoverStylesHandler';
import { percentToSeconds, toMinutesAndSeconds } from '@/utils/methods/time';

const cn = 'Progress-Bar';

const ProgressBar = () => {
    const {
        videoModel: {
            controlled
        },
        videoEle
    } = useContext(VideoContext);

    const distanceOfClientXRef = useRef<number>(0);
    const progressMaskRef = useRef<HTMLDivElement>(null);
    const progressWrapperRef = useRef<HTMLDivElement>(null);
    const progressControlPointRef = useRef<HTMLDivElement>(null);
    const aIntervalRef = useRef<NodeJS.Timer | null>(null);
    const bIntervalRef = useRef<NodeJS.Timer | null>(null);

    const {
        progressBarModel: {
            suspending,
            dragging,
            percentage,
            position
        },
        dispatch
    } = useProgressBarModel();

    const {
        currentTime,
        totalTime,
        bufferedTime
    } = useVideo(
        videoEle as HTMLVideoElement,
        [videoEle]
    );

    const bufferedPercentage = useMemo(
        () => ((bufferedTime / totalTime) * 100).toString(),
        [bufferedTime, totalTime]);

    const processPercentage = useMemo(
        () => ((currentTime / totalTime) * 100).toString(),
        [totalTime, currentTime]
    );

    const { clientX } = useWindowClient();

    distanceOfClientXRef.current = clientX;

    const mouseDownHandler = () => {
        const progressMaskEleOffsetWidth = progressMaskRef.current!.offsetWidth;

        bIntervalRef.current && clearInterval(bIntervalRef.current);
        bIntervalRef.current = setInterval(
            () => {
                const position = distanceOfClientXRef.current - progressMaskRef.current!.getBoundingClientRect().left + 1;

                if (position >= 0 && position <= progressMaskEleOffsetWidth) {
                    const percentage = position / progressMaskEleOffsetWidth;

                    dispatch({
                        type: 'percentage',
                        payload: percentage
                    });

                    dispatch({
                        type: 'position',
                        payload: position
                    });

                    dispatch({
                        type: 'suspending',
                        payload: true
                    });

                    dispatch({
                        type: 'dragging',
                        payload: true
                    });

                    videoEle!.currentTime = percentToSeconds(percentage, totalTime);
                }

                if (position < 0) {
                    videoEle!.currentTime = 0;
                }

                if (position > progressMaskEleOffsetWidth) {
                    videoEle!.currentTime = totalTime;
                }
            },
            1
        );
    };

    const mouseUpHandler = () => {
        bIntervalRef.current && clearInterval(bIntervalRef.current);

        if (currentTime < totalTime && dragging) {
            videoEle?.play();

            dispatch({
                type: 'dragging',
                payload: false
            });
        }

        dispatch({
            type: 'suspending',
            payload: false
        });
    };

    const mouseMoveHandler: MouseEventHandler = (e) => {
        const position = e.clientX - progressMaskRef.current!.getBoundingClientRect().left + 1;

        dispatch({
            type: 'position',
            payload: position
        });

        dispatch({
            type: 'suspending',
            payload: true
        });

        dispatch({
            type: 'percentage',
            payload: position / progressMaskRef.current!.offsetWidth
        });
    };

    const mouseLeaveHandler = () => {
        dispatch({
            type: 'suspending',
            payload: false
        });
    };

    const clickHandler = () => {
        videoEle!.currentTime = percentToSeconds(percentage, totalTime);

        dispatch({
            type: 'suspending',
            payload: true
        });
    };

    useEffect(() => {
        if (progressWrapperRef.current && progressControlPointRef.current) {
            const progressWrapperEle = progressWrapperRef.current;
            const progressControlPointEle = progressControlPointRef.current;

            aIntervalRef.current = setInterval(
                () => {
                    hoverStylesHandler({
                        height: suspending ? 7 : 3,
                        opacity: suspending ? 1 : 0,
                        aniName: suspending ? 'example' : 'leave',
                        progressWrapperEle,
                        progressControlPointEle
                    });
                },
                100
            );
        }

        return () => {
            aIntervalRef.current && clearInterval(aIntervalRef.current);
        };
    }, [suspending]);

    useEffect(() => {
        addEventListener('mouseup', mouseUpHandler);

        return () => {
            removeEventListener('mouseup', mouseUpHandler);
        };
    }, [currentTime, totalTime, dragging]);

    return (
        <div
            className={classes(cn, '')}
            style={{ opacity: controlled ? 1 : 0 }}
        >
            <div
                ref={progressMaskRef}
                className={classes(cn, 'mask')}
                onMouseDown={mouseDownHandler}
                onMouseUp={mouseUpHandler}
                onMouseMove={(e) => mouseMoveHandler(e)}
                onMouseLeave={mouseLeaveHandler}
                onClick={clickHandler}
            />
            <div
                ref={progressWrapperRef}
                className={classes(cn, 'wrapper')}
            >
                <div
                    className={classes(cn, 'buffered')}
                    style={{ width: `${bufferedPercentage}%` }}
                />
                <div
                    className={classes(cn, 'played')}
                    style={{
                        width: `${processPercentage}%`,
                        background: 'rgba(22, 174, 224, 1)'
                    }}
                >
                    <i
                        ref={progressControlPointRef}
                        className={'control-point'}
                        style={{ background: 'rgba(22, 174, 224, 1)' }}
                    />
                </div>
                {
                    suspending &&
                    <>
                        <div
                            className={classes(cn, 'pointer')}
                            style={{ left: `${position}px`, }}
                        >
                            <i/>
                            <span>
                                {toMinutesAndSeconds(totalTime, percentage)}
                            </span>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default ProgressBar;