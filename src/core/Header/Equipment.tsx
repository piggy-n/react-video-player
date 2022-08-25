import * as React from 'react';
import type { FC } from 'react';
import type { EquipmentProps } from '@/core/Header/type';
import { classes } from '@/utils/methods/classes';
import './styles/equipment.scss';

const cn = 'Equipment';

const Equipment: FC<EquipmentProps> = (
    {
        name = '',
        online = true,
        showStatus = true,
    }
) => {
    return (
        <div className={classes(cn, '')}>
            {
                showStatus &&
                <div className={classes(cn, 'status', { online })}/>
            }
            <div
                className={classes(cn, 'name')}
                title={name}
            >
                {name}
            </div>
        </div>
    );
};

export default Equipment;