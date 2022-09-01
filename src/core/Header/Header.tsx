import * as React from 'react';
import './styles/header.scss';
import { classes } from '@/utils/methods/classes';
import type { MouseEventHandler } from 'react';
import type { HeaderInterface } from '@/core/Header/type';
import { useContext } from 'react';
import { LayoutContext } from '@/utils/hooks/useLayoutContext';

const cn = 'Header';

const Header: HeaderInterface = () => {
    const { onMouseOver } = useContext(LayoutContext);

    const mouseOverHandler: MouseEventHandler = (e) => {
        const { target } = e;
        const targetEleName = (target as Record<string, any>)?.tagName;

        if (onMouseOver) {
            onMouseOver(targetEleName !== 'DIV');
        }
    };

    return (
        <div
            className={classes(cn, '')}
            onMouseOver={mouseOverHandler}
        >
            <Header.Equipment name={'监控设备'}/>
            <Header.ControllerToolbar/>
        </div>
    );
};

Header.Equipment = require('./Equipment').default;
Header.ControllerToolbar = require('./ControllerToolbar').default;

export default Header;