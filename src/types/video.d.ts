export type VideoSize = {
    videoWidth: number;
    videoHeight: number;
}

export interface VideoAttributes {
    playing: boolean;
    currentTime: number;
    totalTime: number;
    bufferedTime: number;
    inPip: boolean;
    ended: boolean;
    error: null | number;
    videoSize: VideoSize;
    networkState: number;
    readyState: number;
}

export interface VideoMethods {
    play: () => void;
    pause: () => void;
    reload: () => void;
    setPlayProgress: (progress: number) => void;
    setVideoSrc: (src: string) => void;
}

export interface VideoCallBack<T = VideoAttributes> {
    onPlay: (arg: T) => void;
    onPause: (arg: T) => void;
    onTimeUpdate: (arg: T) => void;
    onEnded: (arg: T) => void;
    onProgressMouseDown: (arg: T) => void;
    onProgressMouseUp: (arg: T) => void;
    onVideoStateChange: (arg: T) => void;
    onError: () => void;
}
