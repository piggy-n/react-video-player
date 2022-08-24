import * as React from 'react';
import { ResizableBox } from 'react-resizable';
import { FC, useState } from 'react';
import { DefaultSize, PlayerProps } from '@/core/Player/type';
import { classes } from '@/utils/methods/classes';
import 'react-resizable/css/styles.css';
import './styles/index.scss';

const cn = 'Player';

const Player: FC<PlayerProps> = (
    {
        width = 482,
        height = 312,
        minWidth = 482,
        minHeight = 312,
        resize = true,
    }
) => {
    const [size, setSize] = useState<DefaultSize>({ width, height });

    return (
        <ResizableBox
            width={size.width}
            height={size.height}
            minConstraints={[minWidth, minHeight]}
            resizeHandles={resize ? ['se', 'e', 's'] : []}
            // lockAspectRatio
            onResize={resize ? (event, { size }) => setSize(size) : undefined}
        >
            <div className={classes(cn, 'container')}>
                <video/>
            </div>
        </ResizableBox>
    );
};

export default Player;