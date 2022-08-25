import * as React from 'react';
import Header from '@/core/Header';
import Player from '@/core/Player';
import { useState } from 'react';
import './wsVideoPlayer.scss';

const Draggable = require('react-draggable');

const WsVideoPlayer = () => {
    const [disabled, setDisabled] = useState(false);

    return (
        <Draggable bounds={'parent'} disabled={disabled}>
            <div className={"ws-video-player-container"}>
                <Header onMouseOver={arg => setDisabled(arg)}/>
                <Player onMouseOver={arg => setDisabled(arg)}/>
            </div>
        </Draggable>
    );
};

export default WsVideoPlayer;