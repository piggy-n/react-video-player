import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import type { FC } from 'react';
import Icon from '@/components/Icon';
import type { SettingControlProps } from '@/core/Player/type';
import './styles/settingControl.scss';
import { useState } from 'react';

const cn = 'Setting-Control';

const SettingControl: FC<SettingControlProps> = () => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <div
            className={classes(cn, '')}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            <Icon name={'setting'} size={18}/>
            {
                visible &&
                <div >

                </div>
            }
        </div>
    );
};

export default SettingControl;