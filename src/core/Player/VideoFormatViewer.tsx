import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/videoFormatViewer.scss';
import { useContext } from 'react';
import { VideoContext } from '@/utils/hooks/useVideoContext';

const cn = 'Video-Format-Viewer';

const VideoFormatViewer = () => {
    const {
        videoModel: {
            mime
        },
        isLive
    } = useContext(VideoContext);

    return isLive
        ? <div className={classes(cn, '')}>
            {mime}
        </div>
        : null;
};

export default VideoFormatViewer;
