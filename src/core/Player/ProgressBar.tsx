import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/progressBar.scss';
import { useContext, useRef } from 'react';
import { VideoContext } from '@/utils/hooks/useVideoContext';

const cn = 'Progress-Bar';

const ProgressBar = () => {
    const {
        videoModel: {
            controlled
        }
    } = useContext(VideoContext);

    const progressBgRef = useRef<HTMLDivElement>(null);
    const progressControlPointRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className={classes(cn, '')}
            style={{ opacity: controlled ? 1 : 1 }}
        >
            <div
                ref={progressBgRef}
                className={classes(cn, 'bg')}
            >
                <div
                    className={classes(cn, 'buffered')}
                    style={{ width: '75%' }}
                />
                <div
                    className={classes(cn, 'played')}
                    style={{
                        width: '50%',
                        background: 'rgba(22, 174, 224, 1)'
                    }}
                >
                    <i
                        ref={progressControlPointRef}
                        className={'control-point'}
                        style={{ background: 'rgba(22, 174, 224, 1)' }}
                    />
                </div>
            </div>


        </div>
    );
};

export default ProgressBar;