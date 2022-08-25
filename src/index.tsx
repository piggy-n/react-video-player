import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '@/global.scss';
import VideoPlayer from '@/core/WsVideoPlayer';
import type { CSSProperties } from 'react';

const styles: CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '100vh',
};

ReactDOM.render(
    <div style={{ ...styles }}>
        <VideoPlayer/>
    </div>,
    document.querySelector('#root'),
);
