import * as React from 'react';
import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { classes } from '@/utils/methods/classes';
import { PlayerController } from '@/core/Player/index';
import type { ForwardRefRenderFunction } from 'react';
import type { PlayerProps, PlayerRef } from '@/core/Player/type';
import './styles/player.scss';
import { useVideo } from '@/utils/hooks/useVideo';
import useMandatoryUpdate from '@/utils/hooks/useMandatoryUpdate';
import Icon from '@/components/Icon';
import { useVideoModel } from '@/utils/hooks/useVideoModel';
import { LayoutContext } from '@/utils/hooks/useLayoutContext';
import { VideoContext } from '@/utils/hooks/useVideoContext';
import { StreamH265Player } from '@/utils/methods/h265Player';
import useVideoCallback from '@/utils/hooks/useVideoCallBack';

const cn = 'Player';

const InternalPlayer: ForwardRefRenderFunction<PlayerRef, PlayerProps> = (
    {
        isLive,
        url,
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
    const H265PlayerRef = useRef<any>(new StreamH265Player({ dispatch }));

    const [loading, setLoading] = useState<boolean>(false);

    const {
        videoAttributes,
        videoMethods,
        networkState,
        readyState,
        playing
    } = useVideo(
        videoRef.current as HTMLVideoElement,
        [videoRef.current]
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
                    H265Player: H265PlayerRef.current,
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
            videoContainerEle.style.minWidth = `${width}px`;
        }

        if (height) {
            videoContainerEle.style.minHeight = `${height}px`;
        }
    }, [videoContainerRef.current, width, height]);

    useEffect(() => {
        const videoEle = videoRef.current as HTMLVideoElement;

        if (!videoEle.paused) {
            H265PlayerRef.current.stop();
        }

        isLive ? H265PlayerRef.current.start(videoEle, url) : videoEle.src = url;

        forceUpdate();

        videoUsefulTimerRef.current = setTimeout(
            () => {
                if (videoEle.networkState === 0 || videoEle.networkState === 3) {
                    console.error('Video is not loaded');
                    setLoading(false);
                } else {
                    clearTimeout(videoUsefulTimerRef.current as NodeJS.Timer);
                }
            },
            3000
        );

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
                ((loading && playing) || (networkState === 2 && readyState <= 1)) &&
                <div className={classes(cn, 'loading')}>
                    <Icon name={'loading'} size={24}/>
                    <p>正在加载中...</p>
                </div>
            }
            <VideoContext.Provider value={videoContextValue}>
                <PlayerController/>
            </VideoContext.Provider>
        </div>
    );
};

export const Player = forwardRef<PlayerRef, PlayerProps>(InternalPlayer);
