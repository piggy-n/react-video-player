import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/directionController.scss';
import Icon from '@/components/Icon';

const cn = 'Direction-Controller';

const DirectionController = () => {
    return (
        <div className={classes(cn, '')}>
            <div className={classes(cn, 'left')}>

            </div>

            <div className={classes(cn, 'right')}>
                <div className={'ws-right-btn-up'}>
                    <Icon name={'arrowUp'} size={15}/>
                </div>
                <div className={'ws-right-btn-down'}>
                    <Icon name={'arrowDown'} size={15}/>
                </div>
            </div>
        </div>
    );
};

export default DirectionController;