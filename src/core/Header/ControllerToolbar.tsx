import * as React from 'react';
import type { FC } from 'react';
import type { ControllerToolbarProps } from '@/core/Header/type';
import { classes } from '@/utils/methods/classes';
import './styles/controllerToolbar.scss';
import Icon from '@/components/Icon';
import { useContext, useState } from 'react';
import SingleGrid from '@/core/Header/SingleGrid';
import DoubleGrid from '@/core/Header/DoubleGrid';
import PictureInPicture from '@/core/Header/PictureInPicture';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';
import { isFullscreen } from 'screenfull';
import StreamSelector from '@/core/Header/StreamSelector';

const cn = 'Controller-Toolbar';

const ControllerToolbar: FC<ControllerToolbarProps> = () => {
    // const {
    //     ctrPlayerModel: {
    //         streams
    //     },
    //     setCtrPlayerModelData
    // } = useContext(CtrPlayerContext);

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
            <Icon
                name={isFullscreen ? 'close-web-fullscreen' : 'fullscreen'}
                title={'全屏'}
                // onClick={clickHandler}
            />
            <Icon
                name={'close'}
                title={'关闭'}
            />
        </div>
    );
};

export default ControllerToolbar;
