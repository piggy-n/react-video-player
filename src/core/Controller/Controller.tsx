import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/controller.scss';
import { useContext } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';
import { ControllerContext } from '@/utils/hooks/useControllerContext';
import { useUpdateEffect } from 'ahooks';
import { releaseControlAccess } from '@/services/controller';

const cn = 'Controller';

const Controller = () => {
    const { setCtrPlayerModelData } = useContext(CtrPlayerContext);
    const {
        controllerModel: {
            isController,
            isVideoList
        },
        id
    } = useContext(ControllerContext);

    const mouseOverHandler = () => {
        if (setCtrPlayerModelData) {
            setCtrPlayerModelData({
                type: 'disableDrag',
                payload: true
            });
        }
    };

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
                        onMouseOver={mouseOverHandler}
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
