import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import type { FC } from 'react';
import Icon from '@/components/Icon';
import type { SettingControlProps } from '@/core/Player/type';
import './styles/settingControl.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { VideoContext } from '@/utils/hooks/useVideoContext';
import { capture } from '@/utils/methods/capture';
import { createPortal } from 'react-dom';

const cn = 'Setting-Control';

const SettingControl: FC<SettingControlProps> = () => {
    const {
        videoModel: {
            controlled
        },
        videoEle,
        videoContainerEle
    } = useContext(VideoContext);

    const screenshotDivRef = useRef<HTMLDivElement>(null);

    const [visible, setVisible] = useState<boolean>(false);
    const [isScreenshot, setIsScreenshot] = useState<boolean>(false);

    const screenshotHandler = () => {
        setVisible(false);
        setIsScreenshot(true);

        const screenshotDiv = screenshotDivRef.current;
        const canvas = capture(videoEle as HTMLVideoElement, 0.45);

        if (screenshotDiv) {
            screenshotDiv.innerHTML = '';
            screenshotDiv.appendChild(canvas);
        }
    };

    useEffect(() => {
        if (visible && !controlled) {
            setVisible(false);
        }
    }, [controlled]);

    return (
        <div className={classes(cn, '')}>
            <Icon
                name={'setting'}
                size={18}
                onClick={() => setVisible(!visible)}
            />
            {
                visible &&
                <div className={classes(cn, 'wrapper')}>
                    <div
                        className={classes(cn, 'item')}
                        onClick={screenshotHandler}
                    >
                        <Icon name={'screenshot-start'}/>
                        <p>截图</p>
                    </div>

                    <div className={classes(cn, 'item')}>
                        <Icon name={'recording-start'}/>
                        <p>录像</p>
                    </div>
                </div>
            }

            {
                isScreenshot &&
                createPortal(
                    <div className={'ws-screenshot-container'}>
                        <div ref={screenshotDivRef} className={'ws-screenshot'}/>
                    </div>,
                    videoContainerEle as HTMLDivElement
                )
            }
        </div>
    );
};

export default SettingControl;