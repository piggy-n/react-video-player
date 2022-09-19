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
                <div className={'ws-ctr-btn-top-left'}>
                    <Icon
                        id={'ws-ctr-btn-top-left'}
                        name={'arrow'}
                        size={36}
                        style={{ transform: 'rotate(225deg)' }}
                        onMouseDown={() => move('upleft')}
                        onMouseUp={() => move('stop')}
                    />
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
                <div className={'ws-ctr-btn-top-right'}>
                    <Icon
                        id={'ws-ctr-btn-top-right'}
                        name={'arrow'}
                        size={36}
                        style={{ transform: 'rotate(315deg)' }}
                        onMouseDown={() => move('upright')}
                        onMouseUp={() => move('stop')}
                    />
                </div>
                <div className={'ws-ctr-btn-right'}>
                    <Icon
                        id={'ws-ctr-btn-right'}
                        name={'arrow'}
                        size={36}
                        onMouseDown={() => move('right')}
                        onMouseUp={() => move('stop')}
                    />
                </div>
                <div className={'ws-ctr-btn-bottom-right'}>
                    <Icon
                        id={'ws-ctr-btn-bottom-right'}
                        name={'arrow'}
                        size={36}
                        style={{ transform: 'rotate(45deg)' }}
                        onMouseDown={() => move('downright')}
                        onMouseUp={() => move('stop')}
                    />
                </div>
                <div className={'ws-ctr-btn-bottom'}>
                    <Icon
                        id={'ws-ctr-btn-bottom'}
                        name={'arrow'}
                        size={36}
                        style={{ transform: 'rotate(90deg)' }}
                        onMouseDown={() => move('down')}
                        onMouseUp={() => move('stop')}
                    />
                </div>
                <div className={'ws-ctr-btn-bottom-left'}>
                    <Icon
                        id={'ws-ctr-btn-bottom-left'}
                        name={'arrow'}
                        size={36}
                        style={{ transform: 'rotate(135deg)' }}
                        onMouseDown={() => move('downleft')}
                        onMouseUp={() => move('stop')}
                    />
                </div>
                <div className={'ws-ctr-btn-left'}>
                    <Icon
                        id={'ws-ctr-btn-left'}
                        name={'arrow'}
                        size={36}
                        style={{ transform: 'rotate(180deg)' }}
                        onMouseDown={() => move('left')}
                        onMouseUp={() => move('stop')}
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
