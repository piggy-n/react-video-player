import * as React from 'react';
import Selector from '@/components/Selector';
import { useContext } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';

const StreamSelector = () => {
    const {
        ctrPlayerModel: {
            streams,
            singleGrid,
            streamUrlList
        },
        setCtrPlayerModelData
    } = useContext(CtrPlayerContext);

    const [open, setOpen] = React.useState<boolean>(false);

    const selectorChangeHandler = (arg: string[]) => {
        if (arg.length === 0 || !setCtrPlayerModelData) return;

        const newStreamUrlList = singleGrid
            ? arg.filter(item => !streamUrlList.includes(item))
            : arg.filter((item, index) => index !== 1);

        setCtrPlayerModelData({
            type: 'streamUrlList',
            payload: singleGrid
                ? newStreamUrlList
                : (arg.length > 2 ? newStreamUrlList : arg)
        });

        setOpen(false);
    };

    return streams.length > 0
        ? <Selector
            value={streamUrlList.filter(item => item !== '')}
            onChange={selectorChangeHandler}
            options={streams}
            open={open}
            onDropdownVisibleChange={val => setOpen(val)}
        />
        : null;
};

export default StreamSelector;
