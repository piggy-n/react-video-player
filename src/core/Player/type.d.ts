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

}

export interface PlayerControllerInterface extends FC<PlayerControllerProps> {
    Panel: FC;
    ProgressBar: FC;
}

// export interface ControlPanelProps {
//
// }

export interface ControlPanelInterface extends FC<ControlPanelProps> {
    PlayControl: FC<PlayControlProps>;
    ReloadControl: FC<ReloadControlProps>;
    TimeViewer: FC<TimeViewerProps>;
    TransmissionRateViewer: FC<TransmissionRateViewerProps>;
    QualityControl: FC<QualityControlProps>;
    VideoFormatViewer: FC<VideoFormatViewerProps>;
    SettingControl: FC<SettingControlProps>;
    WebFullScreenControl: FC<WebFullScreenControlProps>;
}

export interface PlayControlProps {
    playing: boolean;
    living: boolean;
    onClick: MouseEventHandler<HTMLDivElement>;
}

export interface ReloadControlProps {
    onClick: MouseEventHandler<HTMLDivElement>;
}

export interface TimeViewerProps {
    living: boolean;
    currentTime: string;
    totalTime: string;
}

export interface TransmissionRateViewerProps {
    rate?: string;
}

export interface QualityControlProps {
    quality?: any;
}

export interface VideoFormatViewerProps {
    format?: string;
}

export interface SettingControlProps {

}

export interface WebFullScreenControlProps {

}

