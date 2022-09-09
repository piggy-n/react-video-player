import * as React from 'react';
import type { FC } from 'react';
import type { ControllerToolbarProps } from '@/core/Header/type';
import { classes } from '@/utils/methods/classes';
import './styles/controllerToolbar.scss';
import Icon from '@/components/Icon';
import Selector from '@/components/Selector';
import { useContext, useState } from 'react';
import { LayoutContext } from '@/utils/hooks/useLayoutContext';
import { ControllerContext } from '@/utils/hooks/useControllerContext';

const cn = 'Controller-Toolbar';

const ControllerToolbar: FC<ControllerToolbarProps> = () => {
    const { onControllerVisibleChange } = useContext(LayoutContext);
    const { dispatch } = useContext(ControllerContext);

    const [gridStatus, setGridStatus] = useState<Record<string, boolean>>({
        singleGrid: true,
        doubleGrid: false,
        pip: false
    });

    const [panelStatus, setPanelStatus] = useState<Record<string, boolean>>({
        isController: false,
        isVideoList: false,
    });

    const gridStatusHandler = (key: string) => {
        if (gridStatus[key]) return;

        const newGridStatus = {
            singleGrid: false,
            doubleGrid: false,
            pip: false,
            [key]: !gridStatus[key],
        };

        setGridStatus(newGridStatus);
    };

    const panelStatusHandler = (key: string) => {
        const newPanelStatus = {
            isController: false,
            isVideoList: false,
            [key]: !panelStatus[key],
        };

        if (onControllerVisibleChange) {
            onControllerVisibleChange(!panelStatus[key]);
        }

        dispatch({
            type: 'isController',
            payload: newPanelStatus['isController']
        });

        dispatch({
            type: 'isVideoList',
            payload: newPanelStatus['isVideoList']
        });

        setPanelStatus(newPanelStatus);
    };

    return (
        <div className={classes(cn, '')}>
            <Selector
                onChange={(v) => console.log(v)}
                options={[
                    {
                        label: '可见光',
                        value: 'singleGrid',
                        url: 'https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg',
                    },
                    {
                        label: '热像',
                        value: 'doubleGrid',
                        url: 'https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnc.svg',
                    },
                ]}/>
            <Icon
                name={gridStatus['singleGrid'] ? 'single-grid-active' : 'single-grid'}
                title={'单宫'}
                onClick={() => gridStatusHandler('singleGrid')}
            />
            <Icon
                name={gridStatus['doubleGrid'] ? 'double-grid-active' : 'double-grid'}
                title={'双宫'}
                onClick={() => gridStatusHandler('doubleGrid')}
            />
            <Icon
                name={gridStatus['pip'] ? 'pip-active' : 'pip'}
                title={'画中画'}
                onClick={() => gridStatusHandler('pip')}
            />
            <Icon
                name={panelStatus['screenshot'] ? 'screenshot-active' : 'screenshot'}
                title={'截图'}
                // onClick={() => panelStatusHandler('screenshot')}
            />
            <Icon
                name={panelStatus['isController'] ? 'control-active' : 'control'}
                title={'控制面板'}
                onClick={() => panelStatusHandler('isController')}
            />
            <Icon
                name={panelStatus['isVideoList'] ? 'recording-active' : 'recording'}
                title={'查看录像'}
                onClick={() => panelStatusHandler('isVideoList')}
            />
            <Icon
                name={'fullscreen'}
                title={'全屏'}
            />
            <Icon
                name={'close'}
                title={'关闭'}
            />
        </div>
    );
};

export default ControllerToolbar;