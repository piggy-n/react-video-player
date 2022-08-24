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
    }
) => {
    const [size, setSize] = useState<DefaultSize>({ width, height });

    return (
        <ResizableBox
            width={size.width}
            height={size.height}
            minConstraints={[482, 312]}
            resizeHandles={['se', 'e', 's']}
            lockAspectRatio={true}
            onResize={(event, { size }) => setSize(size)}
        >
            <div className={classes(cn, 'container')}>
                <video/>
            </div>
        </ResizableBox>
    );
};

export default Player;