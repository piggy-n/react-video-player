import * as React from 'react';
import type { FC, MouseEventHandler } from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/icon.scss';
import '../../utils/methods/importAll';
import type { IconProps } from '@/components/Icon/type';

const cn = 'Icon';

const Icon: FC<IconProps> = (
    {
        id,
        className,
        name,
        size,
        style,
        title,
        onUseClick,
        ...rest
    },
) => {
    const clickHandler: MouseEventHandler<SVGUseElement> = (e) => {
        if (onUseClick) {
            onUseClick(e);
        }
    };

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
            <use
                id={id}
                xlinkHref={`#${name}`}
                onClick={e => clickHandler(e)}
                style={id ? { cursor: 'pointer' } : { cursor: 'default' }}
            />
        </svg>
    );
};

export default Icon;