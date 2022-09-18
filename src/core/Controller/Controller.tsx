import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/controller.scss';
import { useContext } from 'react';
import { LayoutContext } from '@/utils/hooks/useLayoutContext';
import { ControllerContext } from '@/utils/hooks/useControllerContext';
import { useUpdateEffect } from 'ahooks';
import { releaseControlAccess } from '@/services/controller';

const cn = 'Controller';

const Controller = () => {
    const { onMouseOver } = useContext(LayoutContext);
    const {
        controllerModel: {
            isController,
            isVideoList
        },
        id
    } = useContext(ControllerContext);

    useUpdateEffect(() => {
        if (!isController) {
            releaseControlAccess({ id }).then(res => {
                if (!res?.success) return;
                console.log(res);
            });
        }
    }, [isController]);

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
