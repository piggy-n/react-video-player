import * as React from 'react';
import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { classes } from '@/utils/methods/classes';
import { PlayerController } from '@/core/Player/index';
import type { ForwardRefRenderFunction } from 'react';
import type { PlayerProps, PlayerRef } from '@/core/Player/type';
import './styles/player.scss';
import Icon from '@/components/Icon';
import { useVideo } from '@/utils/hooks/useVideo';
import { useVideoModel } from '@/utils/hooks/useVideoModel';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';
import { VideoContext } from '@/utils/hooks/useVideoContext';
import { useVideoMethods } from '@/utils/hooks/useVideoMethods';
import useVideoCallback from '@/utils/hooks/useVideoCallBack';
import useMandatoryUpdate from '@/utils/hooks/useMandatoryUpdate';
import { StreamPlayer } from '@/utils/methods/streamPlayer';
import { VideoPlayer } from '@/utils/methods/videoPlayer';
import { useSize } from 'ahooks';
import type { Stream } from '@/types/ctrPlayer';
import { obtainDeviceStream } from '@/services/device';

const cn = 'Player';

const InternalPlayer: ForwardRefRenderFunction<PlayerRef, PlayerProps> = (
    {
        isLive = true,
        url = '',
        deviceId,
        controllable = true,
        playerId,
        videoContainerStyle = {},
        videoOpts = {},
        devOL,
        devLC,
        onlyShowRate,
        ...rest
    },
    ref
) => {
    const { setCtrPlayerModelData } = useContext(CtrPlayerContext);

    const { videoModel, dispatch } = useVideoModel();

    const videoRef = useRef<HTMLVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoPlayerRef = useRef<Record<string, any>>(new VideoPlayer({ dispatch }));
    const streamPlayerRef = useRef<Record<string, any>>(new StreamPlayer({ dispatch }));
    const videoResizingTimerRef = useRef<NodeJS.Timer | null>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [buffering, setBuffering] = useState<boolean>(false);
    const [mainUrl, setMainUrl] = useState<string>('');
    const [rateVisible, setRateVisible] = useState<boolean>(false);
    const timer = useRef<NodeJS.Timeout | null>(null);

    const videoContainerSize = useSize(videoContainerRef);

    const forceUpdate = useMandatoryUpdate();

    const waitingListener = () => {
        setBuffering(true);
    };

    const playingListener = () => {
        setBuffering(false);
    };

    const mouseOverHandler = () => {
        if (setCtrPlayerModelData) {
            setCtrPlayerModelData({
                type: 'disableDrag',
                payload: true
            });
        }
    };

    const {
        videoAttributes,
        networkState,
        readyState,
        playing
    } = useVideo(
        videoRef.current as HTMLVideoElement,
        [videoRef.current]
    );

    const videoMethods = useVideoMethods(
        videoRef.current as HTMLVideoElement,
        streamPlayerRef.current,
        url,
        isLive,
        [
            videoRef.current,
            streamPlayerRef.current,
            url,
            isLive
        ]
    );

    const videoContextValue = useMemo(
        () => {
            return Object.assign(
                {},
                {
                    videoModel,
                    dispatch,
                    videoAttributes,
                    videoEle: videoRef.current,
                    videoContainerEle: videoContainerRef.current,
                    streamPlayer: streamPlayerRef.current,
                    videoPlayer: videoPlayerRef.current,
                    isLive,
                    ...rest
                }
            );
        },
        [
            videoModel,
            dispatch
        ]
    );

    useVideoCallback(
        videoAttributes,
        {
            ...rest
        }
    );

    useImperativeHandle(
        ref,
        () => ({
            video: videoRef.current as HTMLVideoElement,
            ...videoAttributes,
            ...videoMethods,
        }),
    );

    useEffect(
        () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            if ((buffering && playing) || (networkState <= 2 && readyState <= 1)) {
                timer.current = setTimeout(() => setLoading(true), 1000);
            } else {
                setLoading(false);
            }
        },
        [
            buffering,
            playing,
            networkState,
            readyState,
            videoModel.downloading
        ],
    );

    useEffect(() => {
        if (deviceId) {
            const streams: Stream[] = [];
            const token = `?token=${localStorage.getItem('accessToken')}`;
            const prev = location.protocol.includes('https') ? 'wss:' : 'ws:';
            const wsUrl = `${prev}//${window.location.host}`;

            obtainDeviceStream({ id: deviceId }).then(res => {
                if (!res?.success) return;

                const list = res.list as Stream[] || [];
                list.forEach(item => {
                    if (item.url) {
                        item.value = `${wsUrl}${item.url}${token}`;

                        if (devLC) {
                            item.value = `ws://192.168.9.148${item.url}${token}`;
                        }

                        if (devOL) {
                            item.value = `wss://lzz.enbo12119.com${item.url}${token}`;
                        }
                    }

                    streams.push(item);
                });

                const mainStream = streams.find(item => item?.channelCode === '1' && item?.streamTypeCode === '1') || streams[0];
                if (!mainStream?.value) return;
                setMainUrl(mainStream.value);
            });
        }
    }, [deviceId]);

    useEffect(
        () => {
            if (!videoRef.current) return;
            setLoading(true);
            const videoEle = videoRef.current;
            const streamPlayer = streamPlayerRef.current;
            // const videoPlayer = videoPlayerRef.current;

            if (isLive) {
                streamPlayer.stop();
                streamPlayer.start(videoEle, url || mainUrl);
            } else {
                // videoPlayer.start(videoEle, url);
                videoEle.src = url;
            }

            forceUpdate();

            videoEle.addEventListener('waiting', waitingListener);
            videoEle.addEventListener('playing', playingListener);

            return () => {
                videoEle.removeEventListener('waiting', waitingListener);
                videoEle.removeEventListener('playing', playingListener);
            };
        },
        [
            videoRef.current,
            url,
            mainUrl,
            isLive
        ]
    );

    useEffect(
        () => {
            dispatch({
                type: 'resizing',
                payload: true
            });

            videoResizingTimerRef.current = setTimeout(
                () => {
                    dispatch({
                        type: 'resizing',
                        payload: false
                    });
                },
                300
            );

            return () => {
                clearTimeout(videoResizingTimerRef.current as NodeJS.Timer);
            };
        },
        [videoContainerSize]
    );

    return (
        <div
            id={'ws-player-container'}
            ref={videoContainerRef}
            className={classes(cn, '')}
            style={{ ...videoContainerStyle }}
            onMouseOver={mouseOverHandler}
            onMouseEnter={onlyShowRate ? () => setRateVisible(true) : undefined}
            onMouseLeave={onlyShowRate ? () => setRateVisible(false) : undefined}
        >
            <video
                ref={videoRef}
                id={playerId}
                muted
                autoPlay
                crossOrigin={'anonymous'}
                {...videoOpts}
            />
            {
                loading &&
                <div className={classes(cn, 'loading')}>
                    <Icon name={'loading'} size={!controllable ? 16 : 24} />
                    {
                        controllable &&
                        <p>
                            正在加载中
                            {videoModel.downloading ? ` ${videoModel.percentComplete}%` : '...'}
                        </p>
                    }
                </div>
            }
            {
                controllable &&
                <VideoContext.Provider value={videoContextValue}>
                    <PlayerController />
                </VideoContext.Provider>
            }
            {
                onlyShowRate && !controllable &&
                <div
                    className={classes(cn, 'rate')}
                    style={{ opacity: rateVisible ? 1 : 0 }}
                >
                    {
                        videoModel.transmissionRate >= 1024
                            ? `${(videoModel.transmissionRate / 1024).toFixed(2)}MBps`
                            : `${videoModel.transmissionRate.toFixed(2)}KBps`
                    }
                </div>
            }
        </div>
    );
};

export const Player = forwardRef<PlayerRef, PlayerProps>(InternalPlayer);
