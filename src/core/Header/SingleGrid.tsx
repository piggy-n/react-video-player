import Icon from '@/components/Icon';
import * as React from 'react';
import { useContext } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';

const SingleGrid = () => {
    const {
        ctrPlayerModel: {
            singleGrid,
            streamUrlList
        },
        setCtrPlayerModelData
    } = useContext(CtrPlayerContext);

    const clickHandler = () => {
        if (singleGrid) return;

        if (setCtrPlayerModelData) {
            setCtrPlayerModelData({
                type: 'singleGrid',
                payload: true
            });

            setCtrPlayerModelData({
                type: 'doubleGrid',
                payload: false
            });

            setCtrPlayerModelData({
                type: 'pictureInPicture',
                payload: false
            });

            setCtrPlayerModelData({
                type: 'streamUrlList',
                payload: [streamUrlList[0]]
            });
        }
    };

    return (
        <Icon
            name={singleGrid ? 'single-grid-active' : 'single-grid'}
            title={'单宫'}
            onClick={clickHandler}
        />
    );
};

export default SingleGrid;
