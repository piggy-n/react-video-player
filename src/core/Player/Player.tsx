import * as React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { classes } from '@/utils/methods/classes';
import { PlayerController } from '@/core/Player/index';
import type { ForwardRefRenderFunction } from 'react';
import type { PlayerProps, PlayerRef } from '@/core/Player/type';
import './styles/player.scss';
import { useVideo } from '@/utils/hooks/useVideo';
import useMandatoryUpdate from '@/utils/hooks/useMandatoryUpdate';
import Icon from '@/components/Icon';

const cn = 'Player';

const InternalPlayer: ForwardRefRenderFunction<PlayerRef, PlayerProps> = (
    {
        onMouseOver,
    },
    ref
) => {
    const [loading, setLoading] = useState<boolean>(false);

    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoUsefulTimerRef = useRef<NodeJS.Timer | null>(null);

    const forceUpdate = useMandatoryUpdate();

    const { videoAttributes, videoMethods } = useVideo(
        videoRef.current as HTMLVideoElement,
        [videoRef.current],
    );

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
        forceUpdate();

        const videoEle = videoRef.current as HTMLVideoElement;

        videoUsefulTimerRef.current = setTimeout(
            () => {
                if (videoEle.networkState === 0 || videoEle.networkState === 3) {
                    console.error('Video is not loaded');
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
    }, [videoRef.current]);

    return (
        <div
            ref={videoContainerRef}
            className={classes(cn, '')}
            onMouseOver={() => onMouseOver(true)}
        >
            <video ref={videoRef}/>
            {
                loading &&
                <Icon
                    name={'loading'}
                    size={28}
                    className={classes(cn, 'loading')}
                />
            }
            <PlayerController/>
        </div>
    );
};

export const Player = forwardRef<PlayerRef, PlayerProps>(InternalPlayer);
