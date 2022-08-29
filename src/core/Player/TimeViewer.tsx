import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import type { FC } from 'react';
import './styles/timeViewer.scss';
import type { TimeViewerProps } from '@/core/Player/type';

const cn = 'Time-Viewer';

const TimeViewer: FC<TimeViewerProps> = (
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

export default TimeViewer;