import * as React from 'react';
import Header from '@/core/Header';
import Player from '@/core/Player';
import { classes } from '@/utils/methods/classes';
import './index.scss';

const cn = 'Video-Player';

const VideoPlayer = () => {
    return (
        <div className={classes(cn, 'container')}>
            <Header/>
            <Player/>
        </div>
    );
};

export default VideoPlayer;