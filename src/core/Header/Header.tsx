import * as React from 'react';
import './styles/header.scss';
import { classes } from '@/utils/methods/classes';
import type { MouseEventHandler } from 'react';
import type { HeaderInterface, HeaderProps } from '@/core/Header/type';

const cn = 'Header';

const Header: HeaderInterface = (
    {
        onMouseOver
    }: HeaderProps
) => {
    const mouseOverHandler: MouseEventHandler = (e) => {
        const { target } = e;
        const targetEleName = (target as Record<string, any>)?.tagName;

        onMouseOver(targetEleName !== 'DIV');
    };

    return (
        <div
            className={classes(cn, '')}
            onMouseOver={mouseOverHandler}
        >
            <Header.Equipment name={'设备1'}/>
            <Header.PlayerController/>
        </div>
    );
};

Header.Equipment = require('./Equipment').default;
Header.PlayerController = require('./PlayerController').default;

export default Header;