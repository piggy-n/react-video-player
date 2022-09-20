import type { DependencyList } from 'react';
import { useMemo } from 'react';
import { useLatest } from 'ahooks';
import type { VideoMethods } from '@/types/video';

export const useVideoMethods = (
    ele: HTMLVideoElement,
    player: Record<string, any>,
    url: string,
    isLive: boolean,
    dep: DependencyList = []
) => {
    const videoEle = useLatest(ele);
    const playerEle = useLatest(player);

    const play = () => {
        isLive ? playerEle.current.start(videoEle, url) : videoEle.current.play();
    };

    const pause = () => {
        isLive ? playerEle.current.stop() : videoEle.current.pause();
    };

    const reload = () => {
        isLive ? playerEle.current.reload() : videoEle.current.load();
    };

    const setPlayProgress = (progress: number) => {
        if (isLive) return;

        videoEle.current.currentTime = progress;
    };

    const setVideoSrc = (src: string) => {
        isLive ? playerEle.current.start(videoEle, src) : videoEle.current.src = src;
    };

    return useMemo<VideoMethods>(
        () => ({
            play,
            pause,
            reload,
            setPlayProgress,
            setVideoSrc,
        }),
        [dep]
    );
};
