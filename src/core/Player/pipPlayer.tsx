import { useVideoModel } from '@/utils/hooks/useVideoModel';
import { useContext, useEffect, useRef, useState } from 'react';
import { LayoutContext } from '@/utils/hooks/useLayoutContext';
import { StreamH265Player } from '@/utils/methods/h265Player';
import { useVideo } from '@/utils/hooks/useVideo';
import useMandatoryUpdate from '@/utils/hooks/useMandatoryUpdate';
import { classes } from '@/utils/methods/classes';
import Icon from '@/components/Icon';
import * as React from 'react';
import './styles/player.scss';

const cn = 'Player';

const PipPlayer = ({ isLive = true, url = '' }: { isLive: boolean, url: string }) => {

    const { dispatch } = useVideoModel();

    const { onMouseOver } = useContext(LayoutContext);

    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoUsefulTimerRef = useRef<NodeJS.Timer | null>(null);
    const H265PlayerRef = useRef<any>(new StreamH265Player({ dispatch }));

    const [loading, setLoading] = useState<boolean>(false);

    const {
        networkState,
        readyState,
        playing
    } = useVideo(
        videoRef.current as HTMLVideoElement,
        [videoRef.current]
    );

    const forceUpdate = useMandatoryUpdate();

    const waitingListener = () => {
        setLoading(true);
    };

    const playingListener = () => {
        setLoading(false);
    };

    useEffect(() => {
        const videoEle = videoRef.current as HTMLVideoElement;

        if (!videoEle.paused) {
            H265PlayerRef.current.stop();
        }

        isLive ? H265PlayerRef.current.start(videoEle, url) : videoEle.src = url;

        forceUpdate();

        videoUsefulTimerRef.current = setTimeout(
            () => {
                if (videoEle.networkState === 0 || videoEle.networkState === 3) {
                    console.error('Video is not loaded');
                    setLoading(false);
                } else {
                    clearTimeout(videoUsefulTimerRef.current as NodeJS.Timer);
                }
            },
            3000
        );

        videoEle.addEventListener('waiting', waitingListener);
        videoEle.addEventListener('playing', playingListener);

        return () => {
            videoEle.removeEventListener('waiting', waitingListener);
            videoEle.removeEventListener('playing', playingListener);

            videoUsefulTimerRef.current && clearTimeout(videoUsefulTimerRef.current as NodeJS.Timer);
        };
    }, [videoRef.current, url, isLive]);

    return (
        <div
            ref={videoContainerRef}
            className={classes(cn, '')}
            onMouseOver={() => onMouseOver && onMouseOver(true)}
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
                ((loading && playing) || (networkState === 2 && readyState <= 1)) &&
                <div className={classes(cn, 'loading')}>
                    <Icon name={'loading'} size={24}/>
                    <p>正在加载中...</p>
                </div>
            }
        </div>
    );
};

export default PipPlayer;
