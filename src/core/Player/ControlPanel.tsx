import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import { useContext } from 'react';
import { VideoContext } from '@/utils/hooks/useVideoContext';
import './styles/controlPanel.scss';

const cn = 'Control-Panel';

const ControlPanel = () => {
    const {
        videoModel: {
            controlled
        }
    } = useContext(VideoContext);

    return (
        <div
            className={classes(cn, '')}
            style={{ opacity: controlled ? 1 : 0 }}
        >

        </div>
    );
};

export default ControlPanel;