import type { FC } from 'react';

export type DefaultSize = {
    width: number;
    height: number;
}

export interface PlayerProps {
    width?: number;
    height?: number;
    minWidth?: number;
    minHeight?: number;
    resize?: boolean;
    onMouseOver: (arg: boolean) => void;
}

export interface PlayerInterface extends FC<PlayerProps> {
    Controller: FC<PlayerControllerProps>;
}

export interface PlayerControllerProps {

}

