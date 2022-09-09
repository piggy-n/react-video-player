import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/videoControlPanel.scss';

const cn = 'Video-Control-Panel';

const VideoControlPanel = () => {
    return (
        <div className={classes(cn, '')}>
            <VideoControlPanel.DirectionController/>
        </div>
    );
};

VideoControlPanel.DirectionController = require('./DirectionController').default;

export default VideoControlPanel;