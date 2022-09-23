import { useContext } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';
import Icon from '@/components/Icon';
import * as React from 'react';

const PictureInPicture = () => {
    const {
        ctrPlayerModel: {
            pipModeApplied,
            streams
        },
        setCtrPlayerModelData
    } = useContext(CtrPlayerContext);

    const clickHandler = () => {
        if (pipModeApplied) return;

        if (setCtrPlayerModelData) {
            setCtrPlayerModelData({
                type: 'sgModeApplied',
                payload: false
            });

            setCtrPlayerModelData({
                type: 'dbModeApplied',
                payload: false
            });

            setCtrPlayerModelData({
                type: 'pipModeApplied',
                payload: true
            });
        }
    };

    return streams.length > 1
        ? <Icon
            name={pipModeApplied ? 'pip-active' : 'pip'}
            title={'画中画'}
            onClick={clickHandler}
        />
        : null;
};

export default PictureInPicture;
