import * as React from 'react';
import Header from '@/core/Header';
import Player from '@/core/Player';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ResizeHandle } from 'react-resizable';
import { ResizableBox } from 'react-resizable';
import '@/global.scss';
import './wsVideoPlayer.scss';
import '@/assets/styles/resizableBox.css';
import { LayoutContext } from '@/utils/hooks/useLayoutContext';
import Controller from '@/core/Controller';
import type { Position, Size } from '@/types/video';
import { useUpdateEffect } from 'ahooks';
import { useControllerModel } from '@/utils/hooks/useControllerModel';
import { ControllerContext } from '@/utils/hooks/useControllerContext';
import { obtainDeviceStream } from '@/services/video';
import type { DeviceStream } from '@/types/video';

const Draggable = require('react-draggable');

const WsVideoPlayer = ({ id }: { id: string }) => {
    const playerContainerRef = useRef<HTMLDivElement>(null);

    const [disabled, setDisabled] = useState<boolean>(true);
    const [resizing, setResizing] = useState<boolean>(false);
    const [resizeHandlesArr, setResizeHandlesArr] = useState<ResizeHandle[] | undefined>(['se', 'e', 's']);
    const [position, setPosition] = useState<Position | null>(null);
    const [size, setSize] = useState<Size | null>(null);
    const [minSize, setMinSize] = useState<Size | null>(null);
    const [deviceStreamList, setDeviceStreamList] = useState<DeviceStream[]>([]);

    const { controllerModel, dispatch } = useControllerModel();

    const controllerContextValue = useMemo(
        () => {
            return Object.assign(
                {},
                {
                    controllerModel,
                    dispatch,
                    id,
                    deviceStreamList
                }
            );
        },
        [controllerModel, dispatch, id, deviceStreamList]
    );

    const mouseOverHandler = (arg: boolean) => {
        setDisabled(arg);
    };

    const webFullScreenHandler = (arg: boolean) => {
        setPosition(arg ? { x: 0, y: 0 } : null);
        setResizeHandlesArr(arg ? [] : ['se', 'e', 's']);
    };

    useEffect(() => {
        obtainDeviceStream({ id }).then(res => {
            if (!res?.success) return;

            const list = res.list as DeviceStream[] || [];
            const token = `?token=${localStorage.getItem('accessToken')}`;
            // const prev = location.protocol.includes('https') ? 'wss:' : 'ws:';

            list.forEach(item => {
                // item.url = `${prev}//${window.location.host}${item.url}${token}`;
                item.url = `wss://lzz.enbo12119.com${item.url}${token}`;
            });

            setDeviceStreamList(list);
        });
    }, [id]);

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
        const { controllerVisible } = controllerModel;

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
    }, [controllerModel.controllerVisible]);

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
                        <ControllerContext.Provider value={controllerContextValue}>
                            <Header/>
                        </ControllerContext.Provider>
                        <div className={'ws-player-wrapper'}>
                            <Player
                                isLive
                                url={deviceStreamList[0]?.url ?? ''}
                                // url={'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/test/file/2021/07/01/haiwang.mp4'}
                            />
                            <ControllerContext.Provider value={controllerContextValue}>
                                <Controller/>
                            </ControllerContext.Provider>
                        </div>
                    </div>
                </ResizableBox>
            </Draggable>
        </LayoutContext.Provider>
    );
};

export default WsVideoPlayer;
