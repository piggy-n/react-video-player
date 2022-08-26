import * as React from 'react';
import { ResizableBox } from 'react-resizable';
import { useState } from 'react';
import { classes } from '@/utils/methods/classes';
import type { DefaultSize, PlayerInterface, PlayerProps } from '@/core/Player/type';
import 'react-resizable/css/styles.css';
import './styles/player.scss';

const cn = 'Player';

const Player: PlayerInterface = (
    {
        width = 480,
        height = 270,
        minWidth = 480,
        minHeight = 270,
        resize = true,
        onMouseOver,
    }: PlayerProps
) => {
    const [size, setSize] = useState<DefaultSize>({ width, height });

    return (
        <ResizableBox
            width={size.width}
            height={size.height}
            minConstraints={[minWidth, minHeight]}
            resizeHandles={resize ? ['se', 'e', 's'] : []}
            lockAspectRatio
            onResize={resize ? (event, { size }) => setSize(size) : undefined}
        >
            <div
                className={classes(cn, '')}
                onMouseOver={() => onMouseOver(true)}
            >
                <video/>
                <Player.Controller/>
            </div>
        </ResizableBox>
    );
};

Player.Controller = require('./PlayerController').default;

export default Player;