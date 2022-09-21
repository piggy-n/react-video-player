import * as React from 'react';
import Icon from '@/components/Icon';
import { useContext } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';

const DoubleGrid = () => {
    const {
        ctrPlayerModel: {
            doubleGrid,
            streams
        },
        setCtrPlayerModelData
    } = useContext(CtrPlayerContext);

    const clickHandler = () => {
        if (doubleGrid) return;

        if (setCtrPlayerModelData) {
            setCtrPlayerModelData({
                type: 'singleGrid',
                payload: false
            });

            setCtrPlayerModelData({
                type: 'doubleGrid',
                payload: true
            });

            setCtrPlayerModelData({
                type: 'pictureInPicture',
                payload: false
            });
        }
    };

    return streams.length > 1
        ? <Icon
            name={doubleGrid ? 'double-grid-active' : 'double-grid'}
            title={'双宫'}
            onClick={clickHandler}
        />
        : null;
};

export default DoubleGrid;
