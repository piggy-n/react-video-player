import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import Icon from '@/components/Icon';
import './styles/reloadControl.scss';
import { useContext } from 'react';
import { VideoContext } from '@/utils/hooks/useVideoContext';

const cn = 'Reload-Control';

const ReloadControl = () => {
    const {
        isLive,
        videoEle,
        streamPlayer,
        // videoPlayer,
        videoModel: {
            waiting,
            downloading,
            error,
        }
    } = useContext(VideoContext);

    const clickHandler = () => {
        if (waiting || downloading) return;

        if (error) {
            isLive
                ? streamPlayer.reload()
                // : videoPlayer.start();
                : videoEle?.load();
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
