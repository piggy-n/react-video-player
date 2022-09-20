import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/transmissionRateViewer.scss';
import { useContext } from 'react';
import { VideoContext } from '@/utils/hooks/useVideoContext';

const cn = 'Transmission-Rate-Viewer';

const TransmissionRateViewer = () => {
    const {
        videoModel: {
            transmissionRate = 0
        },
        isLive
    } = useContext(VideoContext);

    return (
        <>
            {
                isLive
                    ? <div className={classes(cn, '')}>
                        {
                            transmissionRate >= 1024
                                ? `${(transmissionRate / 1024).toFixed(2)}Mbps`
                                : `${transmissionRate.toFixed(2)}Kbps`
                        }
                    </div>
                    : null
            }
        </>

    );
};

export default TransmissionRateViewer;
