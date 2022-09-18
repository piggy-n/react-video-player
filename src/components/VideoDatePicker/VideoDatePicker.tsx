import * as React from 'react';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider, DatePicker } from 'antd';
import { classes } from '@/utils/methods/classes';
import './styles/videoDatePicker.scss';
import moment from 'moment';

const cn = 'Video-Date-Picker';

const VideoDatePicker = () => {
    return (
        <div
            className={classes(cn, '')}
            id={'ws-video-date-picker'}
        >
            <ConfigProvider locale={zhCN}>
                {/*@ts-ignore*/}
                <DatePicker
                    bordered={false}
                    allowClear={false}
                    suffixIcon={null}
                    defaultValue={moment()}
                    getPopupContainer={() => document.getElementById('ws-video-date-picker') as HTMLElement}
                />
            </ConfigProvider>
        </div>
    );
};

export default VideoDatePicker;
