import type { CSSProperties, FC } from 'react';
import type { VideoAttributes, VideoCallBack, VideoMethods } from '@/types/video';

export type PlayerRef = VideoAttributes & VideoMethods & { video: HTMLVideoElement };

export interface PlayerProps extends Partial<VideoCallBack> {
    url: string;
    videoContainerStyle?: CSSProperties;
    isLive?: boolean;
    screenshot?: boolean;
    recording?: boolean;
    controllable?: boolean;
}

export interface PlayerControllerInterface extends FC<PlayerControllerProps> {
    Panel: FC;
    ProgressBar: FC;
}

export interface ControlPanelInterface extends FC<ControlPanelProps> {
    PlayControl: FC;
    ReloadControl: FC;
    TimeViewer: FC;
    TransmissionRateViewer: FC;
    QualityControl: FC;
    VideoFormatViewer: FC;
    SettingControl: FC;
    WebFullScreenControl: FC;
    FullScreenControl: FC;
}

