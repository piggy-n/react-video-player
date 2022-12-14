import type { MouseEventHandler } from 'react';
import * as React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { classes } from '@/utils/methods/classes';
import Icon from '@/components/Icon';
import './styles/settingControl.scss';
import ziv3 from '@/utils/methods/zxImageViewer';
import { VideoContext } from '@/utils/hooks/useVideoContext';
import { capture } from '@/utils/methods/capture';
import { createPortal } from 'react-dom';
import { download } from '@/utils/methods/dowload';
import { useVideo } from '@/utils/hooks/useVideo';

const cn = 'Setting-Control';
const Draggable = require('react-draggable');

const SettingControl = () => {
    const {
        videoModel: {
            controlled,
            waiting,
            downloading,
            error
        },
        videoEle,
        videoContainerEle,
        isLive,
        screenshot = true,
        recording
    } = useContext(VideoContext);

    const { ended } = useVideo(videoEle as HTMLVideoElement, [videoEle]);

    const screenshotDivRef = useRef<HTMLDivElement>(null);
    const screenshotCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const recordingCtxRef = useRef<CanvasRenderingContext2D | null>(null);
    const recorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const frameIdRef = useRef<number>(0);

    const [visible, setVisible] = useState<boolean>(false);
    const [isScreenshot, setIsScreenshot] = useState<boolean>(false);
    const [imageBase64, setImageBase64] = useState<string>('');
    const [recorded, setRecorded] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);

    const screenshotHandler = () => {
        if (waiting || downloading || error) return;

        setIsScreenshot(true);
        screenshotCanvasRef.current = capture(videoEle as HTMLVideoElement);
    };

    const imageClickHandler: MouseEventHandler = (e) => {
        e.stopPropagation();
        const imageArr: string[] = [];

        imageArr.push(imageBase64);

        ziv3.update(imageArr);
        ziv3.view(0);
    };

    const drawFrame = () => {
        recordingCtxRef.current!.drawImage(
            videoEle!,
            0,
            0,
            videoEle!.videoWidth,
            videoEle!.videoHeight
        );

        frameIdRef.current = requestAnimationFrame(drawFrame);
    };

    const recordingHandler = () => {
        if (!recorded) {
            recorderRef.current?.start(0);
            drawFrame();
        } else {
            recorderRef.current?.stop();
            cancelAnimationFrame(frameIdRef.current);
            download(chunksRef.current);

            chunksRef.current = [];
            recordingCtxRef.current!.clearRect(
                0,
                0,
                videoEle!.videoWidth,
                videoEle!.videoHeight
            );
        }

        setVisible(false);
        setRecorded(!recorded);
    };

    useEffect(() => {
        if (videoEle) {
            const canvas = document.createElement('canvas') as HTMLCanvasElement;

            const w = videoEle.videoWidth;
            const h = videoEle.videoHeight;

            canvas.width = w;
            canvas.height = h;

            const ctx = canvas.getContext('2d');
            ctx!.fillStyle = '#000';
            ctx!.fillRect(0, 0, w, h);

            const stream = canvas.captureStream(30);
            const recorder = new MediaRecorder(stream, {
                mimeType: 'video/webm;codecs=vp8',
            });

            recorder.ondataavailable = (e) => {
                chunksRef.current.push(e.data);
            };

            recordingCtxRef.current = ctx;
            recorderRef.current = recorder;
        }
    }, [videoEle]);

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
        if (visible && !controlled && !isScreenshot) {
            setVisible(false);
        }
    }, [controlled, isScreenshot, visible]);

    useEffect(() => {
        if (ended && recorded && !isLive) {
            recorderRef.current?.stop();
            cancelAnimationFrame(frameIdRef.current);
            download(chunksRef.current);

            chunksRef.current = [];
            recordingCtxRef.current!.clearRect(
                0,
                0,
                videoEle!.videoWidth,
                videoEle!.videoHeight
            );

            setRecorded(false);
        }
    }, [ended, isLive, recorded]);

    return (
        <div className={classes(cn, '')}>
            {
                screenshot && !recording &&
                <Icon
                    name={'screenshot'}
                    size={18}
                    title={'??????'}
                    onClick={screenshotHandler}
                />
            }

            {
                recording && !screenshot &&
                <Icon
                    name={recorded ? 'stop' : 'recording-start'}
                    size={18}
                    title={recorded ? '????????????' : '??????'}
                    onClick={recordingHandler}
                />
            }

            {
                screenshot && recording &&
                <Icon
                    name={'setting'}
                    size={18}
                    onClick={() => setVisible(!visible)}
                />
            }
            {
                visible &&
                <div className={classes(cn, 'wrapper')}>
                    <div
                        className={classes(cn, 'item')}
                        onClick={screenshotHandler}
                    >
                        <Icon name={'screenshot-start'}/>
                        <p>??????</p>
                    </div>

                    <div
                        className={classes(cn, 'item')}
                        onClick={recordingHandler}
                    >
                        {
                            recorded
                                ? <Icon name={'stop'}/>
                                : <Icon name={'recording-start'}/>
                        }
                        <p>
                            {
                                recorded ? '????????????' : '??????'
                            }
                        </p>
                    </div>
                </div>
            }

            {
                isScreenshot &&
                createPortal(
                    <Draggable bounds={'parent'} disabled={disabled}>
                        <div className={'ws-screenshot-container'}>
                            <div className={'ws-screenshot-close'}>
                                <Icon
                                    name={'screenshot-close'}
                                    onClick={() => setIsScreenshot(false)}
                                />
                            </div>
                            <div
                                ref={screenshotDivRef}
                                className={'ws-screenshot'}
                                onClick={imageClickHandler}
                                onMouseEnter={() => setDisabled(true)}
                                onMouseLeave={() => setDisabled(false)}
                            />
                        </div>
                    </Draggable>,
                    videoContainerEle as HTMLDivElement
                )
            }

            {/*{*/}
            {/*    recorded &&*/}
            {/*    createPortal(*/}
            {/*        <div className={'ws-recording-container'}>*/}
            {/*            <div className={'ws-recording-point'}/>*/}
            {/*            <p>?????????</p>*/}
            {/*        </div>,*/}
            {/*        videoContainerEle as HTMLDivElement*/}
            {/*    )*/}
            {/*}*/}
        </div>
    );
};

export default SettingControl;
