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
        if (videoWidth > 0 && videoWidth < 1280) {
            setQuality(qualityObj['SD']);
        }

        if (videoWidth >= 1280 && videoWidth < 1920) {
            setQuality(qualityObj['HD']);
        }

        if (videoWidth >= 1920 && videoWidth < 2560) {
            setQuality(qualityObj['FHD']);
        }

        if (videoWidth >= 2560 && videoWidth < 3840) {
            setQuality(qualityObj['QHD']);
        }

        if (videoWidth >= 3840) {
            setQuality(qualityObj['UHD']);
        }
    }, [videoWidth]);

    return (
        videoWidth > 0
            ? <div className={classes(cn, '')}>{quality?.enName}</div>
            : <></>
    );
};

export default QualityControl;