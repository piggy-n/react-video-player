import * as React from 'react';
import Selector from '@/components/Selector';
import { useContext } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';

const StreamSelector = () => {
    const {
        ctrPlayerModel: {
            streams,
            streamUrlList
        },
        setCtrPlayerModelData
    } = useContext(CtrPlayerContext);

    const selectorChangeHandler = (arg: string[]) => {
        if (arg.length === 0 || arg.length > 2 || !setCtrPlayerModelData) return;

        setCtrPlayerModelData({
            type: 'streamUrlList',
            payload: arg
        });
    };

    return streams.length > 0
        ? <Selector
            value={streamUrlList}
            onChange={selectorChangeHandler}
            options={streams}
        />
        : null;
};

export default StreamSelector;
