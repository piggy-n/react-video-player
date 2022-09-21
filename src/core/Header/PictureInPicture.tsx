import { useContext } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';
import Icon from '@/components/Icon';
import * as React from 'react';

const PictureInPicture = () => {
    const {
        ctrPlayerModel: {
            pictureInPicture,
            streams
        },
        setCtrPlayerModelData
    } = useContext(CtrPlayerContext);

    const clickHandler = () => {
        if (pictureInPicture) return;

        if (setCtrPlayerModelData) {
            setCtrPlayerModelData({
                type: 'singleGrid',
                payload: false
            });

            setCtrPlayerModelData({
                type: 'doubleGrid',
                payload: false
            });

            setCtrPlayerModelData({
                type: 'pictureInPicture',
                payload: true
            });
        }
    };

    return streams.length > 1
        ? <Icon
            name={pictureInPicture ? 'pip-active' : 'pip'}
            title={'画中画'}
            onClick={clickHandler}
        />
        : null;
};

export default PictureInPicture;
