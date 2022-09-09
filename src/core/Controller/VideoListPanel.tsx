import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/videoListPanel.scss';

const cn = 'Video-List-Panel';

const VideoListPanel = () => {
    return (
        <div className={classes(cn, '')}>
            <div className={classes(cn, 'item-wrapper')}>
                <div className={classes(cn, 'item-time')}>
                    2021-01-01 12:00:00
                </div>
            </div>

        </div>
    );
};

export default VideoListPanel;