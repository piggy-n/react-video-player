import * as React from 'react';
import './styles/playControl.scss';
import { classes } from '@/utils/methods/classes';
import Icon from '@/components/Icon';
import { useContext } from 'react';
import { VideoContext } from '@/utils/hooks/useVideoContext';
import { useVideo } from '@/utils/hooks/useVideo';

const cn = 'Play-Control';

const PlayControl = () => {
    const {
        videoEle,
        isLive,
        H265Player,
        videoModel: {
            waiting
        }
    } = useContext(VideoContext);

    const {
        playing,
        changePlayStatusHandler
    } = useVideo(
        videoEle as HTMLVideoElement,
        [videoEle]
    );

    const clickHandler = () => {
        if (waiting) return;

        if (isLive) {
            playing ? H265Player.stop() : H265Player.start();
        }

        changePlayStatusHandler && changePlayStatusHandler();
    };

    return (
        <div
            className={classes(cn, '')}
            onClick={clickHandler}
        >
            {
                playing
                    ? <>
                        {
                            isLive
                                ? <Icon name={'stop'} size={18} title={'停止'}/>
                                : <Icon name={'pause'} size={18} title={'暂停'}/>
                        }
                    </>
                    : <Icon name={'play'} size={18} title={'播放'}/>
            }
        </div>
    );
};

export default PlayControl;