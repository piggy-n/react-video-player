import Icon from '@/components/Icon';
import * as React from 'react';
import { useContext } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';

const Controller = () => {
    const {
        ctrPlayerModel: {
            isController,
            isVideoList
        },
        setCtrPlayerModelData
    } = useContext(CtrPlayerContext);

    const clickHandler = () => {
        if (!setCtrPlayerModelData || isVideoList) return;

        setCtrPlayerModelData({
            type: 'isController',
            payload: !isController
        });
    };

    return (
        <Icon
            name={isController ? 'control-active' : 'control'}
            title={'控制面板'}
            onClick={clickHandler}
            style={{ cursor: isVideoList ? 'not-allowed' : 'pointer' }}
            useStyles={{ cursor: isVideoList ? 'not-allowed' : 'pointer' }}
        />
    );
};

export default Controller;
