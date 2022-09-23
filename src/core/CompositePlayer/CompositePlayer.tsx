import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/compositePlayer.scss';
import { useContext, useEffect, useState } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';
import Controller from '@/core/Controller';
import Player from '@/core/Player';
import type { Mode, Position } from '@/types/ctrPlayer';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import { usePrevious } from 'ahooks';

const Draggable = require('react-draggable');
const cn = 'Composite-Player';
const defaultPlayerStyle = {
    minWidth: '480px',
    minHeight: '270px',
};

const doublePlayerStyle = {
    width: '50%',
    height: '100%',
    minWidth: '480px',
    minHeight: '270px',
};

const pipPlayerStyle = {
    width: '100%',
    height: '100%',
    minWidth: 'auto',
    minHeight: 'auto',
};

const CompositePlayer = () => {
    const {
        ctrPlayerModel: {
            streamUrlList,
            dbModeApplied,
            pipModeApplied
        },
        setCtrPlayerModelData
    } = useContext(CtrPlayerContext);

    const playerWrapperRef = React.useRef<HTMLDivElement>(null);

    const [mode, setMode] = useState<Mode>('single');
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

    const prevMode = usePrevious(mode);

    const draggingHandler = (e: DraggableEvent, data: DraggableData) => {
        const { x, y } = data;

        setPosition({ x, y });
    };

    useEffect(() => {
        if (playerWrapperRef.current && setCtrPlayerModelData) {
            setCtrPlayerModelData({
                type: 'playerWrapperEle',
                payload: playerWrapperRef.current
            });
        }
    }, [playerWrapperRef.current]);

    useEffect(() => {
        if (streamUrlList.length > 1 && streamUrlList[1] !== '') {
            if (dbModeApplied) {
                setMode('double');
            }

            if (pipModeApplied) {
                setMode('pip');
            }
        }

        if (!dbModeApplied && !pipModeApplied) {
            setMode('single');
        }
    }, [streamUrlList, dbModeApplied, pipModeApplied]);

    useEffect(() => {
        if (setCtrPlayerModelData) {
            setCtrPlayerModelData({
                type: 'mode',
                payload: mode
            });

            setCtrPlayerModelData({
                type: 'prevMode',
                payload: prevMode as Mode
            });
        }

        setPosition({ x: 0, y: 0 });
    }, [mode, prevMode]);

    return (
        <div
            className={classes(cn, '')}
            ref={playerWrapperRef}
        >
            <Player
                isLive
                videoContainerStyle={defaultPlayerStyle}
                url={streamUrlList[0] ?? ''}
            />
            {
                mode !== 'single' &&
                <Draggable
                    bounds={'parent'}
                    disabled={mode !== 'pip'}
                    onDrag={draggingHandler}
                    position={position}
                >
                    <div
                        className={classes(cn, [mode])}
                        style={mode === 'double' ? doublePlayerStyle : {}}
                    >
                        <Player
                            isLive
                            videoContainerStyle={mode === 'pip' ? pipPlayerStyle : {}}
                            url={streamUrlList[1] ?? ''}
                        />
                    </div>
                </Draggable>
            }
            <Controller/>
        </div>
    );
};

export default CompositePlayer;
