import Icon from '@/components/Icon';
import * as React from 'react';
import { useContext } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';

const VideoList = () => {
    const {
        ctrPlayerModel: {
            isVideoList,
            isController
        },
        setCtrPlayerModelData
    } = useContext(CtrPlayerContext);

    const clickHandler = () => {
        if (!setCtrPlayerModelData) return;

        if (isController) {
            setCtrPlayerModelData({
                type: 'isController',
                payload: false
            });
        }

        setCtrPlayerModelData({
            type: 'isVideoList',
            payload: !isVideoList
        });

        setCtrPlayerModelData!({
            type: 'panelVisible',
            payload: !isVideoList
        });
    };

    return (
        <Icon
            name={isVideoList ? 'recording-active' : 'recording'}
            title={'查看录像'}
            onClick={clickHandler}
        />
    );
};

export default VideoList;
