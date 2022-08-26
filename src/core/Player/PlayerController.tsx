import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/playerController.scss';
import { useContext } from 'react';
import { VideoContext } from '@/utils/hooks/useVideoContext';

const cn = 'Player-Controller';

const PlayerController = () => {
    const { videoModel, dispatch } = useContext(VideoContext);

    return (
        <div
            className={classes(cn, '')}
        >

        </div>
    );
};

export default PlayerController;