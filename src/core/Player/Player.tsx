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

const cn = 'Player';

const InternalPlayer: ForwardRefRenderFunction<PlayerRef, PlayerProps> = (
    props,
    ref
) => {
    const { onMouseOver } = useContext(LayoutContext);

    const [loading, setLoading] = useState<boolean>(false);

    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoUsefulTimerRef = useRef<NodeJS.Timer | null>(null);
    const H265PlayerRef = useRef<any>(new StreamH265Player());

    const { videoAttributes, videoMethods, playing } = useVideo(
        videoRef.current as HTMLVideoElement,
        [videoRef.current]
    );

    const { videoModel, dispatch } = useVideoModel();

    const videoContextValue = useMemo(
        () => {
            return Object.assign(
                {},
                {
                    videoModel,
                    dispatch,
                    videoEle: videoRef.current,
                    videoContainerEle: videoContainerRef.current,
                    H265Player: H265PlayerRef.current,
                    ...props
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

    useImperativeHandle(
        ref,
        () => ({
            video: videoRef.current as HTMLVideoElement,
            ...videoAttributes,
            ...videoMethods,
        }),
    );

    useEffect(() => {
        const videoEle = videoRef.current as HTMLVideoElement;

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
    }, [videoRef.current, playing]);

    useEffect(() => {
        const videoEle = videoRef.current as HTMLVideoElement;
        const url = 'wss://lzz.enbo12119.com/live/1557971988926095361/101.live.mp4?token=49754077-2f7e-41ef-9f1b-835f1aff94a1';

        if (videoEle) {
            H265PlayerRef.current.start(videoEle, url);
        }
    }, [videoRef.current]);

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
                preload={'auto'}
                crossOrigin={'anonymous'}
                style={{ background: playing ? 'rgba(0, 0, 0, 1)' : 'rgba(84, 84, 84, 0.8)' }}
                // https://ks3-cn-beijing.ksyun.com/ksplayer/h265/mp4_resource/jinjie_265.mp4
            />
            {
                loading &&
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
