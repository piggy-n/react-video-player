import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import Icon from '@/components/Icon';
import screenfull from 'screenfull';
import './styles/webFullScreenControl.scss';
import { useContext, useEffect, useState } from 'react';
import { VideoContext } from '@/utils/hooks/useVideoContext';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';

const cn = 'Web-Full-Screen-Control';

const WebFullScreenControl = () => {
    const { setCtrPlayerModelData } = useContext(CtrPlayerContext);
    const { videoContainerEle, videoModel, dispatch } = useContext(VideoContext);

    const [webIsFullscreen, setWebIsFullscreen] = useState(false);

    const webFullScreenHandler = (arg: boolean) => {
        if (setCtrPlayerModelData) {
            setCtrPlayerModelData({
                type: 'position',
                payload: arg ? { x: 0, y: 0 } : null
            });

            setCtrPlayerModelData({
                type: 'resizeHandlesArr',
                payload: arg ? [] : ['se', 'e', 's']
            });
        }
    };

    const clickHandler = () => {
        if (videoModel.isFullscreen && screenfull.isEnabled) {
            screenfull.exit();

            dispatch({
                type: 'isFullscreen',
                payload: false,
            });
        }

        if (videoContainerEle?.classList.contains('ws-web-full-screen')) {
            videoContainerEle?.classList.remove('ws-web-full-screen');

            webFullScreenHandler(false);
            setWebIsFullscreen(false);
        } else {
            videoContainerEle?.classList.add('ws-web-full-screen');

            webFullScreenHandler(true);
            setWebIsFullscreen(true);
        }
    };

    useEffect(() => {
        if (screenfull.isEnabled && videoModel.isFullscreen && webIsFullscreen) {
            videoContainerEle?.classList.remove('ws-web-full-screen');

            webFullScreenHandler(false);
            setWebIsFullscreen(false);
        }
    }, [videoModel.isFullscreen, webIsFullscreen]);

    return (
        <div className={classes(cn, '')}>
            {
                webIsFullscreen
                    ? <Icon name={'close-web-fullscreen'} title={'退出网页全屏'} onClick={clickHandler}/>
                    : <Icon name={'web-fullscreen'} title={'网页全屏'} onClick={clickHandler}/>
            }
        </div>
    );
};

export default WebFullScreenControl;
