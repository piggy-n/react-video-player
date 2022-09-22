import * as React from 'react';
import type { FC } from 'react';
import type { ControllerToolbarProps } from '@/core/Header/type';
import { classes } from '@/utils/methods/classes';
import './styles/controllerToolbar.scss';
import Icon from '@/components/Icon';
import { useState } from 'react';
import SingleGrid from '@/core/Header/SingleGrid';
import DoubleGrid from '@/core/Header/DoubleGrid';
import PictureInPicture from '@/core/Header/PictureInPicture';
import StreamSelector from '@/core/Header/StreamSelector';
import FullScreen from '@/core/Header/FullScreen';

const cn = 'Controller-Toolbar';

const ControllerToolbar: FC<ControllerToolbarProps> = () => {
    const [panelStatus, setPanelStatus] = useState<Record<string, boolean>>({
        isController: false,
        isVideoList: false,
    });

    return (
        <div className={classes(cn, '')}>
            <StreamSelector/>
            <SingleGrid/>
            <DoubleGrid/>
            <PictureInPicture/>
            <Icon
                name={panelStatus['screenshot'] ? 'screenshot-active' : 'screenshot'}
                title={'截图'}
                // onClick={screenshotHandler}
            />
            <Icon
                name={panelStatus['isController'] ? 'control-active' : 'control'}
                title={'控制面板'}
                // onClick={() => panelStatusHandler('isController')}
            />
            <Icon
                name={panelStatus['isVideoList'] ? 'recording-active' : 'recording'}
                title={'查看录像'}
                // onClick={() => panelStatusHandler('isVideoList')}
            />
            <FullScreen/>
            <Icon
                name={'close'}
                title={'关闭'}
            />
        </div>
    );
};

export default ControllerToolbar;
