import type { CSSProperties, FC, ForwardRefExoticComponent, RefAttributes, VideoHTMLAttributes } from 'react';
import type { Position } from './types/ctrPlayer';
import type { VideoCallBack } from './types/video';
import type { VideoAttributes, VideoCallBack, VideoMethods } from '@/types/video';

interface ControllablePlayerProps {
    deviceId: string;
    deviceName?: string;
    deviceStatus?: boolean;
    onClose?: () => void;
    bounds?: DraggableBounds | string | false,
    style?: CSSProperties,
    devLC?: boolean,
    devOL?: boolean,
    poster?: string,
    onlyRecord?: boolean,
    defaultPosition?: Position,
}

interface PlayerProps extends Partial<VideoCallBack> {
    url: string;
    videoContainerStyle?: CSSProperties;
    isLive?: boolean;
    screenshot?: boolean;
    recording?: boolean;
    controllable?: boolean;
    playerId?: string;
    videoOpts?: VideoHTMLAttributes<HTMLVideoElement>;
    deviceId?: string;
    devLC?: boolean;
    devOL?: boolean;
    onlyShowRate?: boolean;
    fullScreen?: boolean;
}

type PlayerRef = VideoAttributes & VideoMethods & { video: HTMLVideoElement };

interface PlayerCompoent extends ForwardRefExoticComponent<PlayerProps & RefAttributes<PlayerRef>> {
}

declare const ControllablePlayer: FC<ControllablePlayerProps>;
export default ControllablePlayer;
export { ControllablePlayer };

declare const Player: PlayerCompoent;
export default Player;
export { Player };
