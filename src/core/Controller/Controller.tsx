import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/controller.scss';
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
            <Controller.VideoControlPanel/>
        </div>
    );
};

Controller.VideoControlPanel = require('./VideoControlPanel').default;
Controller.VideoListPanel = require('./VideoListPanel').default;

export default Controller;