import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import type { FC } from 'react';
import Icon from '@/components/Icon';
import type { WebFullScreenControlProps } from '@/core/Player/type';
import screenfull from 'screenfull';
import './styles/webFullScreenControl.scss';
import { useContext, useEffect, useState } from 'react';
import { VideoContext } from '@/utils/hooks/useVideoContext';
import { LayoutContext } from '@/utils/hooks/useLayoutContext';

const cn = 'Web-Full-Screen-Control';

const WebFullScreenControl: FC<WebFullScreenControlProps> = () => {
    const { onWebFullScreen } = useContext(LayoutContext);
    const { videoContainerEle, videoModel, dispatch } = useContext(VideoContext);

    const [webIsFullscreen, setWebIsFullscreen] = useState(false);

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

            onWebFullScreen && onWebFullScreen(false);
            setWebIsFullscreen(false);
        } else {
            videoContainerEle?.classList.add('ws-web-full-screen');

            onWebFullScreen && onWebFullScreen(true);
            setWebIsFullscreen(true);
        }
    };

    useEffect(() => {
        if (screenfull.isEnabled && videoModel.isFullscreen && webIsFullscreen) {
            videoContainerEle?.classList.remove('ws-web-full-screen');

            onWebFullScreen && onWebFullScreen(false);
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