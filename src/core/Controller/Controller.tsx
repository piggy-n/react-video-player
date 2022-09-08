import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/controller.scss';

const cn = 'Controller';

const Controller = () => {
    return (
        <div className={classes(cn, '')}>
            <div className={classes(cn, 'content')}>

            </div>
        </div>
    );
};

export default Controller;