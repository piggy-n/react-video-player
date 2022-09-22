import { isFullscreen } from 'screenfull';
import Icon from '@/components/Icon';
import * as React from 'react';

const FullScreen = () => {
    const clickHandler = () => {

    };

    return (
        <Icon
            name={isFullscreen ? 'close-web-fullscreen' : 'fullscreen'}
            title={'全屏'}
            onClick={clickHandler}
        />
    );
};

export default FullScreen;
