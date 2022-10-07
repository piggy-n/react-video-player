import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/videoListPanel.scss';
import VideoDatePicker from '@/components/VideoDatePicker';
import VideoTimePicker from '@/components/VideoTimePicker';
import { useContext, useEffect, useRef, useState } from 'react';
import type { Moment } from 'moment';
import moment from 'moment';
import { obtainDeviceRecordingsList } from '@/services/recording';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';
import type { VideoList } from '@/core/Controller/type';
import { useSize } from 'ahooks';
import { ConfigProvider, Empty, Spin } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

const cn = 'Video-List-Panel';

const VideoListPanel = () => {
    const { deviceId } = useContext(CtrPlayerContext);

    const containerHeight = useSize(document.getElementById('ws-crt-player'))?.height ?? 0;

    const [dateValue, setDateValue] = useState<Moment>(moment());
    const [timeValue, setTimeValue] = useState<[Moment, Moment]>([
        moment('00:00', 'HH:mm'),
        moment('23:59', 'HH:mm')
    ]);
    const [startDateTime, setStartDateTime] = useState<string>(moment()
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss')
    );
    const [endDateTime, setEndDateTime] = useState<string>(moment()
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss')
    );
    const [videoList, setVideoList] = useState<VideoList[]>([]);
    const [resizing, setResizing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const videoResizingTimerRef = useRef<NodeJS.Timer | null>(null);

    const datePickerChangeHandler = (value: Moment, dateString: string) => {
        setDateValue(value);
        setStartDateTime(`${dateString} ${timeValue[0].format('HH:mm:ss')}`);
        setEndDateTime(`${dateString} ${timeValue[1].format('HH:mm:ss')}`);
    };

    const timePickerChangeHandler = (value: [Moment, Moment]) => {
        setTimeValue(value);
        setStartDateTime(`${dateValue.format('YYYY-MM-DD')} ${value[0].format('HH:mm:ss')}`);
        setEndDateTime(`${dateValue.format('YYYY-MM-DD')} ${value[1].format('HH:mm:ss')}`);
    };

    useEffect(() => {
        if (deviceId === '') return;

        setLoading(true);
        obtainDeviceRecordingsList({
            id: deviceId,
            startTime: startDateTime,
            endTime: endDateTime
        }).then(res => {
            if (!res?.success) {
                setLoading(false);
                setVideoList([]);
                return;
            }

            const list = res.list as VideoList[] || [];
            list.forEach(item => {
                const duration = moment(item.endTime).diff(moment(item.startTime), 'minutes');
                const hours = Math.floor(duration / 60);
                const minutes = duration % 60;
                if (hours === 0) {
                    item.duration = `${minutes}min`;
                }
                if (hours !== 0) {
                    item.duration = `${hours}h${minutes}min`;
                }
                item.startTime = item.startTime.slice(11, 16);
                item.endTime = item.endTime.slice(11, 16);
            });

            setLoading(false);
            setVideoList(list);
        });
    }, [startDateTime, endDateTime]);

    useEffect(
        () => {
            setResizing(true);

            videoResizingTimerRef.current = setTimeout(
                () => {
                    setResizing(false);
                },
                300
            );

            return () => {
                clearTimeout(videoResizingTimerRef.current as NodeJS.Timer);
            };
        },
        [containerHeight]
    );

    return (
        <div className={classes(cn, '')}>
            <div className={classes(cn, 'item-wrapper')}>
                <div className={classes(cn, 'item-time')}>
                    <VideoDatePicker
                        value={dateValue}
                        onChange={datePickerChangeHandler}
                    />
                    <VideoTimePicker
                        value={timeValue}
                        onChange={timePickerChangeHandler}
                    />
                </div>
            </div>
            <div
                className={classes(cn, 'list')}
                style={{ maxHeight: containerHeight && !resizing ? containerHeight - 80 : 0 }}
            >
                <Spin spinning={loading} className={classes(cn, 'loading')}/>
                {
                    videoList.length === 0 && !loading &&
                    <ConfigProvider locale={zhCN}>
                        <Empty
                            className={classes(cn, 'empty')}
                            imageStyle={{ height: '50px' }}
                        />
                    </ConfigProvider>
                }
                {
                    !loading && videoList.map((item, index) =>
                        <div
                            className={classes(cn, 'list-item')}
                            key={index}
                        >
                            <span>{`${item.startTime}-${item.endTime}`}</span>
                            <span>{item.duration}</span>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default VideoListPanel;
