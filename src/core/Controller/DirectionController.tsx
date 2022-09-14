import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/directionController.scss';
import Icon from '@/components/Icon';
import { useHover } from 'ahooks';

const cn = 'Direction-Controller';

const DirectionController = () => {
    const btnTopLeftIsHover = useHover(document.getElementById('ws-ctr-btn-top-left'));
    const btnTopIsHover = useHover(document.getElementById('ws-ctr-btn-top'));
    const btnTopRightIsHover = useHover(document.getElementById('ws-ctr-btn-top-right'));
    const btnRightIsHover = useHover(document.getElementById('ws-ctr-btn-right'));
    const btnBottomRightIsHover = useHover(document.getElementById('ws-ctr-btn-bottom-right'));
    const btnBottomIsHover = useHover(document.getElementById('ws-ctr-btn-bottom'));
    const btnBottomLeftIsHover = useHover(document.getElementById('ws-ctr-btn-bottom-left'));
    const btnLeftIsHover = useHover(document.getElementById('ws-ctr-btn-left'));

    return (
        <div className={classes(cn, '')}>
            <div className={classes(cn, 'left')}>
                <div className={'ws-left-center'}>
                    <Icon name={'box'} size={28}/>
                </div>
                <div className={'ws-ctr-btn-top-left'}>
                    <Icon
                        id={'ws-ctr-btn-top-left'}
                        name={btnTopLeftIsHover ? 'arrow-hover' : 'arrow'}
                        size={36}
                        style={{ transform: 'rotate(225deg)' }}
                    />
                </div>
                <div className={'ws-ctr-btn-top'}>
                    <Icon
                        id={'ws-ctr-btn-top'}
                        name={btnTopIsHover ? 'arrow-hover' : 'arrow'}
                        size={36}
                        style={{ transform: 'rotate(270deg)' }}
                    />
                </div>
                <div className={'ws-ctr-btn-top-right'}>
                    <Icon
                        id={'ws-ctr-btn-top-right'}
                        name={btnTopRightIsHover ? 'arrow-hover' : 'arrow'}
                        size={36}
                        style={{ transform: 'rotate(315deg)' }}
                    />
                </div>
                <div className={'ws-ctr-btn-right'}>
                    <Icon
                        id={'ws-ctr-btn-right'}
                        name={btnRightIsHover ? 'arrow-hover' : 'arrow'}
                        size={36}
                        onUseClick={() => console.log(111)}
                    />
                </div>
                <div className={'ws-ctr-btn-bottom-right'}>
                    <Icon
                        id={'ws-ctr-btn-bottom-right'}
                        name={btnBottomRightIsHover ? 'arrow-hover' : 'arrow'}
                        size={36}
                        style={{ transform: 'rotate(45deg)' }}
                    />
                </div>
                <div className={'ws-ctr-btn-bottom'}>
                    <Icon
                        id={'ws-ctr-btn-bottom'}
                        name={btnBottomIsHover ? 'arrow-hover' : 'arrow'}
                        size={36}
                        style={{ transform: 'rotate(90deg)' }}
                    />
                </div>
                <div className={'ws-ctr-btn-bottom-left'}>
                    <Icon
                        id={'ws-ctr-btn-bottom-left'}
                        name={btnBottomLeftIsHover ? 'arrow-hover' : 'arrow'}
                        size={36}
                        style={{ transform: 'rotate(135deg)' }}
                    />
                </div>
                <div className={'ws-ctr-btn-left'}>
                    <Icon
                        id={'ws-ctr-btn-left'}
                        name={btnLeftIsHover ? 'arrow-hover' : 'arrow'}
                        size={36}
                        style={{ transform: 'rotate(180deg)' }}
                    />
                </div>
            </div>

            <div className={classes(cn, 'right')}>
                <div className={'ws-right-btn-up'}>
                    <Icon name={'arrowUp'} size={15}/>
                </div>
                <span>50</span>
                <div className={'ws-right-btn-down'}>
                    <Icon name={'arrowDown'} size={15}/>
                </div>
            </div>
        </div>
    );
};

export default DirectionController;