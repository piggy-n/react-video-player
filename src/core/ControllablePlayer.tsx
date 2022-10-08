import * as React from 'react';
import Header from '@/core/Header';
import { ResizableBox } from 'react-resizable';
import type { FC } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import './controllablePlayer.scss';
import '@/assets/styles/global.scss';
import '@/assets/styles/resizableBox.css';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';
import { useCtrPlayerModel } from '@/utils/hooks/useCtrPlayerModel';
import type { Size, Stream, Service, ControllablePlayerProps } from '@/types/ctrPlayer';
import { obtainDeviceService, obtainDeviceStream } from '@/services/device';
import { useUpdateEffect } from 'ahooks';
import CompositePlayer from '@/core/CompositePlayer';
import { releaseControlAccess } from '@/services/controller';

const Draggable = require('react-draggable');

const ControllablePlayer: FC<ControllablePlayerProps> = (
    {
        deviceId = '',
        deviceName = '',
        deviceStatus = false,
        onClose,
        bounds = false,
        style
    }) => {
    const playerContainerRef = useRef<HTMLDivElement>(null);

    const [size, setSize] = useState<Size | null>(null);
    const [minSize, setMinSize] = useState<Size | null>(null);

    const { ctrPlayerModel, setCtrPlayerModelData } = useCtrPlayerModel();

    const ctrPlayerContextValue = useMemo(
        () => {
            return Object.assign(
                {},
                {
                    ctrPlayerModel,
                    setCtrPlayerModelData,
                    deviceId,
                    deviceName,
                    deviceStatus,
                    onClose
                }
            );
        },
        [
            ctrPlayerModel,
            deviceId
        ]
    );

    const mouseLeaveHandler = () => {
        setCtrPlayerModelData({
            type: 'disableDrag',
            payload: true
        });
    };

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
        if (deviceId === '') return;

        const streams: Stream[] = [];
        const token = `?token=${localStorage.getItem('accessToken')}`;
        const prev = location.protocol.includes('https') ? 'wss:' : 'ws:';
        const wsUrl = `${prev}//${window.location.host}`;

        obtainDeviceStream({ id: deviceId }).then(res => {
            if (!res?.success) {
                setCtrPlayerModelData({
                    type: 'streams',
                    payload: streams,
                });

                setCtrPlayerModelData({
                    type: 'streamUrlList',
                    payload: []
                });

                return;
            }

            const list = res.list as Stream[] || [];

            list.forEach(item => {
                item.value = `${wsUrl}${item.url}${token}`; // todo
                item.value = `wss://lzz.enbo12119.com${item.url}${token}`;
                // item.value = `ws://192.168.9.148${item.url}${token}`;

                if (item.streamTypeCode === '1') {
                    item.label = `${item.channelDesc}（主）`;
                }

                if (item.streamTypeCode === '2') {
                    item.label = `${item.channelDesc}（辅）`;
                }

                streams.push(item);
            });

            const mainStream = streams.find(item => item?.channelCode === '1' && item?.streamTypeCode === '1') || streams[0];

            setCtrPlayerModelData({
                type: 'streams',
                payload: streams,
            });

            setCtrPlayerModelData({
                type: 'streamUrlList',
                payload: mainStream ? [mainStream.value] : []
            });
        });

        obtainDeviceService({ id: deviceId }).then(res => {
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
    }, [deviceId]);

    useUpdateEffect(() => {
        const { panelVisible } = ctrPlayerModel;

        if (size && minSize) {
            setSize({
                ...size,
                width: panelVisible ? size.width + 180 : size.width - 180,
            });

            setMinSize({
                ...minSize,
                width: panelVisible ? minSize.width + 180 : minSize.width - 180
            });
        }
    }, [ctrPlayerModel.panelVisible]);

    useUpdateEffect(() => {
        const { mode, prevMode, panelVisible } = ctrPlayerModel;

        if (mode !== 'double' && prevMode !== 'double') return;

        if (size && minSize) {
            setSize({
                ...size,
                width: panelVisible
                    ? (mode === 'double' ? size.width * 2 - 180 : size.width / 2 + 90)
                    : (mode === 'double' ? size.width * 2 : size.width / 2),
            });

            setMinSize({
                ...minSize,
                width: panelVisible
                    ? (mode === 'double' ? minSize.width * 2 - 180 : minSize.width / 2 + 90)
                    : (mode === 'double' ? minSize.width * 2 : minSize.width / 2)
            });
        }
    }, [ctrPlayerModel.mode]);

    useUpdateEffect(() => {
        if (deviceId === '') return;

        const { isController, isVideoList } = ctrPlayerModel;

        if (!isController) {
            releaseControlAccess({
                id: deviceId
            }).then(res => {
                if (!res?.success) return;

                if (res.success) {
                    setCtrPlayerModelData!({
                        type: 'isController',
                        payload: false
                    });

                    if (!isVideoList) {
                        setCtrPlayerModelData!({
                            type: 'panelVisible',
                            payload: false
                        });
                    }
                }
            });
        }
    }, [ctrPlayerModel.isController, ctrPlayerModel.isVideoList]);

    return (
        <div
            id={'ws-crt-player'}
            className={'ws-crt-player-container'}
            style={{ ...style }}
        >
            <CtrPlayerContext.Provider value={ctrPlayerContextValue}>
                <Draggable
                    bounds={bounds}
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
                            <CompositePlayer/>
                        </div>
                    </ResizableBox>
                </Draggable>
            </CtrPlayerContext.Provider>
        </div>
    );
};

export default ControllablePlayer;
