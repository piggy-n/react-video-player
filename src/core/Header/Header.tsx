import * as React from 'react';
import './styles/index.scss';
import { classes } from '@/utils/methods/classes';
import type { FC } from 'react';
import type { HeaderProps } from '@/core/Header/type';

const cn = 'Header';

const Header: FC<HeaderProps> = (
    {
        onMouseOver
    }
) => {
    return (
        <div
            className={classes(cn, 'container')}
            onMouseOver={() => onMouseOver(false)}
        >
            啊啊啊
        </div>
    );
};

export default Header;