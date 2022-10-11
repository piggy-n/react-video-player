import { useContext, useState } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';
import * as React from 'react';
import Selector from '@/components/Selector';

const CameraSelector = () => {
    const {
        ctrPlayerModel: {
            cameras,
            isVideoList,
            selectedCamera
        },
        setCtrPlayerModelData
    } = useContext(CtrPlayerContext);

    const [open, setOpen] = useState<boolean>(false);

    const selectorChangeHandler = (arg: string) => {
        if (arg === selectedCamera || !setCtrPlayerModelData) return;

        setCtrPlayerModelData({
            type: 'selectedCamera',
            payload: arg
        });

        setOpen(false);
    };

    return cameras.length > 0 && isVideoList
        ? <Selector
            value={selectedCamera}
            onChange={selectorChangeHandler}
            options={cameras}
            open={open}
            onDropdownVisibleChange={val => setOpen(val)}
        />
        : null;
};

export default CameraSelector;
