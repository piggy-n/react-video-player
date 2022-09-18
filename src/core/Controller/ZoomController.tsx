import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/zoomController.scss';
import { pushControlCommands } from '@/services/controller';
import { useContext } from 'react';
import { ControllerContext } from '@/utils/hooks/useControllerContext';

const cn = 'Zoom-Controller';

const ZoomController = () => {
    const {
        controllerModel: {
            speed
        },
    } = useContext(ControllerContext);

    const move = (operation: string) => {
        pushControlCommands({
            id: '1561636627632099330',
            operation,
            speed,
        }).then(res => {
            if (!res?.success) return;
            console.log(res);
        });
    };

    return (
        <div className={classes(cn, '')}>
            <div
                className={classes(cn, 'btn')}
                onMouseDown={() => move('zoom_in')}
                onMouseUp={() => move('stop')}
            >
                放大
            </div>
            <div
                className={classes(cn, 'btn')}
                onMouseDown={() => move('zoom_out')}
                onMouseUp={() => move('stop')}
            >
                缩小
            </div>
            <div
                className={classes(cn, 'btn')}
                onMouseDown={() => move('focus_near')}
                onMouseUp={() => move('stop')}
            >
                调焦+
            </div>
            <div
                className={classes(cn, 'btn')}
                onMouseDown={() => move('focus_far')}
                onMouseUp={() => move('stop')}
            >
                调焦-
            </div>
        </div>
    );
};

export default ZoomController;
