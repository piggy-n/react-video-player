import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/compositePlayer.scss';
import { useContext } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';
import PipPlayer from '@/core/CompositePlayer/pipPlayer';
import Controller from '@/core/Controller';
import Player from '@/core/Player';
// url={'wss://lzz.enbo12119.com/live/1560452005253799937/101.live.mp4?token=1477fabe-4fab-4b65-8c32-a915558859dc'}
// url={'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/test/file/2021/07/01/haiwang.mp4'}
// url={'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/prod/file/2021/08/31/540p.mp4'}
const Draggable = require('react-draggable');
const cn = 'Composite-Player';
const playerStyle = {
    minHeight: '270px',
    minWidth: '480px',
};

const CompositePlayer = () => {
    const {
        ctrPlayerModel: {
            streamUrlList,
            doubleGrid,
            pictureInPicture
        },
        // setCtrPlayerModelData
    } = useContext(CtrPlayerContext);

    return (
        <div className={classes(cn, '')}>
            <Player
                isLive
                videoContainerStyle={playerStyle}
                url={streamUrlList[0] ?? ''}
            />
            {
                doubleGrid &&
                <Player
                    isLive
                    videoContainerStyle={playerStyle}
                    url={streamUrlList[1] ?? ''}
                />
            }
            {
                pictureInPicture &&
                <Draggable bounds={'parent'}>
                    <div className={classes(cn, 'pip')}>
                        <PipPlayer isLive url={streamUrlList[1] ?? ''}/>
                    </div>
                </Draggable>
            }
            <Controller/>
        </div>
    );
};

export default CompositePlayer;
