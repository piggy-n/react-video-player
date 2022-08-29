import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import type { FC } from 'react';
import Icon from '@/components/Icon';
import type { SettingControlProps } from '@/core/Player/type';
import './styles/settingControl.scss';

const cn = 'Setting-Control';

const SettingControl: FC<SettingControlProps> = () => {
    return (
        <div className={classes(cn, '')}>
            <Icon name={'setting'} size={18}/>
        </div>
    );
};

export default SettingControl;