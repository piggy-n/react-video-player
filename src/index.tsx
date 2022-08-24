import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Player from '@/core/Player';
import '@/assets/styles/global.scss';
import '@/assets/styles/reset.scss';

ReactDOM.render(
    <div className={'eb-video-player-container'}>
        <div>
            <Player/>
        </div>
    </div>,
    document.querySelector('#root'),
);
