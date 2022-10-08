import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/controller.scss';
import { useContext } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';
import { isFullscreen } from 'screenfull';

const cn = 'Controller';

const Controller = () => {
    const {
        ctrPlayerModel: {
            isVideoList,
            isController
        },
        setCtrPlayerModelData
    } = useContext(CtrPlayerContext);

    const mouseOverHandler = () => {
        if (setCtrPlayerModelData) {
            setCtrPlayerModelData({
                type: 'disableDrag',
                payload: true
            });
        }
    };

    return (
        <>
            {
                isController || isVideoList ?
                    <div
                        className={classes(cn, '')}
                        onMouseOver={mouseOverHandler}
                        style={{ display: isFullscreen ? 'none' : 'block' }}
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
