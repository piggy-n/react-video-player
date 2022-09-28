import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/videoListPanel.scss';
import VideoDatePicker from '@/components/VideoDatePicker';
import VideoTimePicker from '@/components/VideoTimePicker';
import { useContext, useEffect, useState } from 'react';
import type { Moment } from 'moment';
import moment from 'moment';
import { obtainDeviceRecordingsList } from '@/services/recording';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';

const cn = 'Video-List-Panel';

const VideoListPanel = () => {
    const { deviceId } = useContext(CtrPlayerContext);

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
            console.log(res);
        });
    }, [startDateTime, endDateTime]);

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
        </div>
    );
};

export default VideoListPanel;
