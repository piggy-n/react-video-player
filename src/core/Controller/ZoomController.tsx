import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/zoomController.scss';

const cn = 'Zoom-Controller';

const ZoomController = () => {
    return (
        <div className={classes(cn, '')}>
            <div className={classes(cn, 'btn')}>
                放大
            </div>
            <div className={classes(cn, 'btn')}>
                缩小
            </div>
            <div className={classes(cn, 'btn')}>
                调焦+
            </div>
            <div className={classes(cn, 'btn')}>
                调焦-
            </div>
        </div>
    );
};

export default ZoomController;