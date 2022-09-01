import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/qualityControl.scss';
import type { FC } from 'react';
import type { QualityControlProps } from '@/core/Player/type';
import { useEffect, useState } from 'react';
import type { QualityType } from '@/utils/config/quality';
import { qualityObj } from '@/utils/config/quality';

const cn = 'Quality-Control';

const QualityControl: FC<QualityControlProps> = ({ videoSize }) => {
    const { videoWidth } = videoSize || { videoWidth: 0 };

    const [quality, setQuality] = useState<QualityType>();

    useEffect(() => {
        if (videoWidth > 0 && videoWidth < 720) {
            setQuality(qualityObj['SD']);
        }

        if (videoWidth >= 720 && videoWidth < 1080) {
            setQuality(qualityObj['HD']);
        }

        if (videoWidth >= 1080 && videoWidth < 1920) {
            setQuality(qualityObj['FHD']);
        }
    }, [videoWidth]);

    return (
        videoWidth > 0
            ? <div className={classes(cn, '')}>{quality?.enName}</div>
            : <></>
    );
};

export default QualityControl;