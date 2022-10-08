import Icon from '@/components/Icon';
import * as React from 'react';
import type { MouseEventHandler } from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';
import { capture } from '@/utils/methods/capture';
import { createPortal } from 'react-dom';
import ziv3 from '@/utils/methods/zxImageViewer';
import './styles/screenshot.scss';

const Draggable = require('react-draggable');

const Screenshot = () => {
    const {
        ctrPlayerModel: {
            mode
        },
        setCtrPlayerModelData
    } = useContext(CtrPlayerContext);
    const plyOEle = document.getElementById('ws-plyO');
    const plyTEle = document.getElementById('ws-plyT');
    const plyWrapperEle = document.getElementById('ws-player-wrapper');

    const plyOScreenshotDivRef = useRef<HTMLDivElement>(null);
    const plyTScreenshotDivRef = useRef<HTMLDivElement>(null);

    const plyOScreenshotCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const plyTScreenshotCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const [plyOScreenshot, setPlyOScreenshot] = useState<boolean>(false);
    const [plyTScreenshot, setPlyTScreenshot] = useState<boolean>(false);

    const [plyOScreenshotImg, setPlyOScreenshotImg] = useState<string>('');
    const [plyTScreenshotImg, setPlyTScreenshotImg] = useState<string>('');

    const [disabled, setDisabled] = useState<boolean>(false);

    const screenshotHandler = () => {
        if (mode === 'single') {
            if (plyOEle) {
                setPlyOScreenshot(true);
                plyOScreenshotCanvasRef.current = capture(plyOEle as HTMLVideoElement);
            }
        }

        if (mode === 'double' || mode === 'pip') {
            if (plyOEle) {
                setPlyOScreenshot(true);
                plyOScreenshotCanvasRef.current = capture(plyOEle as HTMLVideoElement);
            }
            if (plyTEle) {
                setPlyTScreenshot(true);
                plyTScreenshotCanvasRef.current = capture(plyTEle as HTMLVideoElement);
            }
        }
    };

    const plyOImageClickHandler: MouseEventHandler = (e) => {
        e.stopPropagation();
        const imageArr: string[] = [];

        imageArr.push(plyOScreenshotImg);

        ziv3.update(imageArr);
        ziv3.view(0);
    };

    const plyTImageClickHandler: MouseEventHandler = (e) => {
        e.stopPropagation();
        const imageArr: string[] = [];

        imageArr.push(plyTScreenshotImg);

        ziv3.update(imageArr);
        ziv3.view(0);
    };

    const mouseOverHandler = () => {
        if (setCtrPlayerModelData) {
            setCtrPlayerModelData({
                type: 'disableDrag',
                payload: true
            });
        }
    };

    useEffect(() => {
        const screenshotDiv = plyOScreenshotDivRef.current;
        const canvas = plyOScreenshotCanvasRef.current;

        if (screenshotDiv && canvas) {
            screenshotDiv.innerHTML = '';
            screenshotDiv.appendChild(canvas);
        }

        if (canvas) {
            setPlyOScreenshotImg(canvas.toDataURL('image/png', 1));
        }
    }, [plyOScreenshotDivRef.current, plyOScreenshotCanvasRef.current]);

    useEffect(() => {
        const screenshotDiv = plyTScreenshotDivRef.current;
        const canvas = plyTScreenshotCanvasRef.current;

        if (screenshotDiv && canvas) {
            screenshotDiv.innerHTML = '';
            screenshotDiv.appendChild(canvas);
        }

        if (canvas) {
            setPlyTScreenshotImg(canvas.toDataURL('image/png', 1));
        }
    }, [plyTScreenshotDivRef.current, plyTScreenshotCanvasRef.current]);

    useEffect(() => {
        setPlyOScreenshot(false);
        setPlyTScreenshot(false);
    }, [mode]);

    return (
        <>
            <Icon
                name={'screenshot'}
                title={'截图'}
                onClick={screenshotHandler}
            />

            {
                plyOScreenshot && plyOEle &&
                createPortal(
                    <Draggable bounds={'parent'} disabled={disabled}>
                        <main
                            className={'ws-sc-container'}
                            onMouseOver={mouseOverHandler}
                        >
                            <section className={'ws-sc-close'}>
                                <Icon
                                    name={'screenshot-close'}
                                    onClick={() => setPlyOScreenshot(false)}
                                />
                            </section>
                            <section
                                ref={plyOScreenshotDivRef}
                                className={'ws-sc'}
                                onClick={plyOImageClickHandler}
                                onMouseEnter={() => setDisabled(true)}
                                onMouseLeave={() => setDisabled(false)}
                            />
                        </main>
                    </Draggable>,
                    mode === 'pip'
                        ? plyWrapperEle as HTMLElement
                        : plyOEle?.parentElement as HTMLElement
                )
            }
            {
                plyTScreenshot && plyTEle &&
                createPortal(
                    <Draggable bounds={'parent'} disabled={disabled}>
                        <main
                            className={'ws-sc-container'}
                            onMouseOver={mouseOverHandler}
                            style={{
                                top: mode === 'pip' ? '110px' : 0,
                            }}
                        >
                            <section className={'ws-sc-close'}>
                                <Icon
                                    name={'screenshot-close'}
                                    onClick={() => setPlyTScreenshot(false)}
                                />
                            </section>
                            <section
                                ref={plyTScreenshotDivRef}
                                className={'ws-sc'}
                                onClick={plyTImageClickHandler}
                                onMouseEnter={() => setDisabled(true)}
                                onMouseLeave={() => setDisabled(false)}
                            />
                        </main>
                    </Draggable>,
                    mode === 'pip'
                        ? plyWrapperEle as HTMLElement
                        : plyTEle?.parentElement as HTMLElement
                )
            }
        </>
    );
};

export default Screenshot;
