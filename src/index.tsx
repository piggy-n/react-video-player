import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '@/global.scss';
import VideoPlayer from '@/core/VideoPlayer';

ReactDOM.render(
    <VideoPlayer/>,
    document.querySelector('#root'),
);
