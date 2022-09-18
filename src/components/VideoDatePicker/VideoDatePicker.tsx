import * as React from 'react';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider, DatePicker } from 'antd';
import { classes } from '@/utils/methods/classes';
import './styles/videoDatePicker.scss';
import moment from 'moment';
import type { FC } from 'react';
import type { VideoDatePickerProps } from '@/components/VideoDatePicker/type';

const cn = 'Video-Date-Picker';

const VideoDatePicker: FC<VideoDatePickerProps> = (
    {
        value,
        onChange,
    }
) => {
    return (
        <div
            className={classes(cn, '')}
            id={'ws-video-date-picker'}
        >
            <ConfigProvider locale={zhCN}>
                {/*@ts-ignore*/}
                <DatePicker
                    value={value}
                    bordered={false}
                    allowClear={false}
                    suffixIcon={null}
                    defaultValue={moment()}
                    onChange={onChange}
                    getPopupContainer={() => document.getElementById('ws-video-date-picker') as HTMLElement}
                />
            </ConfigProvider>
        </div>
    );
};

export default VideoDatePicker;
