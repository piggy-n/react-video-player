import * as React from 'react';
import Header from '@/core/Header';
import Player from '@/core/Player';
import { classes } from '@/utils/methods/classes';
import './index.scss';
import { useState } from 'react';

const Draggable = require('react-draggable');

const cn = 'Video-Player';

const VideoPlayer = () => {
    const [disabled, setDisabled] = useState(false);

    return (
        <Draggable bounds={'parent'} disabled={disabled}>
            <div className={classes(cn, 'container')}>
                <Header onMouseOver={arg => setDisabled(arg)}/>
                <Player onMouseOver={arg => setDisabled(arg)}/>
            </div>
        </Draggable>
    );
};

export default VideoPlayer;