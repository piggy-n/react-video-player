import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/videoListPanel.scss';
import VideoDatePicker from '@/components/VideoDatePicker';
import VideoTimePicker from '@/components/VideoTimePicker';

const cn = 'Video-List-Panel';

const VideoListPanel = () => {
    return (
        <div className={classes(cn, '')}>
            <div className={classes(cn, 'item-wrapper')}>
                <div className={classes(cn, 'item-time')}>
                    <VideoDatePicker/>
                    <VideoTimePicker/>
                </div>
            </div>

        </div>
    );
};

export default VideoListPanel;
