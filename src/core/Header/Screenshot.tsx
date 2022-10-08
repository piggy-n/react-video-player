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
    };

    const plyOImageClickHandler: MouseEventHandler = (e) => {
        e.stopPropagation();
        const imageArr: string[] = [];

        imageArr.push(plyOScreenshotImg);

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

    return (
        <>
            <Icon
                name={'screenshot'}
                title={'截图'}
                onClick={screenshotHandler}
            />

            {
                plyOScreenshot &&
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
                    plyOEle?.parentElement as HTMLElement
                )
            }
        </>
    );
};

export default Screenshot;
