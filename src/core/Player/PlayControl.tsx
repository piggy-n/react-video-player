import * as React from 'react';
import './styles/playControl.scss';
import { classes } from '@/utils/methods/classes';
import Icon from '@/components/Icon';
import type { FC } from 'react';
import type { PlayControlProps } from '@/core/Player/type';

const cn = 'Play-Control';

const PlayControl: FC<PlayControlProps> = (
    {
        playing = false,
        living = false,
        onClick = () => {
            return;
        },
    }
) => {
    return (
        <div
            className={classes(cn, '')}
            onClick={onClick}
        >
            {
                playing
                    ? <>
                        {
                            living
                                ? <Icon name={'stop'} size={18}/>
                                : <Icon name={'pause'} size={18}/>
                        }
                    </>
                    : <Icon name={'play'} size={18}/>
            }
        </div>
    );
};

export default PlayControl;