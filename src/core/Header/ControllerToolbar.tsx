import * as React from 'react';
import type { FC, MouseEventHandler } from 'react';
import type { ControllerToolbarProps } from '@/core/Header/type';
import { classes } from '@/utils/methods/classes';
import './styles/controllerToolbar.scss';
import Icon from '@/components/Icon';
import Selector from '@/components/Selector';
import { useContext, useEffect, useRef, useState } from 'react';
import { ControllerContext } from '@/utils/hooks/useControllerContext';
import { obtainControlAccess } from '@/services/controller';
import { capture } from '@/utils/methods/capture';
import ziv3 from '@/utils/methods/zxImageViewer';
import { createPortal } from 'react-dom';
import screenfull from 'screenfull';

const cn = 'Controller-Toolbar';

const ControllerToolbar: FC<ControllerToolbarProps> = () => {
    const {
        dispatch,
        id,
        deviceStreamList,
        playerContainerEle,
        controllerModel: {
            urlList
        }
    } = useContext(ControllerContext);

    const screenshotDivRef = useRef<HTMLDivElement>(null);
    const screenshotCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const [isScreenshot, setIsScreenshot] = useState<boolean>(false);
    const [imageBase64, setImageBase64] = useState<string>('');
    const [gridStatus, setGridStatus] = useState<Record<string, boolean>>({
        singleGrid: true,
        doubleGrid: false,
        pip: false
    });
    const [panelStatus, setPanelStatus] = useState<Record<string, boolean>>({
        isController: false,
        isVideoList: false,
    });

    const gridStatusHandler = (key: string) => {
        if (gridStatus[key]) return;

        const newGridStatus = {
            singleGrid: false,
            doubleGrid: false,
            pip: false,
            [key]: !gridStatus[key],
        };

        setGridStatus(newGridStatus);
    };

    const panelStatusHandler = (key: string) => {
        if (key === 'isController') {
            if (!panelStatus[key]) {
                obtainControlAccess({
                    id,
                    lock: false,
                    time: 10
                }).then(res => {
                    if (!res?.success) return;
                    console.log(res);
                });
            }
        }

        const newPanelStatus = {
            isController: false,
            isVideoList: false,
            [key]: !panelStatus[key],
        };

        dispatch({
            type: 'controllerVisible',
            payload: !panelStatus[key]
        });

        dispatch({
            type: 'isController',
            payload: newPanelStatus['isController']
        });

        dispatch({
            type: 'isVideoList',
            payload: newPanelStatus['isVideoList']
        });

        setPanelStatus(newPanelStatus);
    };

    const selectorChangeHandler = (arg: string[]) => {
        if (arg.length === 0) return;

        dispatch({
            type: 'urlList',
            payload: arg
        });

        if (arg.length === 1) {
            gridStatusHandler('singleGrid');

            dispatch({
                type: 'isPip',
                payload: false
            });

            dispatch({
                type: 'isDoubleGrid',
                payload: false
            });
        }

        if (arg.length === 2) {
            gridStatusHandler('doubleGrid');

            dispatch({
                type: 'isDoubleGrid',
                payload: true
            });
        }
    };

    const screenshotHandler = () => {
        setIsScreenshot(true);

        screenshotCanvasRef.current = capture(playerContainerEle as any);
    };

    const imageClickHandler: MouseEventHandler = (e) => {
        e.stopPropagation();
        const imageArr: string[] = [];

        imageArr.push(imageBase64);

        ziv3.update(imageArr);
        ziv3.view(0);
    };

    const clickHandler = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle(playerContainerEle as HTMLDivElement);
            screenfull.on('change', () => {
                setIsFullscreen(screenfull.isFullscreen);
            });
        }
    };

    useEffect(() => {
        const screenshotDiv = screenshotDivRef.current;
        const canvas = screenshotCanvasRef.current;

        if (screenshotDiv && canvas) {
            screenshotDiv.innerHTML = '';
            screenshotDiv.appendChild(canvas);
        }

        if (canvas) {
            setImageBase64(canvas.toDataURL('image/png', 1));
        }
    }, [screenshotDivRef.current, screenshotCanvasRef.current]);

    useEffect(() => {
        if (gridStatus.doubleGrid || gridStatus.pip) {
            const newUrlList = Array.from(new Set([...urlList, ...deviceStreamList.map(item => item.url)]));
            dispatch({
                type: 'urlList',
                payload: newUrlList
            });
        } else {
            dispatch({
                type: 'urlList',
                payload: [urlList[0]]
            });
        }

        dispatch({
            type: 'isDoubleGrid',
            payload: gridStatus.doubleGrid
        });

        dispatch({
            type: 'isPip',
            payload: gridStatus.pip
        });
    }, [gridStatus.doubleGrid, gridStatus.pip]);

    return (
        <div className={classes(cn, '')}>
            {
                deviceStreamList.length > 1 &&
                <Selector
                    value={urlList}
                    onChange={selectorChangeHandler}
                    options={deviceStreamList}
                />
            }
            <Icon
                name={gridStatus['singleGrid'] ? 'single-grid-active' : 'single-grid'}
                title={'单宫'}
                onClick={() => gridStatusHandler('singleGrid')}
            />
            <Icon
                name={gridStatus['doubleGrid'] ? 'double-grid-active' : 'double-grid'}
                title={'双宫'}
                onClick={() => gridStatusHandler('doubleGrid')}
            />
            <Icon
                name={gridStatus['pip'] ? 'pip-active' : 'pip'}
                title={'画中画'}
                onClick={() => gridStatusHandler('pip')}
            />
            <Icon
                name={panelStatus['screenshot'] ? 'screenshot-active' : 'screenshot'}
                title={'截图'}
                onClick={screenshotHandler}
            />
            <Icon
                name={panelStatus['isController'] ? 'control-active' : 'control'}
                title={'控制面板'}
                onClick={() => panelStatusHandler('isController')}
            />
            <Icon
                name={panelStatus['isVideoList'] ? 'recording-active' : 'recording'}
                title={'查看录像'}
                onClick={() => panelStatusHandler('isVideoList')}
            />
            <Icon
                name={isFullscreen ? 'close-web-fullscreen' : 'fullscreen'}
                title={'全屏'}
                onClick={clickHandler}
            />
            <Icon
                name={'close'}
                title={'关闭'}
            />

            {
                isScreenshot &&
                createPortal(
                    <div className={'ws-screenshot-container'}>
                        <div className={'ws-screenshot-close'}>
                            <Icon
                                name={'screenshot-close'}
                                size={12}
                                onClick={() => setIsScreenshot(false)}
                            />
                        </div>
                        <div
                            ref={screenshotDivRef}
                            className={'ws-screenshot'}
                            onClick={imageClickHandler}
                        />
                    </div>,
                    playerContainerEle as HTMLDivElement
                )
            }
        </div>
    );
};

export default ControllerToolbar;
