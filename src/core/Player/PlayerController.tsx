import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/playerController.scss';
import { useContext } from 'react';
import { VideoContext } from '@/utils/hooks/useVideoContext';
import type { PlayerControllerInterface, PlayerControllerProps } from '@/core/Player/type';

const cn = 'Player-Controller';

const PlayerController: PlayerControllerInterface = (
    {
        resizing
    }: PlayerControllerProps
) => {
    const { dispatch } = useContext(VideoContext);

    const controlPanelVisibleHandler = (status: 'enter' | 'leave') => {
        dispatch({
            type: 'controlled',
            payload: status === 'enter' && !resizing,
        });
    };

    return (
        <div
            className={classes(cn, '')}
            onMouseEnter={() => controlPanelVisibleHandler('enter')}
            onMouseLeave={() => controlPanelVisibleHandler('leave')}
        >
            <div className={classes(cn, 'bottom-wrapper')}>
                <PlayerController.Panel/>
            </div>
        </div>
    );
};

PlayerController.Panel = require('./ControlPanel').default;

export default PlayerController;