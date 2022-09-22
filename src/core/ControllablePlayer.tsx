import * as React from 'react';
import Header from '@/core/Header';
import { ResizableBox } from 'react-resizable';
import { useEffect, useMemo, useRef, useState } from 'react';
import './controllablePlayer.scss';
import '@/assets/styles/global.scss';
import '@/assets/styles/resizableBox.css';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';
import { useCtrPlayerModel } from '@/utils/hooks/useCtrPlayerModel';
import type { Size, Stream, Service } from '@/types/ctrPlayer';
import { obtainDeviceService, obtainDeviceStream } from '@/services/device';
import { useUpdateEffect } from 'ahooks';
import CompositePlayer from '@/core/CompositePlayer';
import { releaseControlAccess } from '@/services/controller';

const Draggable = require('react-draggable');

const ControllablePlayer = ({ deviceId }: { deviceId: string }) => {
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

                if (item.streamTypeCode === '1') {
                    item.label = `${item.channelDesc}（主）`;
                }

                if (item.streamTypeCode === '2') {
                    item.label = `${item.channelDesc}（辅）`;
                }

                streams.push(item);
            });

            const mainStream = streams.find(item => item.channelCode === '1' && item.streamTypeCode === '1');

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
        if (size && minSize) {
            setSize({
                ...size,
                width: ctrPlayerModel.doubleGrid ? size.width * 2 : size.width / 2,
            });

            setMinSize({
                ...minSize,
                width: ctrPlayerModel.doubleGrid ? minSize.width * 2 : minSize.width / 2
            });
        }
    }, [ctrPlayerModel.doubleGrid]);

    useUpdateEffect(() => {
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
                        <CompositePlayer/>
                    </div>
                </ResizableBox>
            </Draggable>
        </CtrPlayerContext.Provider>
    );
};

export default ControllablePlayer;
