import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/directionController.scss';
import Icon from '@/components/Icon';
import { pushControlCommands } from '@/services/controller';
import { useContext } from 'react';
import { ControllerContext } from '@/utils/hooks/useControllerContext';
import { useReactive } from 'ahooks';

const cn = 'Direction-Controller';

const DirectionController = () => {
    const {
        controllerModel: {
            speed
        },
        dispatch,
        id
    } = useContext(ControllerContext);

    const hoverState = useReactive({
        topLeft: false,
        top: false,
        topRight: false,
        right: false,
        bottomRight: false,
        bottom: false,
        bottomLeft: false,
        left: false,
    });

    const increaseSpeedHandler = () => {
        if (speed >= 100) return;

        dispatch({
            type: 'speed',
            payload: speed + 10,
        });
    };

    const decreaseSpeedHandler = () => {
        if (speed <= 10) return;

        dispatch({
            type: 'speed',
            payload: speed - 10,
        });
    };

    const move = (operation: string) => {
        pushControlCommands({
            id,
            operation,
            speed,
        }).then(res => {
            if (!res?.success) return;
            console.log(res);
        });
    };

    return (
        <div className={classes(cn, '')}>
            <div className={classes(cn, 'left')}>
                <div className={'ws-left-center'}>
                    <Icon name={'box'} size={28}/>
                </div>

                <div className={'ws-ctr-btn-top'}>
                    <i
                        className={'ws-ctr-pointer-top'}
                        onMouseEnter={() => hoverState.top = true}
                        onMouseLeave={() => hoverState.top = false}
                        onMouseDown={() => move('up')}
                        onMouseUp={() => move('stop')}
                    />
                    <Icon
                        name={hoverState.top ? 'arrow-hover' : 'arrow'}
                        size={36}
                        style={{ transform: 'rotate(270deg)' }}
                    />
                </div>

                <div className={'ws-ctr-btn-bottom'}>
                    <i
                        className={'ws-ctr-pointer-bottom'}
                        onMouseEnter={() => hoverState.bottom = true}
                        onMouseLeave={() => hoverState.bottom = false}
                        onMouseDown={() => move('down')}
                        onMouseUp={() => move('stop')}
                    />
                    <Icon
                        name={hoverState.bottom ? 'arrow-hover' : 'arrow'}
                        size={36}
                        style={{ transform: 'rotate(90deg)' }}
                    />
                </div>

                <div className={'ws-ctr-btn-left'}>
                    <i
                        className={'ws-ctr-pointer-left'}
                        onMouseEnter={() => hoverState.left = true}
                        onMouseLeave={() => hoverState.left = false}
                        onMouseDown={() => move('left')}
                        onMouseUp={() => move('stop')}
                    />
                    <Icon
                        name={hoverState.left ? 'arrow-hover' : 'arrow'}
                        size={36}
                        style={{ transform: 'rotate(180deg)' }}
                    />
                </div>

                <div className={'ws-ctr-btn-right'}>
                    <i
                        className={'ws-ctr-pointer-right'}
                        onMouseEnter={() => hoverState.right = true}
                        onMouseLeave={() => hoverState.right = false}
                        onMouseDown={() => move('right')}
                        onMouseUp={() => move('stop')}
                    />
                    <Icon
                        name={hoverState.right ? 'arrow-hover' : 'arrow'}
                        size={36}
                    />
                </div>

                <div className={'ws-ctr-btn-top-left'}>
                    <i
                        className={'ws-ctr-pointer-top-left'}
                        onMouseEnter={() => hoverState.topLeft = true}
                        onMouseLeave={() => hoverState.topLeft = false}
                        onMouseDown={() => move('upleft')}
                        onMouseUp={() => move('stop')}
                    />
                    <Icon
                        name={hoverState.topLeft ? 'arrow-hover' : 'arrow'}
                        size={36}
                        style={{ transform: 'rotate(225deg)' }}
                    />
                </div>

                <div className={'ws-ctr-btn-top-right'}>
                    <i
                        className={'ws-ctr-pointer-top-right'}
                        onMouseEnter={() => hoverState.topRight = true}
                        onMouseLeave={() => hoverState.topRight = false}
                        onMouseDown={() => move('upright')}
                        onMouseUp={() => move('stop')}
                    />
                    <Icon
                        name={hoverState.topRight ? 'arrow-hover' : 'arrow'}
                        size={36}
                        style={{ transform: 'rotate(315deg)' }}
                    />
                </div>

                <div className={'ws-ctr-btn-bottom-left'}>
                    <i
                        className={'ws-ctr-pointer-bottom-left'}
                        onMouseEnter={() => hoverState.bottomLeft = true}
                        onMouseLeave={() => hoverState.bottomLeft = false}
                        onMouseDown={() => move('downleft')}
                        onMouseUp={() => move('stop')}
                    />
                    <Icon
                        name={hoverState.bottomLeft ? 'arrow-hover' : 'arrow'}
                        size={36}
                        style={{ transform: 'rotate(135deg)' }}
                    />
                </div>

                <div className={'ws-ctr-btn-bottom-right'}>
                    <i
                        className={'ws-ctr-pointer-bottom-right'}
                        onMouseEnter={() => hoverState.bottomRight = true}
                        onMouseLeave={() => hoverState.bottomRight = false}
                        onMouseDown={() => move('downright')}
                        onMouseUp={() => move('stop')}
                    />
                    <Icon
                        name={hoverState.bottomRight ? 'arrow-hover' : 'arrow'}
                        size={36}
                        style={{ transform: 'rotate(45deg)' }}
                    />
                </div>
            </div>

            <div className={classes(cn, 'right')}>
                <div
                    className={'ws-right-btn-up'}
                    onClick={increaseSpeedHandler}
                >
                    <Icon name={'arrowUp'} size={15}/>
                </div>
                <span>{speed}</span>
                <div
                    className={'ws-right-btn-down'}
                    onClick={decreaseSpeedHandler}
                >
                    <Icon name={'arrowDown'} size={15}/>
                </div>
            </div>
        </div>
    );
};

export default DirectionController;
