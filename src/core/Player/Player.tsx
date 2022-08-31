import * as React from 'react';
import { useRef } from 'react';
import { classes } from '@/utils/methods/classes';
import type { PlayerInterface, PlayerProps } from '@/core/Player/type';
import './styles/player.scss';

const cn = 'Player';

const Player: PlayerInterface = (
    {
        onMouseOver,
    }: PlayerProps
) => {
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // const { videoAttributes, videoMethods } = useVideo(
    //     videoRef.current as HTMLVideoElement,
    //     [videoRef.current],
    // );

    return (
        <div
            ref={videoContainerRef}
            className={classes(cn, '')}
            onMouseOver={() => onMouseOver(true)}
        >
            <video ref={videoRef}/>
            <Player.Controller/>
        </div>
    );
};

Player.Controller = require('./PlayerController').default;

export default Player;