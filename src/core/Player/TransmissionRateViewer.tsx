import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import type { FC } from 'react';
import type { TransmissionRateViewerProps } from '@/core/Player/type';
import './styles/transmissionRateViewer.scss';

const cn = 'Transmission-Rate-Viewer';

const TransmissionRateViewer: FC<TransmissionRateViewerProps> = ({ rate }) => {
    return (
        <div className={classes(cn, '')}>
            {rate && `${rate.toFixed(2)}Mbps`}
        </div>
    );
};

export default TransmissionRateViewer;