import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '@/global.scss';
import VideoPlayer from '@/core/VideoPlayer';
import { CSSProperties } from 'react';

const styles: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
};

ReactDOM.render(
    <div style={{ ...styles }}>
        <VideoPlayer/>
    </div>,
    document.querySelector('#root'),
);
