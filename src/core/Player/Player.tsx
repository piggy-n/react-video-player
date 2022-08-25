import * as React from 'react';
import { ResizableBox } from 'react-resizable';
import { useState } from 'react';
import { classes } from '@/utils/methods/classes';
import type { FC } from 'react';
import type { DefaultSize, PlayerProps } from '@/core/Player/type';
import 'react-resizable/css/styles.css';
import './styles/index.scss';

const cn = 'Player';

const Player: FC<PlayerProps> = (
    {
        width = 480,
        height = 270,
        minWidth = 480,
        minHeight = 270,
        resize = true,
        onMouseOver,
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
            <div
                className={classes(cn, 'container')}
                onMouseOver={() => onMouseOver(true)}
            >
                <video/>
            </div>
        </ResizableBox>
    );
};

export default Player;