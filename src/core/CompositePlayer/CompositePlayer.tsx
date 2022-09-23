import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/compositePlayer.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';
import Controller from '@/core/Controller';
import Player from '@/core/Player';
import type { Mode, Position } from '@/types/ctrPlayer';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import { usePrevious, useReactive } from 'ahooks';

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
            streamUrlList: [
                mainPlayerUrl,
                subPlayerUrl
            ],
            sgModeApplied,
            dbModeApplied,
            pipModeApplied
        },
        setCtrPlayerModelData
    } = useContext(CtrPlayerContext);

    const playerWrapperRef = React.useRef<HTMLDivElement>(null);
    const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [mode, setMode] = useState<Mode>('single');
    const [playerIsExchange, setPlayerIsExchange] = useState<boolean>(false);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

    const prevMode = usePrevious(mode);

    const mouseState = useReactive({
        mouseClickCount: 0,
    });


    useEffect(() => {
        if (playerWrapperRef.current && setCtrPlayerModelData) {
            setCtrPlayerModelData({
                type: 'playerWrapperEle',
                payload: playerWrapperRef.current
            });
        }
    }, [playerWrapperRef.current]);

    // useEffect(() => {
    //     if (streamUrlList.length > 1 && streamUrlList[1] !== '') {
    //         if (dbModeApplied) {
    //             setMode('double');
    //         }
    //
    //         if (pipModeApplied) {
    //             setMode('pip');
    //         }
    //     }
    //
    //     if (!dbModeApplied && !pipModeApplied) {
    //         setMode('single');
    //     }
    // }, [streamUrlList, dbModeApplied, pipModeApplied]);

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

    const mainPlayerWrapperClassNameHandler = (): string[] => {
        const classNameArr = [];

        if (!playerIsExchange) {
            if (
                sgModeApplied
                ||
                (dbModeApplied && !subPlayerUrl)
                ||
                pipModeApplied
            ) {
                classNameArr.push(`sg-mode`);
            }

            if (dbModeApplied && subPlayerUrl) {
                classNameArr.push(`db-mode`);
            }
        }

        if (playerIsExchange && subPlayerUrl && pipModeApplied) {
            classNameArr.push(`pip-mode`);
        }

        return classNameArr;
    };

    const subPlayerWrapperClassNameHandler = (): string[] => {
        const classNameArr = [];

        if (dbModeApplied) {
            classNameArr.push(`db-mode`);
        }

        if (pipModeApplied) {
            playerIsExchange ? classNameArr.push(`sg-mode`) : classNameArr.push(`pip-mode`);
        }

        return classNameArr;
    };

    const exchangePlayerHandler = () => {
        mouseState.mouseClickCount += 1;

        clickTimeoutRef.current && clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = setTimeout(
            () => {
                if (mouseState.mouseClickCount === 2) {
                    setPlayerIsExchange(!playerIsExchange);
                }

                mouseState.mouseClickCount = 0;
            },
            300
        );
    };

    useEffect(() => {
        if (!subPlayerUrl && playerIsExchange) {
            setPlayerIsExchange(false);
        }
    }, [subPlayerUrl, playerIsExchange]);

    return (
        <div
            className={classes(cn, '')}
            ref={playerWrapperRef}
        >
            <Draggable
                bounds={'parent'}
                disabled={!playerIsExchange}
                position={playerIsExchange ? position : { x: 0, y: 0 }}
                onDrag={(e: DraggableEvent, data: DraggableData) => setPosition({ x: data.x, y: data.y })}
            >
                <div className={classes(
                    cn,
                    'main-wrapper',
                    mainPlayerWrapperClassNameHandler(),
                )}
                >
                    {
                        playerIsExchange && pipModeApplied &&
                        <div
                            className={classes(cn, 'exchange-mask')}
                            onClick={exchangePlayerHandler}
                        />
                    }
                    <Player
                        isLive
                        url={mainPlayerUrl}
                        controllable={!playerIsExchange}
                    />
                </div>
            </Draggable>
            {
                subPlayerUrl &&
                <Draggable
                    bounds={'parent'}
                    disabled={playerIsExchange || dbModeApplied}
                    position={playerIsExchange ? { x: 0, y: 0 } : position}
                    onDrag={(e: DraggableEvent, data: DraggableData) => setPosition({ x: data.x, y: data.y })}
                >
                    <div className={classes(
                        cn,
                        'sub-wrapper',
                        subPlayerWrapperClassNameHandler(),
                    )}
                    >
                        {
                            !playerIsExchange && pipModeApplied &&
                            <div
                                className={classes(cn, 'exchange-mask')}
                                onClick={exchangePlayerHandler}
                            />
                        }
                        <Player
                            isLive
                            url={subPlayerUrl}
                            controllable={playerIsExchange || dbModeApplied}
                        />
                    </div>
                </Draggable>
            }
            <Controller/>
        </div>
    );
};

export default CompositePlayer;
