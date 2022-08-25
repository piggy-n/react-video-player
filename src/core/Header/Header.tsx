import * as React from 'react';
import './styles/header.scss';
import { debounce } from 'lodash';
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

    const debounceMouseOverHandler = debounce(
        mouseOverHandler,
        300
    );

    return (
        <div
            className={classes(cn, 'container')}
            onMouseOver={debounceMouseOverHandler}
        >
            <Header.Equipment name={'设备1'}/>
            <Header.PlayerController/>
        </div>
    );
};

Header.Equipment = require('./Equipment').default;
Header.PlayerController = require('./PlayerController').default;

export default Header;