import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import type { FC } from 'react';
import type { TimeControlProps } from '@/core/Player/type';
import './styles/timeControl.scss';

const cn = 'Time-Control';

const TimeControl: FC<TimeControlProps> = (
    {
        living = false,
        currentTime = '--',
        totalTime = '--'
    }
) => {
    return (
        <div className={classes(cn, '')}>
            {
                living
                    ? <div>实时</div>
                    : <div className={classes(cn, 'time')}>
                        {currentTime}&nbsp;/&nbsp;{totalTime}
                    </div>
            }
        </div>
    );
};

export default TimeControl;