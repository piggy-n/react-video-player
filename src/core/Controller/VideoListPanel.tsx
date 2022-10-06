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

        obtainDeviceRecordingsList({
            id: deviceId,
            startTime: startDateTime,
            endTime: endDateTime
        }).then(res => {
            if (!res?.success) {
                setVideoList([]);
                return;
            }

            const list = res.list as VideoList[] || [];
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
                {
                    videoList.map((item, index) =>
                        <div
                            className={classes(cn, 'list-item')}
                            key={index}
                        >
                            <span>00:00-01:00</span>
                            <span>10min</span>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default VideoListPanel;
