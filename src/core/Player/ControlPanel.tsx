import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import { useContext } from 'react';
import { VideoContext } from '@/utils/hooks/useVideoContext';
import './styles/controlPanel.scss';
import type { ControlPanelInterface } from '@/core/Player/type';
import { toMinutesAndSeconds } from '@/utils/methods/time';

const cn = 'Control-Panel';

const ControlPanel: ControlPanelInterface = () => {
    const {
        videoModel: {
            controlled
        }
    } = useContext(VideoContext);

    const playStatusHandler = () => {
        // todo
        console.log('playStatusHandler');
    };

    const reloadHandler = () => {
        // todo
        console.log('reloadHandler');
    };

    return (
        <div
            className={classes(cn, '')}
            style={{ opacity: controlled ? 1 : 1 }}
        >
            <div className={classes(cn, 'left-warp')}>
                <ControlPanel.PlayControl
                    playing={true}
                    living={false}
                    onClick={playStatusHandler}
                />
                <ControlPanel.ReloadControl onClick={reloadHandler}/>
                <ControlPanel.TimeViewer
                    living={false}
                    currentTime={toMinutesAndSeconds(123)}
                    totalTime={toMinutesAndSeconds(232)}
                />
            </div>
            <div className={classes(cn, 'right-warp')}>
                <ControlPanel.VideoFormatViewer format={'H.265'}/>
                <ControlPanel.QualityControl quality={'UHD'}/>
                <ControlPanel.TransmissionRateViewer rate={'1.28Mbps'}/>
                <ControlPanel.SettingControl/>
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