import * as React from 'react';
import type { FC } from 'react';
import type { ControllerToolbarProps } from '@/core/Header/type';
import { classes } from '@/utils/methods/classes';
import './styles/controllerToolbar.scss';
import Icon from '@/components/Icon';
import { useState } from 'react';

const cn = 'Controller-Toolbar';

const ControllerToolbar: FC<ControllerToolbarProps> = () => {
    const [gridStatus, setGridStatus] = useState<Record<string, boolean>>({
        singleGrid: true,
        doubleGrid: false,
        pip: false
    });

    const [panelStatus, setPanelStatus] = useState<Record<string, boolean>>({
        screenshot: false,
        control: false,
        recording: false,
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
        if (panelStatus[key]) return;

        const newPanelStatus = {
            screenshot: false,
            control: false,
            recording: false,
            [key]: !panelStatus[key],
        };

        setPanelStatus(newPanelStatus);
    };

    return (
        <div className={classes(cn, '')}>
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
                title={'查看截图'}
                onClick={() => panelStatusHandler('screenshot')}
            />
            <Icon
                name={panelStatus['control'] ? 'control-active' : 'control'}
                title={'控制'}
                onClick={() => panelStatusHandler('control')}
            />
            <Icon
                name={panelStatus['recording'] ? 'recording-active' : 'recording'}
                title={'查看录像'}
                onClick={() => panelStatusHandler('recording')}
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