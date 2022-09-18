import * as React from 'react';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider, TimePicker } from 'antd';
import { classes } from '@/utils/methods/classes';
import './styles/videoTimePicker.scss';
import moment from 'moment';

const cn = 'Video-Time-Picker';

const VideoTimePicker = () => {
    return (
        <div
            className={classes(cn, '')}
            id={'ws-video-time-picker'}
        >
            <ConfigProvider locale={zhCN}>
                <TimePicker.RangePicker
                    showSecond={false}
                    format={'HH:mm'}
                    defaultValue={[moment('00:00', 'HH:mm'), moment('23:59', 'HH:mm')]}
                    suffixIcon={null}
                    allowClear={false}
                    bordered={false}
                    getPopupContainer={() => document.getElementById('ws-video-time-picker') as HTMLElement}
                />
            </ConfigProvider>
        </div>
    );
};

export default VideoTimePicker;
