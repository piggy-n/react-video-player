import * as React from 'react';
import * as ReactDOM from 'react-dom';
import VideoPlayer from '@/core/WsVideoPlayer';
import type { CSSProperties } from 'react';
import Player from '@/core/Player';

const styles: CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '100vh',
};

const styles2: CSSProperties = {
    width: '800px',
    height: '450px',
    border: '1px solid red',
};

ReactDOM.render(
    <div style={{ ...styles }}>
        <VideoPlayer/>
        <div style={{ ...styles2 }}>
            <Player/>
        </div>
    </div>,
    document.querySelector('#root'),
);
