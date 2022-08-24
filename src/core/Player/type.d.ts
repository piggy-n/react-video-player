export interface PlayerProps {
    width?: number;
    height?: number;
    minWidth?: number;
    minHeight?: number;
    resize?: boolean;
    onMouseOver: (arg: boolean) => void;
}

export type DefaultSize = {
    width: number;
    height: number;
}