import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/controller.scss';
import { useContext } from 'react';
import { LayoutContext } from '@/utils/hooks/useLayoutContext';
import { ControllerContext } from '@/utils/hooks/useControllerContext';

const cn = 'Controller';

const Controller = () => {
    const { onMouseOver } = useContext(LayoutContext);
    const {
        controllerModel: {
            isController,
            isVideoList
        }
    } = useContext(ControllerContext);

    return (
        <>
            {
                isController || isVideoList ?
                    <div
                        className={classes(cn, '')}
                        onMouseOver={() => onMouseOver && onMouseOver(true)}
                    >
                        {isController && <Controller.VideoControlPanel/>}
                        {isVideoList && <Controller.VideoListPanel/>}
                    </div>
                    : null
            }
        </>
    );
};

Controller.VideoControlPanel = require('./VideoControlPanel').default;
Controller.VideoListPanel = require('./VideoListPanel').default;

export default Controller;