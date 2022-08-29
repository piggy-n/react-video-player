import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import type { FC } from 'react';
import type { VideoFormatViewerProps } from '@/core/Player/type';
import './styles/videoFormatViewer.scss';

const cn = 'Video-Format-Viewer';

const VideoFormatViewer: FC<VideoFormatViewerProps> = ({ format }) => {
    return (
        <div className={classes(cn, '')}>
            {format}
        </div>
    );
};

export default VideoFormatViewer;