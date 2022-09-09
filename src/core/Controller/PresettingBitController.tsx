import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/presettingBitController.scss';
import Icon from '@/components/Icon';
import { useState } from 'react';

const cn = 'Presetting-Bit-Controller';

const PresettingBitController = () => {
    const [isPresettingBit, setIsPresettingBit] = useState(true);

    const headerClickHandler = (arg: boolean) => {
        setIsPresettingBit(arg);
    };

    return (
        <div className={classes(cn, '')}>
            <div className={classes(cn, 'header')}>
                <div className={classes(cn, 'header-left')}>
                    <p
                        style={{ color: isPresettingBit ? '#16AEE0' : '#B5D8EE' }}
                        onClick={() => headerClickHandler(true)}
                    >
                        预置位
                    </p>
                    <i/>
                    <p
                        style={{ color: !isPresettingBit ? '#16AEE0' : '#B5D8EE' }}
                        onClick={() => headerClickHandler(false)}
                    >
                        自定义
                    </p>
                </div>
                <div className={classes(cn, 'header-right')}>
                    <Icon name={'ctr-location'} size={18}/>
                    <Icon name={'ctr-view'} size={18}/>
                </div>
            </div>
        </div>
    );
};

export default PresettingBitController;