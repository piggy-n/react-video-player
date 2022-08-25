import * as React from 'react';
import type { FC } from 'react';
import type { ControllerToolbarProps } from '@/core/Header/type';
import { classes } from '@/utils/methods/classes';
import './styles/controllerToolbar.scss';
import Icon from '@/components/Icon';

const cn = 'Controller-Toolbar';

const ControllerToolbar: FC<ControllerToolbarProps> = () => {
    return (
        <div className={classes(cn, '')}>
            <Icon name={'single-grid'} title={'单宫'}/>
            <Icon name={'double-grid'} title={'双宫'}/>
            <Icon name={'pip'} title={'画中画'}/>
            <Icon name={'screenshot'} title={'查看截图'}/>
            <Icon name={'controller'} title={'控制'}/>
            <Icon name={'recording'} title={'查看录像'}/>
            <Icon name={'fullscreen'} title={'全屏'}/>
            <Icon name={'close'} title={'关闭'}/>
        </div>
    );
};

export default ControllerToolbar;