import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/compositePlayer.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';
import Controller from '@/core/Controller';
import Player from '@/core/Player';
import type { Mode, PlayerOpts, Position } from '@/types/ctrPlayer';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import { usePrevious, useReactive } from 'ahooks';

const Draggable = require('react-draggable');
const cn = 'Composite-Player';

const CompositePlayer = () => {
    const {
        ctrPlayerModel: {
            streamUrlList,
            sgModeApplied,
            dbModeApplied,
            pipModeApplied
        },
        setCtrPlayerModelData
    } = useContext(CtrPlayerContext);

    const playerWrapperRef = useRef<HTMLDivElement>(null);
    const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [mode, setMode] = useState<Mode>('single');
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [playerOpts, setPlayerOpts] = useState<PlayerOpts>({
        isMainPlayer: 'plyO',
        isPipModePlayer: 'neither'
    });

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

    const playerWrapperClassNameHandler = (ply: 'plyO' | 'plyT'): string[] => {
        const classNameArr = [];
        const {
            playerOneUrl,
            playerTwoUrl,
            isMainPlayer,
            isPipModePlayer
        } = playerOpts;

        if (isPipModePlayer === 'neither') {
            if (
                sgModeApplied
                ||
                pipModeApplied
                ||
                (
                    dbModeApplied
                    &&
                    (
                        (playerOneUrl && !playerTwoUrl)
                        ||
                        (!playerOneUrl && playerTwoUrl)
                    )
                )
            ) {
                classNameArr.push(`sg-mode`);
            }

            if (dbModeApplied && playerOneUrl && playerTwoUrl) {
                classNameArr.push(`db-mode`);
            }
        }

        if (isPipModePlayer === 'plyO') {
            ply === 'plyO' && classNameArr.push(`pip-mode`);
            ply === 'plyT' && classNameArr.push(`sg-mode`);
        }

        if (isPipModePlayer === 'plyT') {
            ply === 'plyO' && classNameArr.push(`sg-mode`);
            ply === 'plyT' && classNameArr.push(`pip-mode`);
        }

        return classNameArr;
    };

    const exchangePlayerHandler = () => {
        if (!setCtrPlayerModelData) return;
        const { isMainPlayer, isPipModePlayer } = playerOpts;

        mouseState.mouseClickCount += 1;
        clickTimeoutRef.current && clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = setTimeout(
            () => {
                if (mouseState.mouseClickCount === 2) {
                    setPlayerOpts({
                        ...playerOpts,
                        isMainPlayer: isMainPlayer === 'plyO' ? 'plyT' : 'plyO',
                        isPipModePlayer: isPipModePlayer === 'plyO' ? 'plyT' : 'plyO'
                    });

                    setCtrPlayerModelData({
                        type: 'streamUrlList',
                        payload: [streamUrlList[1], streamUrlList[0]]
                    });
                }

                mouseState.mouseClickCount = 0;
            },
            300
        );
    };

    useEffect(() => {
        const [streamOneUrl, streamTwoUrl] = streamUrlList;
        const { playerOneUrl, playerTwoUrl, isMainPlayer } = playerOpts;

        if (streamOneUrl && !streamTwoUrl) {
            if (isMainPlayer === 'plyO' && !playerTwoUrl) {
                setPlayerOpts({
                    ...playerOpts,
                    playerOneUrl: streamOneUrl,
                    playerTwoUrl: undefined
                });
            }

            if (isMainPlayer === 'plyT' && !playerOneUrl) {
                setPlayerOpts({
                    ...playerOpts,
                    playerOneUrl: undefined,
                    playerTwoUrl: streamOneUrl
                });
            }

            if (isMainPlayer === 'plyO' && playerOneUrl === streamOneUrl) {
                setPlayerOpts({
                    ...playerOpts,
                    playerOneUrl: streamOneUrl,
                    playerTwoUrl: undefined,
                    isPipModePlayer: 'neither'
                });
            }

            if (isMainPlayer === 'plyT' && playerTwoUrl === streamOneUrl) {
                setPlayerOpts({
                    ...playerOpts,
                    playerOneUrl: undefined,
                    playerTwoUrl: streamOneUrl,
                    isPipModePlayer: 'neither'
                });
            }

            if (isMainPlayer === 'plyO' && playerTwoUrl === streamOneUrl) {
                setPlayerOpts({
                    playerOneUrl: undefined,
                    playerTwoUrl: streamOneUrl,
                    isMainPlayer: 'plyT',
                    isPipModePlayer: 'neither'
                });
            }

            if (isMainPlayer === 'plyT' && playerOneUrl === streamOneUrl) {
                setPlayerOpts({
                    playerOneUrl: streamOneUrl,
                    playerTwoUrl: undefined,
                    isMainPlayer: 'plyO',
                    isPipModePlayer: 'neither'
                });
            }
        }

        if (streamOneUrl && streamTwoUrl) {
            if (streamOneUrl === playerTwoUrl && streamTwoUrl === playerOneUrl) return;

            if (isMainPlayer === 'plyO' && streamTwoUrl !== playerTwoUrl) {
                setPlayerOpts({
                    ...playerOpts,
                    playerTwoUrl: streamTwoUrl,
                    isPipModePlayer: pipModeApplied ? 'plyT' : 'neither'
                });
            }

            if (isMainPlayer === 'plyT' && streamTwoUrl !== playerOneUrl) {
                setPlayerOpts({
                    ...playerOpts,
                    playerOneUrl: streamTwoUrl,
                    isPipModePlayer: pipModeApplied ? 'plyO' : 'neither'
                });
            }
        }
    }, [streamUrlList]);

    useEffect(() => {
        console.log('playerOpts', { ...playerOpts });
    }, [playerOpts]);

    return (
        <div
            className={classes(cn, '')}
            ref={playerWrapperRef}
        >
            {
                (playerOpts.isMainPlayer === 'plyO' || playerOpts.playerOneUrl) &&
                <Draggable
                    bounds={'parent'}
                    disabled={playerOpts.isPipModePlayer === 'plyO'}
                    position={playerOpts.isPipModePlayer === 'plyO' ? position : { x: 0, y: 0 }}
                    onDrag={(e: DraggableEvent, data: DraggableData) => setPosition({ x: data.x, y: data.y })}
                >
                    <div className={classes(
                        cn,
                        'wrapper',
                        playerWrapperClassNameHandler('plyO'),
                    )}
                    >
                        {
                            playerOpts.isPipModePlayer === 'plyO' &&
                            <div
                                className={classes(cn, 'exchange-mask')}
                                onClick={exchangePlayerHandler}
                            />
                        }
                        <Player
                            isLive
                            url={playerOpts.playerOneUrl ?? ''}
                            controllable={playerOpts.isPipModePlayer !== 'plyO'}
                        />
                    </div>
                </Draggable>
            }
            {
                (playerOpts.isMainPlayer === 'plyT' || playerOpts.playerTwoUrl) &&
                <Draggable
                    bounds={'parent'}
                    disabled={playerOpts.isPipModePlayer === 'plyT'}
                    position={playerOpts.isPipModePlayer === 'plyT' ? position : { x: 0, y: 0 }}
                    onDrag={(e: DraggableEvent, data: DraggableData) => setPosition({ x: data.x, y: data.y })}
                >
                    <div className={classes(
                        cn,
                        'wrapper',
                        playerWrapperClassNameHandler('plyT'),
                    )}
                    >
                        {
                            playerOpts.isPipModePlayer === 'plyT' &&
                            <div
                                className={classes(cn, 'exchange-mask')}
                                onClick={exchangePlayerHandler}
                            />
                        }
                        <Player
                            isLive
                            url={playerOpts.playerTwoUrl ?? ''}
                            controllable={playerOpts.isPipModePlayer !== 'plyT'}
                        />
                    </div>
                </Draggable>
            }
            {/*{*/}
            {/*    subPlayerUrl &&*/}
            {/*    <Draggable*/}
            {/*        bounds={'parent'}*/}
            {/*        disabled={playerIsExchange || dbModeApplied}*/}
            {/*        position={playerIsExchange ? { x: 0, y: 0 } : position}*/}
            {/*        onDrag={(e: DraggableEvent, data: DraggableData) => setPosition({ x: data.x, y: data.y })}*/}
            {/*    >*/}
            {/*        <div className={classes(*/}
            {/*            cn,*/}
            {/*            'sub-wrapper',*/}
            {/*            subPlayerWrapperClassNameHandler(),*/}
            {/*        )}*/}
            {/*        >*/}
            {/*            {*/}
            {/*                !playerIsExchange && pipModeApplied &&*/}
            {/*                <div*/}
            {/*                    className={classes(cn, 'exchange-mask')}*/}
            {/*                    onClick={exchangePlayerHandler}*/}
            {/*                />*/}
            {/*            }*/}
            {/*            <Player*/}
            {/*                isLive*/}
            {/*                url={subPlayerUrl}*/}
            {/*                controllable={playerIsExchange || dbModeApplied}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    </Draggable>*/}
            {/*}*/}
            <Controller/>
        </div>
    );
};

export default CompositePlayer;
