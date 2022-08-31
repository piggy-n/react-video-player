import * as React from 'react';
import Header from '@/core/Header';
import Player from '@/core/Player';
import { useMemo, useState } from 'react';
import { ResizableBox } from 'react-resizable';
import '@/global.scss';
import './wsVideoPlayer.scss';
import '@/assets/styles/resizableBox.css';
import { useVideoModel } from '@/utils/hooks/useVideoModel';
import { VideoContext } from '@/utils/hooks/useVideoContext';

const Draggable = require('react-draggable');

const WsVideoPlayer = () => {
    const [disabled, setDisabled] = useState(true);
    const [size, setSize] = useState({ width: 482, height: 312 });

    const { videoModel, dispatch } = useVideoModel();

    const videoContextValue = useMemo(
        () => {
            return Object.assign(
                {},
                {
                    videoModel,
                    dispatch,
                }
            );
        },
        [videoModel, dispatch]
    );

    const resizingHandler = (status: boolean) => {
        dispatch({
            type: 'resizing',
            payload: status,
        });
    };

    return (
        <Draggable bounds={'parent'} disabled={disabled}>
            <ResizableBox
                width={size.width}
                height={size.height}
                minConstraints={[482, 312]}
                resizeHandles={['se', 'e', 's']}
                lockAspectRatio
                onResizeStart={() => resizingHandler(true)}
                onResizeStop={() => resizingHandler(false)}
                onResize={(event, { size }) => setSize(size)}
            >
                <div
                    className={'ws-video-player-container'}
                    onMouseLeave={() => setDisabled(true)}
                >
                    <Header onMouseOver={arg => setDisabled(arg)}/>
                    <div className={'ws-player-wrapper'}>
                        <VideoContext.Provider value={videoContextValue}>
                            <Player onMouseOver={arg => setDisabled(arg)}/>
                        </VideoContext.Provider>
                    </div>
                </div>
            </ResizableBox>

        </Draggable>
    );
};

export default WsVideoPlayer;