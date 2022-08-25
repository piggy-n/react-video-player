import * as React from 'react';
import type { FC } from 'react';
import type { EquipmentProps } from '@/core/Header/type';
import { classes } from '@/utils/methods/classes';
import './styles/equipment.scss';
import { useSize } from 'ahooks';

const cn = 'Equipment';

const Equipment: FC<EquipmentProps> = (
    {
        name = '',
        online = true,
        showStatus = true,
    }
) => {
    const playerWidth = useSize(document.querySelector('.react-resizable'))?.width ?? 480;

    return (
        <div
            className={classes(cn, '')}
            style={{ maxWidth: `${playerWidth * .4}px` }}
        >
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