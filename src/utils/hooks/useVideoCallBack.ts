import type { VideoAttributes, VideoCallBack } from '@/types/video';
import { useEffect } from 'react';

const useVideoCallback = (
    videoAttributes: VideoAttributes,
    callback: Partial<VideoCallBack>
) => {
    const {
        playing,
        ended,
        currentTime,
        error,
        networkState,
        readyState,
    } = videoAttributes;

    const {
        onPlay,
        onPause,
        onTimeUpdate,
        onEnded,
        onVideoStateChange,
        onError,
    } = callback;

    useEffect(() => {
        if (playing) {
            onPlay && onPlay(videoAttributes);
        } else {
            onPause && onPause(videoAttributes);
        }
    }, [playing]);

    useEffect(() => {
        if (ended) {
            onEnded && onEnded(videoAttributes);
        }
    }, [ended]);

    useEffect(() => {
        if (currentTime) {
            onTimeUpdate && onTimeUpdate(videoAttributes);
        }
    }, [currentTime]);

    useEffect(() => {
        if (error) {
            onError && onError();
        }
    }, [error]);

    useEffect(() => {
        onVideoStateChange && onVideoStateChange(videoAttributes);
    }, [networkState, readyState]);
};

export default useVideoCallback;