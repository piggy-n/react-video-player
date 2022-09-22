import * as React from 'react';
import type { FC } from 'react';
import type { ControllerToolbarProps } from '@/core/Header/type';
import { classes } from '@/utils/methods/classes';
import './styles/controllerToolbar.scss';
import SingleGrid from '@/core/Header/SingleGrid';
import DoubleGrid from '@/core/Header/DoubleGrid';
import PictureInPicture from '@/core/Header/PictureInPicture';
import StreamSelector from '@/core/Header/StreamSelector';
import FullScreen from '@/core/Header/FullScreen';
import Controller from '@/core/Header/Controller';
import VideoList from '@/core/Header/VideoList';
import Screenshot from '@/core/Header/Screenshot';
import Close from '@/core/Header/Close';

const cn = 'Controller-Toolbar';

const ControllerToolbar: FC<ControllerToolbarProps> = () => {
    return (
        <div className={classes(cn, '')}>
            <StreamSelector/>
            <SingleGrid/>
            <DoubleGrid/>
            <PictureInPicture/>
            <Screenshot/>
            <Controller/>
            <VideoList/>
            <FullScreen/>
            <Close/>
        </div>
    );
};

export default ControllerToolbar;
