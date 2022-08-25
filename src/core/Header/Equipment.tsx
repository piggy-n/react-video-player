import * as React from 'react';
import type { FC } from 'react';
import type { EquipmentProps } from '@/core/Header/type';
import { classes } from '@/utils/methods/classes';

const cn = 'Equipment';

const Equipment: FC<EquipmentProps> = (
    {
        name,
        online,
        showStatus
    }
) => {
    return (
        <div className={classes(cn, 'container')}>
            {name}
        </div>
    );
};

export default Equipment;