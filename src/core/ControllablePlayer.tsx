import * as React from 'react';
import Header from '@/core/Header';
import Player from '@/core/Player';
// import PipPlayer from '@/core/Player/pipPlayer';
import Controller from '@/core/Controller';
import { ResizableBox } from 'react-resizable';
import { useEffect, useMemo, useRef, useState } from 'react';
import './controllablePlayer.scss';
import '@/assets/styles/global.scss';
import '@/assets/styles/resizableBox.css';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';
import { useCtrPlayerModel } from '@/utils/hooks/useCtrPlayerModel';
// import { useUpdateEffect } from 'ahooks';
// import { useControllerModel } from '@/utils/hooks/useControllerModel';
// import { ControllerContext } from '@/utils/hooks/useControllerContext';
// import type { DeviceStream } from '@/types/video';
import type { Size, Stream, Service } from '@/types/ctrPlayer';
import { obtainDeviceService, obtainDeviceStream } from '@/services/device';

const Draggable = require('react-draggable');

const ControllablePlayer = ({ id }: { id: string }) => {
    const playerContainerRef = useRef<HTMLDivElement>(null);

    const { ctrPlayerModel, setCtrPlayerModelData } = useCtrPlayerModel();

    const ctrPlayerContextValue = useMemo(
        () => {
            return Object.assign(
                {},
                {
                    ctrPlayerModel,
                    setCtrPlayerModelData
                }
            );
        },
        [ctrPlayerModel]
    );

    const [size, setSize] = useState<Size | null>(null);
    const [minSize, setMinSize] = useState<Size | null>(null);
    // const [deviceStreamList, setDeviceStreamList] = useState<DeviceStream[]>([]);

    const mouseLeaveHandler = () => {
        setCtrPlayerModelData({
            type: 'disableDrag',
            payload: true
        });
    };
    // const { controllerModel, dispatch } = useControllerModel();
    //
    // const controllerContextValue = useMemo(
    //     () => {
    //         return Object.assign(
    //             {},
    //             {
    //                 controllerModel,
    //                 dispatch,
    //                 id,
    //                 deviceStreamList,
    //                 playerContainerEle: playerContainerRef.current,
    //             }
    //         );
    //     },
    //     [controllerModel, dispatch, id, deviceStreamList]
    // );

    useEffect(() => {
        const {
            width,
            height
        } = playerContainerRef.current?.getBoundingClientRect() || { width: 0, height: 0 };

        setSize({ width, height });
        setMinSize({ width, height });

        if (playerContainerRef.current) {
            playerContainerRef.current.style.width = '100%';
            playerContainerRef.current.style.height = '100%';
        }
    }, [playerContainerRef.current]);

    useEffect(() => {
        const streams: Stream[] = [];
        const token = `?token=${localStorage.getItem('accessToken')}`;
        const prev = location.protocol.includes('https') ? 'wss:' : 'ws:';
        const wsUrl = `${prev}//${window.location.host}`;

        obtainDeviceStream({ id }).then(res => {
            if (!res?.success) {
                setCtrPlayerModelData({
                    type: 'streams',
                    payload: streams,
                });
                return;
            }

            const list = res.list as Stream[] || [];
            list.forEach(item => {
                item.value = `${wsUrl}${item.url}${token}`;
                item.value = `wss://lzz.enbo12119.com${item.url}${token}`;

                if (item.streamTypeCode === '1') {
                    item.label = `${item.channelDesc}（主）`;
                }

                if (item.streamTypeCode === '2') {
                    item.label = `${item.channelDesc}（辅）`;
                }

                streams.push(item);
            });

            setCtrPlayerModelData({
                type: 'streams',
                payload: streams,
            });
        });

        obtainDeviceService({ id }).then(res => {
            const feature = {
                stream: false,
                control: false,
                record: false,
            };

            if (!res?.success) {
                setCtrPlayerModelData({
                    type: 'feature',
                    payload: feature,
                });
                return;
            }

            const list = res.list as Service[] || [];

            list.forEach(item => {
                if (item.serviceCode.includes('stream')) {
                    feature.stream = true;
                }

                if (item.serviceCode.includes('ptz')) {
                    feature.control = true;
                }

                if (item.serviceCode.includes('videoRecord')) {
                    feature.record = true;
                }
            });

            setCtrPlayerModelData({
                type: 'feature',
                payload: feature,
            });
        });
    }, [id]);

    // useUpdateEffect(() => {
    //     const { controllerVisible } = controllerModel;
    //
    //     if (size && minSize) {
    //         setSize({
    //             ...size,
    //             width: controllerVisible ? size.width + 180 : size.width - 180,
    //         });
    //
    //         setMinSize({
    //             ...minSize,
    //             width: controllerVisible ? minSize.width + 180 : minSize.width - 180
    //         });
    //     }
    // }, [controllerModel.controllerVisible]);
    //
    // useUpdateEffect(() => {
    //     if (controllerModel.isDoubleGrid) {
    //         if (size && minSize) {
    //             setSize({
    //                 ...size,
    //                 width: size.width * 2,
    //             });
    //
    //             setMinSize({
    //                 ...minSize,
    //                 width: minSize.width * 2
    //             });
    //         }
    //     } else {
    //         if (size && minSize) {
    //             setSize({
    //                 ...size,
    //                 width: size.width / 2,
    //             });
    //
    //             setMinSize({
    //                 ...minSize,
    //                 width: minSize.width / 2
    //             });
    //         }
    //     }
    // }, [controllerModel.isDoubleGrid]);

    return (
        <CtrPlayerContext.Provider value={ctrPlayerContextValue}>
            <Draggable
                bounds={'parent'}
                position={ctrPlayerModel.position}
                disabled={ctrPlayerModel.disableDrag}
            >
                <ResizableBox
                    width={size?.width ?? 0}
                    height={size?.height ?? 0}
                    minConstraints={minSize ? [minSize.width, minSize.height] : undefined}
                    maxConstraints={[innerWidth, innerHeight]}
                    resizeHandles={ctrPlayerModel.resizeHandlesArr}
                    lockAspectRatio
                    onResize={(event, { size }) => setSize(size)}
                >
                    <div
                        ref={playerContainerRef}
                        className={'ws-video-player-container'}
                        onMouseLeave={mouseLeaveHandler}
                    >
                        <Header/>
                        <div className={'ws-player-wrapper'}>
                            <Player
                                isLive={false}
                                videoContainerStyle={{
                                    minHeight: '270px',
                                    minWidth: '480px',
                                }}
                                // url={'wss://lzz.enbo12119.com/live/1560452005253799937/101.live.mp4?token=1477fabe-4fab-4b65-8c32-a915558859dc'}
                                url={'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/test/file/2021/07/01/haiwang.mp4'}
                                // url={'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/prod/file/2021/08/31/540p.mp4'}
                            />
                            {/*{*/}
                            {/*    controllerModel.isDoubleGrid &&*/}
                            {/*    <Player*/}
                            {/*        isLive*/}
                            {/*        url={controllerModel.urlList[1] ?? ''}*/}
                            {/*    />*/}
                            {/*}*/}
                            {/*{*/}
                            {/*    controllerModel.isPip &&*/}
                            {/*    <div className={'ws-pip-container'}>*/}
                            {/*        <PipPlayer*/}
                            {/*            isLive*/}
                            {/*            url={controllerModel.urlList[1] ?? ''}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*}*/}
                            <Controller/>
                        </div>
                    </div>
                </ResizableBox>
            </Draggable>
        </CtrPlayerContext.Provider>
    );
};

export default ControllablePlayer;
