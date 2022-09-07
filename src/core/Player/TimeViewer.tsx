import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/timeViewer.scss';
import { useContext } from 'react';
import { VideoContext } from '@/utils/hooks/useVideoContext';
import { useVideo } from '@/utils/hooks/useVideo';
import { toMinutesAndSeconds } from '@/utils/methods/time';

const cn = 'Time-Viewer';

const TimeViewer = () => {
    const { isLive, videoEle } = useContext(VideoContext);

    const {
        currentTime,
        totalTime
    } = useVideo(
        videoEle as HTMLVideoElement,
        [videoEle]
    );

    return (
        <div className={classes(cn, '')}>
            {
                isLive
                    ? <div>实时</div>
                    : <div className={classes(cn, 'time')}>
                        {toMinutesAndSeconds(currentTime)}&nbsp;/&nbsp;{toMinutesAndSeconds(totalTime)}
                    </div>
            }
        </div>
    );
};

export default TimeViewer;