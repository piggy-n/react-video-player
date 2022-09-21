import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import { useContext } from 'react';
import { VideoContext } from '@/utils/hooks/useVideoContext';
import './styles/controlPanel.scss';
import type { ControlPanelInterface } from '@/core/Player/type';
import { useVideo } from '@/utils/hooks/useVideo';

const cn = 'Control-Panel';

const ControlPanel: ControlPanelInterface = () => {
    const {
        videoModel: {
            controlled,
        },
        videoEle,
    } = useContext(VideoContext);

    const { readyState } = useVideo(
        videoEle as HTMLVideoElement,
        [videoEle]
    );

    return (
        <div
            className={classes(cn, '')}
            style={{ opacity: controlled ? 1 : 0 }}
        >
            <div className={classes(cn, 'left-warp')}>
                <ControlPanel.PlayControl/>
                <ControlPanel.ReloadControl/>
                <ControlPanel.TimeViewer/>
            </div>
            <div className={classes(cn, 'right-warp')}>
                {
                    readyState !== 0 &&
                    <>
                        <ControlPanel.VideoFormatViewer/>
                        <ControlPanel.QualityControl/>
                        <ControlPanel.TransmissionRateViewer/>
                    </>
                }
                <ControlPanel.SettingControl/>
                <ControlPanel.FullScreenControl/>
            </div>
        </div>
    );
};

ControlPanel.PlayControl = require('./PlayControl').default;
ControlPanel.ReloadControl = require('./ReloadControl').default;
ControlPanel.TimeViewer = require('./TimeViewer').default;
ControlPanel.VideoFormatViewer = require('./VideoFormatViewer').default;
ControlPanel.QualityControl = require('./QualityControl').default;
ControlPanel.TransmissionRateViewer = require('./TransmissionRateViewer').default;
ControlPanel.SettingControl = require('./SettingControl').default;
ControlPanel.WebFullScreenControl = require('./WebFullScreenControl').default;
ControlPanel.FullScreenControl = require('./FullScreenControl').default;

export default ControlPanel;
