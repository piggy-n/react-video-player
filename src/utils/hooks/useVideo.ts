import type { DependencyList } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import useMandatoryUpdate from '@/utils/hooks/useMandatoryUpdate';
import type { VideoAttributes } from '@/types/video';
import { useLatest } from 'ahooks';

export interface UseVideo extends VideoAttributes {
    videoAttributes: VideoAttributes;
    changePlayStatusHandler: () => void;
}

export const useVideo = (ele: HTMLVideoElement, dep: DependencyList = []) => {
    const videoEle = useLatest(ele);

    const forceUpdate = useMandatoryUpdate();

    const videoInterval = useRef<NodeJS.Timeout | null>(null);
    const videoArgsRef = useRef<VideoAttributes>({
        playing: true,
        currentTime: 0,
        totalTime: 0,
        bufferedTime: 0,
        inPip: false,
        ended: false,
        error: null,
        videoSize: {
            videoWidth: 0,
            videoHeight: 0
        },
        networkState: 0,
        readyState: 0,
    });

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
                    videoSize: {
                        videoWidth: video.videoWidth,
                        videoHeight: video.videoHeight
                    },
                });
            });

            video.addEventListener('progress', () => {
                if (video.buffered.length >= 1) {
                    setVideoArgsHandler({
                        bufferedTime: video.buffered.end(0),
                    });
                }
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
                    playing: !video.paused,
                });
            });

            video.addEventListener('pause', () => {
                setVideoArgsHandler({
                    playing: !video.paused,
                });
            });

            video.addEventListener('timeupdate', () => {
                setVideoArgsHandler({
                    playing: !video.paused,
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

            videoInterval.current = setInterval(
                () => {
                    forceUpdate();

                    setVideoArgsHandler({
                        currentTime: video.currentTime,
                        totalTime: video.duration,
                        playing: !video.paused,
                        ended: video.ended,
                        videoSize: {
                            videoWidth: video.videoWidth,
                            videoHeight: video.videoHeight
                        },
                        networkState: video.networkState,
                        readyState: video.readyState,
                    });
                },
                1
            );
        }

        return () => {
            videoInterval.current && clearInterval(videoInterval.current);
        };
    }, dep);

    return useMemo<UseVideo>(
        () => ({
            ...videoArgsRef.current,
            videoAttributes: videoArgsRef.current,
            changePlayStatusHandler,
        }),
        [videoArgsRef.current]
    );
};
