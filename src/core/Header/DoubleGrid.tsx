import * as React from 'react';
import Icon from '@/components/Icon';
import { useContext } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';

const DoubleGrid = () => {
    const {
        ctrPlayerModel: {
            dbModeApplied,
            streams,
            isVideoList
        },
        setCtrPlayerModelData
    } = useContext(CtrPlayerContext);

    const clickHandler = () => {
        if (dbModeApplied) return;

        if (setCtrPlayerModelData) {
            setCtrPlayerModelData({
                type: 'sgModeApplied',
                payload: false
            });

            setCtrPlayerModelData({
                type: 'dbModeApplied',
                payload: true
            });

            setCtrPlayerModelData({
                type: 'pipModeApplied',
                payload: false
            });
        }
    };

    return streams.length > 1 || isVideoList
        ? <Icon
            name={dbModeApplied ? 'double-grid-active' : 'double-grid'}
            title={'双宫'}
            onClick={clickHandler}
        />
        : null;
};

export default DoubleGrid;
