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
        <div className={classes(cn, '')}>
            <Icon
                name={'setting'}
                size={18}
                onClick={() => setVisible(!visible)}
            />
            {
                visible &&
                <div
                    className={classes(cn, 'wrapper')}
                    onMouseLeave={() => setVisible(false)}
                >
                    <div className={classes(cn, 'item')}>
                        <Icon name={'screenshot-start'}/>
                        <p>截图</p>
                    </div>

                    <div className={classes(cn, 'item')}>
                        <Icon name={'recording-start'}/>
                        <p>录像</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default SettingControl;