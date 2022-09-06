import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import { useContext } from 'react';
import { VideoContext } from '@/utils/hooks/useVideoContext';
import './styles/controlPanel.scss';
import type { ControlPanelInterface } from '@/core/Player/type';
import { toMinutesAndSeconds } from '@/utils/methods/time';
import { useVideo } from '@/utils/hooks/useVideo';

const cn = 'Control-Panel';

const ControlPanel: ControlPanelInterface = () => {
    const {
        videoModel: {
            controlled,
            waiting,
            mime,
            transmissionRate
        },
        videoEle,
        isLive,
        H265Player
    } = useContext(VideoContext);

    const {
        playing,
        ended,
        // inPip,
        totalTime,
        currentTime,
        changePlayStatusHandler,
        videoSize
        // videoMethods
    } = useVideo(
        videoEle as HTMLVideoElement,
        [videoEle]
    );

    const playControlClickHandler = () => {
        if (waiting) return;

        if (isLive) {
            playing ? H265Player.stop() : H265Player.start();
        }

        changePlayStatusHandler && changePlayStatusHandler();
    };

    const reloadControlClickHandler = () => {
        if (waiting) return;

        isLive ? H265Player.reload() : videoEle?.load();
    };

    return (
        <div
            className={classes(cn, '')}
            style={{ opacity: controlled ? 1 : 0 }}
        >
            <div className={classes(cn, 'left-warp')}>
                <ControlPanel.PlayControl
                    playing={playing}
                    isLive={isLive}
                    onClick={playControlClickHandler}
                />
                <ControlPanel.ReloadControl onClick={reloadControlClickHandler}/>
                <ControlPanel.TimeViewer
                    isLive={isLive}
                    currentTime={toMinutesAndSeconds(currentTime)}
                    totalTime={toMinutesAndSeconds(totalTime)}
                />
            </div>
            <div className={classes(cn, 'right-warp')}>
                <ControlPanel.VideoFormatViewer format={mime}/>
                <ControlPanel.QualityControl videoSize={videoSize}/>
                <ControlPanel.TransmissionRateViewer rate={transmissionRate}/>
                <ControlPanel.SettingControl ended={ended}/>
                <ControlPanel.WebFullScreenControl/>
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

export default ControlPanel;