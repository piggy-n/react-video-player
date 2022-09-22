import { useVideoModel } from '@/utils/hooks/useVideoModel';
import { useContext, useEffect, useRef, useState } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';
import { StreamPlayer } from '@/utils/methods/streamPlayer';
import { useVideo } from '@/utils/hooks/useVideo';
import useMandatoryUpdate from '@/utils/hooks/useMandatoryUpdate';
import { classes } from '@/utils/methods/classes';
import Icon from '@/components/Icon';
import * as React from 'react';
import './styles/pipPlayer.scss';
import { VideoPlayer } from '@/utils/methods/videoPlayer';
import { useDebounceEffect, useReactive } from 'ahooks';

const cn = 'Pip-Player';

const PipPlayer = ({ isLive = true, url = '' }: { isLive: boolean, url: string }) => {
    const {
        ctrPlayerModel: {
            streamUrlList
        },
        setCtrPlayerModelData
    } = useContext(CtrPlayerContext);

    const { videoModel, dispatch } = useVideoModel();

    const videoRef = useRef<HTMLVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoPlayerRef = useRef<Record<string, any>>(new VideoPlayer({ dispatch }));
    const streamPlayerRef = useRef<Record<string, any>>(new StreamPlayer({ dispatch }));
    const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [buffering, setBuffering] = useState<boolean>(false);

    const mouseState = useReactive({
        mouseClickCount: 0,
    });

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

    const clickHandler = () => {
        if (!setCtrPlayerModelData) return;

        mouseState.mouseClickCount += 1;

        clickTimeoutRef.current && clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = setTimeout(
            () => {
                if (mouseState.mouseClickCount === 2) {
                    setCtrPlayerModelData({
                        type: 'streamUrlList',
                        payload: [streamUrlList[1] ?? '', streamUrlList[0]]
                    });
                }

                mouseState.mouseClickCount = 0;
            },
            300
        );
    };

    const {
        networkState,
        readyState,
        playing
    } = useVideo(
        videoRef.current as HTMLVideoElement,
        [videoRef.current]
    );

    useDebounceEffect(
        () => {
            if (
                (buffering && playing)
                ||
                (networkState === 2 && readyState <= 1)
                ||
                (videoModel.downloading)
            ) {
                setLoading(true);
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
        {
            wait: 100
        }
    );

    useEffect(
        () => {
            if (!videoRef.current) return;

            const videoEle = videoRef.current;
            const streamPlayer = streamPlayerRef.current;
            const videoPlayer = videoPlayerRef.current;

            if (isLive) {
                streamPlayer.stop();
                streamPlayer.start(videoEle, url);
            } else {
                videoPlayer.start(videoEle, url);
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
            isLive
        ]
    );

    return (
        <div
            ref={videoContainerRef}
            className={classes(cn, '')}
            onMouseOver={mouseOverHandler}
            onClick={clickHandler}
        >
            {
                !playing &&
                <div className={classes(cn, 'mask')}/>
            }
            <video
                ref={videoRef}
                muted
                autoPlay
                crossOrigin={'anonymous'}
            />
            {
                loading &&
                <div className={classes(cn, 'loading')}>
                    <Icon name={'loading'}/>
                </div>
            }
        </div>
    );
};

export default PipPlayer;
