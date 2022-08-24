import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Icon from '@/components/Icon';

ReactDOM.render(
    <>
        <h1>Hello World</h1>
        <div style={{ background: '#818080' }}>
            <Icon name={'close-web-full-screen'}/>
        </div>
    </>,
    document.querySelector('#root'),
);
