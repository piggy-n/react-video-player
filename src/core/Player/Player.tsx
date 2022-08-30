import * as React from 'react';
import { ResizableBox } from 'react-resizable';
import {useMemo, useRef, useState} from 'react';
import { classes } from '@/utils/methods/classes';
import type { DefaultSize, PlayerInterface, PlayerProps } from '@/core/Player/type';
import '@/assets/styles/resizableBox.css';
import './styles/player.scss';
import { useVideoModel } from '@/utils/hooks/useVideoModel';
import { VideoContext } from '@/utils/hooks/useVideoContext';

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
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { videoModel, dispatch } = useVideoModel();

    const videoContextValue = useMemo(() => {
        return Object.assign(
            {},
            {
                videoModel,
                dispatch,
            }
        );
    }, [videoModel, dispatch]);

    const [size, setSize] = useState<DefaultSize>({ width, height });
    const [resizing, setResizing] = useState(false);

    return (
        <ResizableBox
            width={size.width}
            height={size.height}
            minConstraints={[minWidth, minHeight]}
            resizeHandles={resize ? ['se', 'e', 's'] : []}
            lockAspectRatio
            onResizeStart={() => setResizing(true)}
            onResizeStop={() => setResizing(false)}
            onResize={resize ? (event, { size }) => setSize(size) : undefined}
        >
            <div
                ref={videoContainerRef}
                className={classes(cn, '')}
                onMouseOver={() => onMouseOver(true)}
            >
                <video
                    ref={videoRef}
                />
                <VideoContext.Provider value={videoContextValue}>
                    <Player.Controller resizing={resizing}/>
                </VideoContext.Provider>
            </div>
        </ResizableBox>
    );
};

Player.Controller = require('./PlayerController').default;

export default Player;