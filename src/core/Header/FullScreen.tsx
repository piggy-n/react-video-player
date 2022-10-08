import screenfull, { isFullscreen } from 'screenfull';
import Icon from '@/components/Icon';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';

const FullScreen = () => {
    const {
        ctrPlayerModel: {
            playerWrapperEle,
            dbModeApplied,
            panelVisible
        },
        setCtrPlayerModelData
    } = useContext(CtrPlayerContext);

    const [isDoubleGrid, setIsDoubleGrid] = useState<boolean>(false);

    const clickHandler = () => {
        if (!playerWrapperEle) return;

        if (screenfull.isEnabled) {
            screenfull.toggle(playerWrapperEle);
        }
    };

    useEffect(() => {
        if (!setCtrPlayerModelData) return;

        if (isFullscreen && dbModeApplied) {
            setCtrPlayerModelData({
                type: 'dbModeApplied',
                payload: false
            });

            setCtrPlayerModelData({
                type: 'pipModeApplied',
                payload: true
            });
            setIsDoubleGrid(true);
        }

        if (!isFullscreen && isDoubleGrid) {
            setCtrPlayerModelData({
                type: 'dbModeApplied',
                payload: true
            });

            setCtrPlayerModelData({
                type: 'pipModeApplied',
                payload: false
            });
            setIsDoubleGrid(false);
        }

        // if (isFullscreen && panelVisible) {
        //     setCtrPlayerModelData({
        //         type: 'panelVisible',
        //         payload: false
        //     });
        //
        //     setCtrPlayerModelData({
        //         type: 'isController',
        //         payload: false
        //     });
        //
        //     setCtrPlayerModelData({
        //         type: 'isVideoList',
        //         payload: false
        //     });
        // }
    }, [isFullscreen, isDoubleGrid, dbModeApplied, panelVisible]);

    return (
        <Icon
            name={'fullscreen'}
            title={'全屏'}
            onClick={clickHandler}
        />
    );
};

export default FullScreen;
