import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import screenfull from 'screenfull';
import { useContext } from 'react';
import { VideoContext } from '@/utils/hooks/useVideoContext';
import Icon from '@/components/Icon';
import './styles/fullScreenControl.scss';

const cn = 'Full-Screen-Control';

const FullScreenControl = () => {
    const {
        videoModel: {
            isFullscreen
        },
        dispatch,
        fullScreen = true,
        videoContainerEle
    } = useContext(VideoContext);

    const clickHandler = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle(videoContainerEle as HTMLDivElement);
            screenfull.on('change', () => {
                dispatch({
                    type: 'isFullscreen',
                    payload: screenfull.isFullscreen,
                });
            });
        }
    };

    return (
        fullScreen ? <div className={classes(cn, '')}>
            {
                isFullscreen
                    ? <Icon
                        name={'close-web-fullscreen'}
                        title={'退出全屏'}
                        size={18}
                        onClick={clickHandler}
                    />
                    : <Icon
                        name={'fullscreen'}
                        title={'全屏'}
                        size={18}
                        onClick={clickHandler}
                    />
            }
        </div> : null
    );
};

export default FullScreenControl;
