import type { MouseEventHandler, SVGAttributes } from 'react';

export interface IconProps extends SVGAttributes<SVGElement> {
    name: string;
    size?: number;
    title?: string;
    onUseClick?: MouseEventHandler<SVGUseElement>;
}
