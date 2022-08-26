import * as React from 'react';
import Header from '@/core/Header';
import Player from '@/core/Player';
import { useState } from 'react';
import './wsVideoPlayer.scss';

const Draggable = require('react-draggable');

const WsVideoPlayer = () => {
    const [disabled, setDisabled] = useState(true);

    return (
        <Draggable bounds={'parent'} disabled={disabled}>
            <div
                className={'ws-video-player-container'}
                onMouseLeave={() => setDisabled(true)}
            >
                <Header onMouseOver={arg => setDisabled(arg)}/>
                <Player onMouseOver={arg => setDisabled(arg)}/>
            </div>
        </Draggable>
    );
};

export default WsVideoPlayer;