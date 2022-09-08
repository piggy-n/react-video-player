import * as React from 'react';
import Header from '@/core/Header';
import Player from '@/core/Player';
import { useEffect, useRef, useState } from 'react';
import type { ResizeHandle } from 'react-resizable';
import { ResizableBox } from 'react-resizable';
import '@/global.scss';
import './wsVideoPlayer.scss';
import '@/assets/styles/resizableBox.css';
import { LayoutContext } from '@/utils/hooks/useLayoutContext';
import Controller from '@/core/Controller';
import type { Position, Size } from '@/types/video';
import { useUpdateEffect } from 'ahooks';

const Draggable = require('react-draggable');

const WsVideoPlayer = () => {
    const playerContainerRef = useRef<HTMLDivElement>(null);

    const [disabled, setDisabled] = useState<boolean>(true);
    const [resizing, setResizing] = useState<boolean>(false);
    const [resizeHandlesArr, setResizeHandlesArr] = useState<ResizeHandle[] | undefined>(['se', 'e', 's']);
    const [position, setPosition] = useState<Position | null>(null);
    const [size, setSize] = useState<Size | null>(null);
    const [minSize, setMinSize] = useState<Size | null>(null);
    const [controllerVisible, setControllerVisible] = useState<boolean>(false);

    const mouseOverHandler = (arg: boolean) => {
        setDisabled(arg);
    };

    const webFullScreenHandler = (arg: boolean) => {
        setPosition(arg ? { x: 0, y: 0 } : null);
        setResizeHandlesArr(arg ? [] : ['se', 'e', 's']);
    };

    const controllerVisibleChangeHandler = (arg: boolean) => {
        setControllerVisible(arg);
    };

    useEffect(() => {
        const { width, height } = playerContainerRef.current?.getBoundingClientRect() || { width: 0, height: 0 };

        setSize({ width, height });
        setMinSize({ width, height });

        if (playerContainerRef.current) {
            playerContainerRef.current.style.width = '100%';
            playerContainerRef.current.style.height = '100%';
        }
    }, [playerContainerRef.current]);

    useUpdateEffect(() => {
        if (size && minSize) {
            setSize({
                ...size,
                width: controllerVisible ? size.width + 180 : size.width - 180,
            });

            setMinSize({
                ...minSize,
                width: controllerVisible ? minSize.width + 180 : minSize.width - 180
            });
        }
    }, [controllerVisible]);

    return (
        <LayoutContext.Provider
            value={{
                resizing,
                controllerVisible,
                onMouseOver: mouseOverHandler,
                onWebFullScreen: webFullScreenHandler,
                onControllerVisibleChange: controllerVisibleChangeHandler,
            }}
        >
            <Draggable
                bounds={'parent'}
                disabled={disabled}
                position={position}
            >
                <ResizableBox
                    width={size?.width ?? 0}
                    height={size?.height ?? 0}
                    minConstraints={minSize ? [minSize.width, minSize.height] : undefined}
                    maxConstraints={[innerWidth, innerHeight]}
                    resizeHandles={resizeHandlesArr}
                    lockAspectRatio
                    onResizeStart={() => setResizing(true)}
                    onResizeStop={() => setResizing(false)}
                    onResize={(event, { size }) => setSize(size)}
                >
                    <div
                        ref={playerContainerRef}
                        className={'ws-video-player-container'}
                        onMouseLeave={() => setDisabled(true)}
                    >
                        <Header/>
                        <div className={'ws-player-wrapper'}>
                            <Player
                                isLive
                                url={'wss://lzz.enbo12119.com/live/1557971988926095361/101.live.mp4?token=d69d07a3-c588-4c5d-a33a-faaa23d77ad0'}
                                // url={'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/test/file/2021/07/01/haiwang.mp4'}
                            />
                            {
                                controllerVisible && <Controller/>
                            }
                        </div>
                    </div>
                </ResizableBox>
            </Draggable>
        </LayoutContext.Provider>
    );
};

export default WsVideoPlayer;