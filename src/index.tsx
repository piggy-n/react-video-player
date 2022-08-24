import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Icon from '@/components/Icon';
import '@/assets/styles/global.scss';
import '@/assets/styles/reset.scss';

ReactDOM.render(
    <div className={'player-container'}>
        <h1>Hello World</h1>
        <div style={{ background: '#818080' }}>
            <Icon name={'close-web-full-screen'}/>
        </div>
    </div>,
    document.querySelector('#root'),
);
