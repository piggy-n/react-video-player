import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/controller.scss';
import VideoControlPanel from '@/core/Controller/VideoControlPanel';
import { useContext } from 'react';
import { LayoutContext } from '@/utils/hooks/useLayoutContext';

const cn = 'Controller';

const Controller = () => {
    const { onMouseOver } = useContext(LayoutContext);

    return (
        <div
            className={classes(cn, '')}
            onMouseOver={() => onMouseOver && onMouseOver(true)}
        >
            <VideoControlPanel/>
        </div>
    );
};

export default Controller;