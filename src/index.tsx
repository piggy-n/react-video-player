import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import VideoPlayer from '@/core/WsVideoPlayer';
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
        {/*<VideoPlayer/>*/}
        <div style={{ ...styles2 }}>
            <Player
                isLive={false}
                // url={'wss://lzz.enbo12119.com/live/1557971988926095361/101.live.mp4?token=d69d07a3-c588-4c5d-a33a-faaa23d77ad0'}
                url={'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/test/file/2021/07/01/haiwang.mp4'}
                onEnded={(e) => console.log(111,e)}
                // onVideoStateChange={(e) => console.log(222,e)}
                onPlay={(e) => console.log(333,e)}
                onPause={(e) => console.log(444,e)}
                onProgressMouseDown={(e) => console.log(555,e)}
                onProgressMouseUp={(e) => console.log(666,e)}
                // onTimeUpdate={(e) => console.log(777,e)}
            />
        </div>
    </div>,
    document.querySelector('#root'),
);
