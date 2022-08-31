import type { DependencyList } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import useMandatoryUpdate from '@/utils/hooks/useMandatoryUpdate';
import type { VideoAttributes, VideoMethods } from '@/types/video';
import { useLatest } from 'ahooks';

export interface UseVideo extends VideoAttributes {
    videoAttributes: VideoAttributes;
    videoMethods: VideoMethods;
    changePlayStatusHandler: () => void;
}

export const useVideo = (ele: HTMLVideoElement, dep: DependencyList = []) => {
    const videoEle = useLatest(ele);

    const forceUpdate = useMandatoryUpdate();

    const videoInterval = useRef<NodeJS.Timeout | null>(null);
    const videoArgsRef = useRef<VideoAttributes>({
        playing: false,
        currentTime: 0,
        totalTime: 0,
        bufferedTime: 0,
        inPip: false,
        ended: false,
        error: null,
    });

    const videoMethods = useMemo<VideoMethods>(
        () => ({
            play: () => videoEle.current.play(),
            pause: () => videoEle.current.pause(),
            reload: () => videoEle.current.load(),
            setPlayProgress: (progress: number) => videoEle.current.currentTime = progress,
            setVideoSrc: (src: string) => videoEle.current.src = src,
        }),
        [dep]
    );

    const setVideoArgsHandler = <T extends Partial<VideoAttributes>>(val: T) => {
        videoArgsRef.current = { ...videoArgsRef.current, ...val };
    };

    const changePlayStatusHandler = () => {
        if (videoArgsRef.current.playing) {
            videoEle.current.pause();
        } else {
            videoEle.current.play();
        }
    };

    useEffect(() => {
        if (videoEle.current) {
            const video = videoEle.current;

            video.addEventListener('canplay', () => {
                setVideoArgsHandler({
                    totalTime: video.duration,
                });
            });

            video.addEventListener('progress', () => {
                setVideoArgsHandler({
                    bufferedTime: video.buffered.end(0),
                });
            });

            video.addEventListener('enterpictureinpicture', () => {
                setVideoArgsHandler({
                    inPip: true,
                });
            });

            video.addEventListener('leavepictureinpicture', () => {
                setVideoArgsHandler({
                    inPip: false,
                });
            });

            video.addEventListener('play', () => {
                setVideoArgsHandler({
                    playing: video.paused,
                });
            });

            video.addEventListener('pause', () => {
                setVideoArgsHandler({
                    playing: video.paused,
                });
            });

            video.addEventListener('timeupdate', () => {
                setVideoArgsHandler({
                    playing: video.paused,
                });
            });

            video.addEventListener('ended', () => {
                setVideoArgsHandler({
                    ended: video.ended,
                });
            });

            video.addEventListener('error', () => {
                setVideoArgsHandler({
                    error: Date.now(),
                });
            });

            videoInterval.current = setInterval(() => {
                forceUpdate();

                setVideoArgsHandler({
                    currentTime: video.currentTime,
                    playing: !video.paused,
                    ended: video.ended,
                });
            });
        }

        return () => {
            videoInterval.current && clearInterval(videoInterval.current);
        };
    }, dep);

    return useMemo<UseVideo>(
        () => ({
            ...videoArgsRef.current,
            videoAttributes: videoArgsRef.current,
            videoMethods,
            changePlayStatusHandler,
        }),
        [videoArgsRef.current]
    );
};