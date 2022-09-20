import * as React from 'react';
import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { classes } from '@/utils/methods/classes';
import { PlayerController } from '@/core/Player/index';
import type { ForwardRefRenderFunction } from 'react';
import type { PlayerProps, PlayerRef } from '@/core/Player/type';
import './styles/player.scss';
import Icon from '@/components/Icon';
import { useVideo } from '@/utils/hooks/useVideo';
import { useVideoModel } from '@/utils/hooks/useVideoModel';
import { LayoutContext } from '@/utils/hooks/useLayoutContext';
import { VideoContext } from '@/utils/hooks/useVideoContext';
import { useVideoMethods } from '@/utils/hooks/useVideoMethods';
import useVideoCallback from '@/utils/hooks/useVideoCallBack';
import useMandatoryUpdate from '@/utils/hooks/useMandatoryUpdate';
import { StreamPlayer } from '@/utils/methods/streamPlayer';
import { VideoPlayer } from '@/utils/methods/videoPlayer';

const cn = 'Player';

const InternalPlayer: ForwardRefRenderFunction<PlayerRef, PlayerProps> = (
    {
        isLive = true,
        url = '',
        width,
        height,
        ...rest
    },
    ref
) => {
    const { videoModel, dispatch } = useVideoModel();

    const { onMouseOver } = useContext(LayoutContext);

    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoUsefulTimerRef = useRef<NodeJS.Timer | null>(null);
    const streamPlayerRef = useRef<Record<string, any>>(new StreamPlayer({ dispatch }));
    const videoPlayerRef = useRef<Record<string, any>>(new VideoPlayer({ dispatch }));

    const [loading, setLoading] = useState<boolean>(false);

    const {
        videoAttributes,
        networkState,
        readyState,
        playing
    } = useVideo(
        videoRef.current as HTMLVideoElement,
        [videoRef.current]
    );

    const videoMethods = useVideoMethods(
        videoRef.current as HTMLVideoElement,
        streamPlayerRef.current,
        url,
        isLive,
        [videoRef.current, streamPlayerRef.current, url, isLive]
    );

    const videoContextValue = useMemo(
        () => {
            return Object.assign(
                {},
                {
                    videoModel,
                    dispatch,
                    videoAttributes,
                    videoEle: videoRef.current,
                    videoContainerEle: videoContainerRef.current,
                    streamPlayer: streamPlayerRef.current,
                    isLive,
                    ...rest
                }
            );
        },
        [videoModel, dispatch]
    );

    const forceUpdate = useMandatoryUpdate();

    const waitingListener = () => {
        setLoading(true);
    };

    const playingListener = () => {
        setLoading(false);
    };

    useVideoCallback(
        videoAttributes,
        { ...rest }
    );

    useImperativeHandle(
        ref,
        () => ({
            video: videoRef.current as HTMLVideoElement,
            ...videoAttributes,
            ...videoMethods,
        }),
    );

    useEffect(() => {
        const videoContainerEle = videoContainerRef.current;
        if (!videoContainerEle) return;

        if (width) {
            videoContainerEle.style.width = `${width}px`;
            videoContainerEle.style.minWidth = `${width}px`;
        }

        if (height) {
            videoContainerEle.style.height = `${height}px`;
            videoContainerEle.style.minHeight = `${height}px`;
        }
    }, [videoContainerRef.current, width, height]);

    useEffect(() => {
        if (!videoRef.current) return;

        const videoEle = videoRef.current;

        if (!videoEle.paused && isLive) {
            streamPlayerRef.current.stop();
        }

        isLive
            ? streamPlayerRef.current.start(videoEle, url)
            : videoPlayerRef.current.start(videoEle, url);

        forceUpdate();

        // videoUsefulTimerRef.current = setTimeout(
        //     () => {
        //         if (videoEle.networkState === 0 || videoEle.networkState === 3) {
        //             console.error('Video is not loaded');
        //             setLoading(false);
        //         } else {
        //             clearTimeout(videoUsefulTimerRef.current as NodeJS.Timer);
        //         }
        //     },
        //     3000
        // );

        videoEle.addEventListener('waiting', waitingListener);
        videoEle.addEventListener('playing', playingListener);

        return () => {
            videoEle.removeEventListener('waiting', waitingListener);
            videoEle.removeEventListener('playing', playingListener);

            videoUsefulTimerRef.current && clearTimeout(videoUsefulTimerRef.current as NodeJS.Timer);
        };
    }, [videoRef.current, url, isLive]);

    return (
        <div
            ref={videoContainerRef}
            className={classes(cn, '')}
            onMouseOver={() => onMouseOver && onMouseOver(true)}
        >
            <video
                ref={videoRef}
                muted
                autoPlay
                crossOrigin={'anonymous'}
            />
            {
                (
                    (loading && playing)
                    ||
                    (networkState === 2 && readyState <= 1)
                    ||
                    (videoModel.downloading)
                )
                &&
                <div className={classes(cn, 'loading')}>
                    <Icon name={'loading'} size={24}/>
                    <p>
                        正在加载中
                        {videoModel.downloading ? ` ${videoModel.percentComplete}%` : '...'}
                    </p>
                </div>
            }
            <VideoContext.Provider value={videoContextValue}>
                <PlayerController/>
            </VideoContext.Provider>
        </div>
    );
};

export const Player = forwardRef<PlayerRef, PlayerProps>(InternalPlayer);
