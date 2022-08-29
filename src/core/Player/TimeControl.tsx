import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import type { FC } from 'react';
import type { TimeControlProps } from '@/core/Player/type';

const cn = 'Time-Control';

const TimeControl: FC<TimeControlProps> = (
    {
        living,
        currentTime,
        totalTime
    }
) => {
    return (
        <div className={classes(cn, '')}>

        </div>
    );
};

export default TimeControl;