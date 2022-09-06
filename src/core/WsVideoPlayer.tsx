import * as React from 'react';
import Header from '@/core/Header';
import Player from '@/core/Player';
import { useState } from 'react';
import type { ResizeHandle } from 'react-resizable';
import { ResizableBox } from 'react-resizable';
import '@/global.scss';
import './wsVideoPlayer.scss';
import '@/assets/styles/resizableBox.css';
import { LayoutContext } from '@/utils/hooks/useLayoutContext';

const Draggable = require('react-draggable');

const WsVideoPlayer = () => {
    const [disabled, setDisabled] = useState<boolean>(true);
    const [size, setSize] = useState({ width: 482, height: 312 });
    const [resizing, setResizing] = useState<boolean>(false);
    const [resizeHandlesArr, setResizeHandlesArr] = useState<ResizeHandle[] | undefined>(['se', 'e', 's']);
    const [position, setPosition] = useState<{ x: number, y: number } | null>(null);

    const mouseOverHandler = (arg: boolean) => {
        setDisabled(arg);
    };

    const webFullScreenHandler = (arg: boolean) => {
        setPosition(arg ? { x: 0, y: 0 } : null);
        setResizeHandlesArr(arg ? [] : ['se', 'e', 's']);
    };

    return (
        <LayoutContext.Provider
            value={{
                resizing,
                onMouseOver: mouseOverHandler,
                onWebFullScreen: webFullScreenHandler,
            }}
        >
            <Draggable
                bounds={'parent'}
                disabled={disabled}
                position={position}
            >
                <ResizableBox
                    width={size.width}
                    height={size.height}
                    minConstraints={[482, 312]}
                    resizeHandles={resizeHandlesArr}
                    lockAspectRatio
                    onResizeStart={() => setResizing(true)}
                    onResizeStop={() => setResizing(false)}
                    onResize={(event, { size }) => setSize(size)}
                >
                    <div
                        className={'ws-video-player-container'}
                        onMouseLeave={() => setDisabled(true)}
                    >
                        <Header/>
                        <div className={'ws-player-wrapper'}>
                            <Player
                                isLive
                                url={'wss://lzz.enbo12119.com/live/1557971988926095361/101.live.mp4?token=49754077-2f7e-41ef-9f1b-835f1aff94a1'}
                            />
                        </div>
                    </div>
                </ResizableBox>
            </Draggable>
        </LayoutContext.Provider>
    );
};

export default WsVideoPlayer;