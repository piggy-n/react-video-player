import * as React from 'react';
import './styles/header.scss';
import { classes } from '@/utils/methods/classes';
import type { MouseEventHandler } from 'react';
import type { HeaderInterface } from '@/core/Header/type';
import { useContext } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';

const cn = 'Header';

const Header: HeaderInterface = () => {
    const {
        setCtrPlayerModelData,
        deviceName = '',
        deviceStatus,
        onlyRecord
    } = useContext(CtrPlayerContext);

    const mouseOverHandler: MouseEventHandler = (e) => {
        const { target } = e;
        const targetEleName = (target as Record<string, any>)?.tagName;

        if (setCtrPlayerModelData) {
            setCtrPlayerModelData({
                type: 'disableDrag',
                payload: targetEleName !== 'DIV'
            });
        }
    };

    return (
        <div
            className={classes(cn, '')}
            onMouseOver={mouseOverHandler}
        >
            <Header.Equipment name={deviceName} online={deviceStatus} showStatus={!onlyRecord}/>
            <Header.ControllerToolbar/>
        </div>
    );
};

Header.Equipment = require('./Equipment').default;
Header.ControllerToolbar = require('./ControllerToolbar').default;

export default Header;
