import * as React from 'react';
import type { FC } from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/icon.scss';
import '../../utils/methods/importAll';
import type { IconProps } from '@/components/Icon/type';

const cn = 'Icon';

const Icon: FC<IconProps> = (
    {
        className,
        name,
        size,
        style,
        title,
        ...rest
    },
) => {
    return (
        <svg
            className={classes(cn, '', [className])}
            style={{
                width: size && `${size}px`,
                height: size && `${size}px`,
                ...style,
            }}
            {...rest}
        >
            {
                title &&
                <title>{title}</title>
            }
            <use xlinkHref={`#${name}`}/>
        </svg>
    );
};

export default Icon;