import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import type { FC } from 'react';
import Icon from '@/components/Icon';
import type { WebFullScreenControlProps } from '@/core/Player/type';
import './styles/webFullScreenControl.scss';
import { useContext, useState } from 'react';
import { VideoContext } from '@/utils/hooks/useVideoContext';

const cn = 'Web-Full-Screen-Control';

const WebFullScreenControl: FC<WebFullScreenControlProps> = () => {
    const { videoContainerEle } = useContext(VideoContext);

    const [webFullscreen, setWebFullscreen] = useState(false);

    return (
        <div className={classes(cn, '')}>
            <Icon name={'web-fullscreen'} title={'网页全屏'}/>
        </div>
    );
};

export default WebFullScreenControl;