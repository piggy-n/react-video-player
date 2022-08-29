import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import Icon from '@/components/Icon';
import type { FC } from 'react';
import type { ReloadControlProps } from '@/core/Player/type';
import './styles/reloadControl.scss';

const cn = 'Reload-Control';

const ReloadControl: FC<ReloadControlProps> = (
    {
        onClick = () => {
            return;
        }
    }
) => {
    return (
        <div
            className={classes(cn, '')}
            onClick={onClick}
        >
            <Icon
                name={'reload'}
                size={18}
                title={'重新加载'}
                className={classes(cn, 'icon')}
            />
        </div>
    );
};

export default ReloadControl;