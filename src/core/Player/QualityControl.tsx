import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/qualityControl.scss';
import type { FC } from 'react';
import type { QualityControlProps } from '@/core/Player/type';

const cn = 'Quality-Control';

const QualityControl: FC<QualityControlProps> = ({ quality }) => {
    return (
        <div className={classes(cn, '')}>
            {quality}
        </div>
    );
};

export default QualityControl;