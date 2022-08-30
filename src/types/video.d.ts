export interface VideoAttributes {
    playing: boolean;
    currentTime: number;
    totalTime: number;
    bufferedTime: number;
    inPip: boolean;
    ended: boolean;
    error: null | number;
}

export interface VideoMethods {
    play: () => void;
    pause: () => void;
    reload: () => void;
    setPlayProgress: (progress: number) => void;
    setVideoSrc: (src: string) => void;
}

export interface VideoCallBack<T = VideoAttributes> {
    onPlay: (par: T) => void;
    onPause: (par: T) => void;
    onTimeUpdate: (par: T) => void;
    onEnded: (par: T) => void;
    onProgressMouseDown: (par: T) => void;
    onProgressMouseUp: (par: T) => void;
    onError: () => void;
}