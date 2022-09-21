import * as React from 'react';
import Icon from '@/components/Icon';
import { useContext } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';

const DoubleGrid = () => {
    const {
        ctrPlayerModel: {
            doubleGrid,
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

    return (
        <Icon
            name={doubleGrid ? 'double-grid-active' : 'double-grid'}
            title={'双宫'}
            onClick={clickHandler}
        />
    );
};

export default DoubleGrid;
