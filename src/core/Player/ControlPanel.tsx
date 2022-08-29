import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import { useContext } from 'react';
import { VideoContext } from '@/utils/hooks/useVideoContext';
import './styles/controlPanel.scss';
import type { ControlPanelInterface } from '@/core/Player/type';

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
        </div>
    );
};

ControlPanel.PlayControl = require('./PlayControl').default;

export default ControlPanel;