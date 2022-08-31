import * as React from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { classes } from '@/utils/methods/classes';
import { PlayerController } from '@/core/Player/index';
import type { ForwardRefRenderFunction } from 'react';
import type { PlayerProps, PlayerRef } from '@/core/Player/type';
import './styles/player.scss';
import { useVideo } from '@/utils/hooks/useVideo';

const cn = 'Player';

const InternalPlayer: ForwardRefRenderFunction<PlayerRef, PlayerProps> = (
    {
        onMouseOver,
    },
    ref
) => {
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { videoAttributes, videoMethods } = useVideo(
        videoRef.current as HTMLVideoElement,
        [videoRef.current],
    );

    useImperativeHandle(
        ref,
        () => ({
            video: videoRef.current as HTMLVideoElement,
            ...videoAttributes,
            ...videoMethods,
        }),
    );

    return (
        <div
            ref={videoContainerRef}
            className={classes(cn, '')}
            onMouseOver={() => onMouseOver(true)}
        >
            <video ref={videoRef}/>
            <PlayerController/>
        </div>
    );
};

export const Player = forwardRef<PlayerRef, PlayerProps>(InternalPlayer);
