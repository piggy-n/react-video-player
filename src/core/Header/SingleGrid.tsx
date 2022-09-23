import Icon from '@/components/Icon';
import * as React from 'react';
import { useContext } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';

const SingleGrid = () => {
    const {
        ctrPlayerModel: {
            sgModeApplied,
            streamUrlList
        },
        setCtrPlayerModelData
    } = useContext(CtrPlayerContext);

    const clickHandler = () => {
        if (sgModeApplied) return;

        if (setCtrPlayerModelData) {
            setCtrPlayerModelData({
                type: 'sgModeApplied',
                payload: true
            });

            setCtrPlayerModelData({
                type: 'dbModeApplied',
                payload: false
            });

            setCtrPlayerModelData({
                type: 'pipModeApplied',
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
            name={sgModeApplied ? 'single-grid-active' : 'single-grid'}
            title={'单宫'}
            onClick={clickHandler}
        />
    );
};

export default SingleGrid;
