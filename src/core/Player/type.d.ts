import type { FC, MouseEventHandler } from 'react';
import type { VideoAttributes, VideoMethods, VideoSize } from '@/types/video';

export type PlayerRef = VideoAttributes & VideoMethods & { video: HTMLVideoElement };

export interface PlayerProps {
    url: string;
    width?: number;
    height?: number;
    isLive?: boolean;
    screenshot?: boolean;
    recording?: boolean;
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
    WebFullScreenControl: FC;
    FullScreenControl: FC;
}

export interface PlayControlProps {
    playing: boolean;
    isLive?: boolean;
    onClick: MouseEventHandler<HTMLDivElement>;
}

export interface ReloadControlProps {
    onClick: MouseEventHandler<HTMLDivElement>;
}

export interface TimeViewerProps {
    isLive?: boolean;
    currentTime: string;
    totalTime: string;
}

export interface TransmissionRateViewerProps {
    rate?: number;
}

export interface QualityControlProps {
    videoSize?: VideoSize;
}

export interface VideoFormatViewerProps {
    format?: string;
}

export interface SettingControlProps {
    ended: boolean;
}

