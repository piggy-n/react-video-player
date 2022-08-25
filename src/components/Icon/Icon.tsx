import * as React from 'react';
import type { FC, SVGAttributes } from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/index.scss';
import '../../utils/methods/importAll';

interface IconProps extends SVGAttributes<SVGElement> {
    name: string;
    size?: number;
    title?: string;
}

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
            {title && <title>{title}</title>}
            <use xlinkHref={`#${name}`}/>
        </svg>
    );
};

export default Icon;