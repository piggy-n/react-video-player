import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import type { FC } from 'react';
import type { TransmissionRateViewerProps } from '@/core/Player/type';
import './styles/transmissionRateViewer.scss';

const cn = 'Transmission-Rate-Viewer';

const TransmissionRateViewer: FC<TransmissionRateViewerProps> = ({ rate = 0 }) => {
    return (
        <div className={classes(cn, '')}>
            {
                rate >= 1024 ? `${(rate / 1024).toFixed(2)}Mbps` : `${rate.toFixed(2)}Kbps`
            }
        </div>
    );
};

export default TransmissionRateViewer;