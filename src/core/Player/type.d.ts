import type { FC, MouseEventHandler } from 'react';

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
    resizing: boolean;
}

export interface PlayerControllerInterface extends FC<PlayerControllerProps> {
    Panel: FC<ControlPanelProps>;
}

export interface ControlPanelProps {

}

export interface ControlPanelInterface extends FC<ControlPanelProps> {
    PlayControl: FC<PlayControlProps>;
    ReloadControl: FC<ReloadControlProps>;
    TimeControl: FC<TimeControlProps>;
}

export interface PlayControlProps {
    playing: boolean;
    living: boolean;
    onClick: MouseEventHandler<HTMLDivElement>;
}

export interface ReloadControlProps {
    onClick: MouseEventHandler<HTMLDivElement>;
}

export interface TimeControlProps {
    living: boolean;
    currentTime: number;
    totalTime: number;
}

