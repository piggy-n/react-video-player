import Icon from '@/components/Icon';
import * as React from 'react';
import { useContext } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';

const Close = () => {
    const { onClose } = useContext(CtrPlayerContext);

    const clickHandler = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <Icon
            name={'close'}
            title={'关闭'}
            onClick={clickHandler}
        />
    );
};

export default Close;
