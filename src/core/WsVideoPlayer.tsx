import * as React from 'react';
import Header from '@/core/Header';
import Player from '@/core/Player';
import { useState } from 'react';
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

    const mouseOverHandler = (arg: boolean) => {
        setDisabled(arg);
    };

    return (
        <LayoutContext.Provider
            value={{
                resizing,
                onMouseOver: mouseOverHandler,
            }}
        >
            <Draggable bounds={'parent'} disabled={disabled}>
                <ResizableBox
                    width={size.width}
                    height={size.height}
                    minConstraints={[482, 312]}
                    resizeHandles={['se', 'e', 's']}
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
                            <Player/>
                        </div>
                    </div>
                </ResizableBox>
            </Draggable>
        </LayoutContext.Provider>
    );
};

export default WsVideoPlayer;