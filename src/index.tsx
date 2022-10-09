import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ControllablePlayer from '@/core/ControllablePlayer';
import type { CSSProperties } from 'react';
// import Player from '@/core/Player';

const styles: CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '100vh',
};

// const styles2: CSSProperties = {
//     width: '800px',
//     height: '450px',
//     border: '1px solid red',
// };

ReactDOM.render(
    <div style={{ ...styles }}>
        {/*1561636627632099330*/}
        {/*1560452003676741634*/}
        {/*<ControllablePlayer deviceId={'1560452004075200514'}/>*/}
        {/* 雨花线上 */}
        {/*<ControllablePlayer deviceId={'1529803008839823362'} style={{*/}
        {/*    left: '200px',*/}
        {/*}}/>*/}
        {/*本地*/}
        <ControllablePlayer deviceId={'1569965018831654913'} deviceName={'前置林火前置林火前置'} deviceStatus={true} devLC/>
        {/*<div style={{ ...styles2 }}>*/}
        {/*    <Player*/}
        {/*        isLive={false}*/}
        {/*        // url={'wss://lzz.enbo12119.com/live/1557971988926095361/101.live.mp4?token=d69d07a3-c588-4c5d-a33a-faaa23d77ad0'}*/}
        {/*        url={'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/test/file/2021/07/01/haiwang.mp4'}*/}
        {/*        onEnded={(e) => console.log(111,e)}*/}
        {/*        // onVideoStateChange={(e) => console.log(222,e)}*/}
        {/*        onPlay={(e) => console.log(333,e)}*/}
        {/*        onPause={(e) => console.log(444,e)}*/}
        {/*        onProgressMouseDown={(e) => console.log(555,e)}*/}
        {/*        onProgressMouseUp={(e) => console.log(666,e)}*/}
        {/*        // onTimeUpdate={(e) => console.log(777,e)}*/}
        {/*    />*/}
        {/*</div>*/}
    </div>,
    document.querySelector('#root'),
);
