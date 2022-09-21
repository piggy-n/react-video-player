import { useVideoModel } from '@/utils/hooks/useVideoModel';
import { useContext, useEffect, useRef, useState } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';
import { StreamPlayer } from '@/utils/methods/streamPlayer';
import { useVideo } from '@/utils/hooks/useVideo';
import useMandatoryUpdate from '@/utils/hooks/useMandatoryUpdate';
import { classes } from '@/utils/methods/classes';
import Icon from '@/components/Icon';
import * as React from 'react';
import './styles/player.scss';
import { VideoPlayer } from '@/utils/methods/videoPlayer';

const cn = 'Player';

const PipPlayer = ({ isLive = true, url = '' }: { isLive: boolean, url: string }) => {
    const { setCtrPlayerModelData } = useContext(CtrPlayerContext);

    const { videoModel, dispatch } = useVideoModel();

    const videoRef = useRef<HTMLVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoPlayerRef = useRef<Record<string, any>>(new VideoPlayer({ dispatch }));
    const streamPlayerRef = useRef<Record<string, any>>(new StreamPlayer({ dispatch }));

    const [loading, setLoading] = useState<boolean>(false);
    const [buffering, setBuffering] = useState<boolean>(false);

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
        networkState,
        readyState,
        playing
    } = useVideo(
        videoRef.current as HTMLVideoElement,
        [videoRef.current]
    );

    useEffect(
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
        ]
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
            style={{
                width: '100%',
                height: '100%',
                minWidth: 'auto',
                minHeight: 'auto',
            }}
        >
            <video
                ref={videoRef}
                muted
                autoPlay
                crossOrigin={'anonymous'}
            />
            {
                loading &&
                <div className={classes(cn, 'loading')}>
                    <Icon name={'loading'} size={24}/>
                    <p>
                        正在加载中
                        {videoModel.downloading ? ` ${videoModel.percentComplete}%` : '...'}
                    </p>
                </div>
            }
        </div>
    );
};

export default PipPlayer;
