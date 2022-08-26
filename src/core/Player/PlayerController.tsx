import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/playerController.scss';
import { useContext } from 'react';
import { VideoContext } from '@/utils/hooks/useVideoContext';

const cn = 'Player-Controller';

const PlayerController = () => {
    const { videoModel, dispatch } = useContext(VideoContext);

    const controlPanelVisibleHandler = (status: 'enter' | 'leave') => {
        dispatch({
            type: 'controlled',
            payload: status === 'enter',
        });
    };

    return (
        <div
            className={classes(cn, '')}
            onMouseEnter={() => controlPanelVisibleHandler('enter')}
            onMouseLeave={() => controlPanelVisibleHandler('leave')}
        >

        </div>
    );
};

export default PlayerController;