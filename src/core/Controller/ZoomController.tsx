import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/zoomController.scss';
import { pushControlCommands } from '@/services/controller';
import { useContext } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';

const cn = 'Zoom-Controller';

const ZoomController = () => {
    const {
        ctrPlayerModel: {
            speed
        },
        deviceId,
    } = useContext(CtrPlayerContext);

    const move = async (operation: string) => {
        await pushControlCommands({
            id: deviceId,
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
                onMouseDown={async () => move('zoom_in')}
                onMouseUp={async () => move('stop')}
            >
                放大
            </div>
            <div
                className={classes(cn, 'btn')}
                onMouseDown={async () => move('zoom_out')}
                onMouseUp={async () => move('stop')}
            >
                缩小
            </div>
            <div
                className={classes(cn, 'btn')}
                onMouseDown={async () => move('focus_near')}
                onMouseUp={async () => move('stop')}
            >
                调焦+
            </div>
            <div
                className={classes(cn, 'btn')}
                onMouseDown={async () => move('focus_far')}
                onMouseUp={async () => move('stop')}
            >
                调焦-
            </div>
        </div>
    );
};

export default ZoomController;
