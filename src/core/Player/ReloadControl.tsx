import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import Icon from '@/components/Icon';
import './styles/reloadControl.scss';
import { useContext } from 'react';
import { VideoContext } from '@/utils/hooks/useVideoContext';
import { useVideo } from '@/utils/hooks/useVideo';

const cn = 'Reload-Control';

const ReloadControl = () => {
    const {
        isLive,
        videoEle,
        streamPlayer,
        videoPlayer,
        videoModel: {
            waiting,
            downloading
        }
    } = useContext(VideoContext);

    const {
        readyState,
        networkState
    } = useVideo(
        videoEle as HTMLVideoElement,
        [videoEle]
    );

    const clickHandler = () => {
        if (waiting || downloading) return;

        if (readyState === 0 || networkState === 0 || networkState === 3) {
            isLive ? streamPlayer.reload() : videoPlayer.start();
            return;
        }

        isLive ? streamPlayer.reload() : videoEle?.load();
    };

    return (
        <div
            className={classes(cn, '')}
            onClick={clickHandler}
        >
            <Icon name={'reload'} size={18} title={'重新加载'}/>
        </div>
    );
};

export default ReloadControl;
