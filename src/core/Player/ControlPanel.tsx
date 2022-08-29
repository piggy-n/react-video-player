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
            <ControlPanel.PlayControl
                playing={true}
                living={false}
                onClick={playStatusHandler}
            />
            <ControlPanel.ReloadControl onClick={reloadHandler}/>
            <ControlPanel.TimeControl
                living={false}
                currentTime={toMinutesAndSeconds(123)}
                totalTime={toMinutesAndSeconds(232)}
            />
        </div>
    );
};

ControlPanel.PlayControl = require('./PlayControl').default;
ControlPanel.ReloadControl = require('./ReloadControl').default;
ControlPanel.TimeControl = require('./TimeControl').default;

export default ControlPanel;