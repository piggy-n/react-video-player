import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/videoListPanel.scss';
import VideoDatePicker from '@/components/VideoDatePicker';
import VideoTimePicker from '@/components/VideoTimePicker';
import { useContext, useEffect, useRef, useState } from 'react';
import type { Moment } from 'moment';
import moment from 'moment';
import { obtainDeviceRecordingsList, obtainDeviceStreamRecording } from '@/services/recording';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';
import type { VideoList } from '@/core/Controller/type';
import { useSize, useUpdateEffect } from 'ahooks';
import { ConfigProvider, Empty, Spin } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

const cn = 'Video-List-Panel';

const VideoListPanel = () => {
    const {
        ctrPlayerModel: {
            streamUrlList,
            sgModeApplied,
            playerLiveMode,
            exchangePlayer,
            deviceTypeCode,
            selectedCamera
        },
        deviceId,
        setCtrPlayerModelData,
        devLC,
        devOL
    } = useContext(CtrPlayerContext);

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
    const [selectedVideo, setSelectedVideo] = useState<number[]>([-1, -1]);

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

    const obtainUrl = async (id: string, startTime: string, endTime: string) => {
        return await obtainDeviceStreamRecording({
            id: deviceTypeCode === '4' ? deviceId : selectedCamera,
            startTime,
            endTime,
        }).then(res => {
            if (!res?.success) return '';

            const data = res.data as { streamUrl: string } || {};
            if (!data.streamUrl) return '';

            const token = `?token=${localStorage.getItem('accessToken')}`;
            const prev = location.protocol.includes('https') ? 'wss:' : 'ws:';
            const wsUrl = `${prev}//${window.location.host}`;
            const { streamUrl } = data;

            if (devLC) {
                return `ws://192.168.9.148${streamUrl}${token}`;
            }

            if (devOL) {
                return `wss://lzz.enbo12119.com${streamUrl}${token}`;
            }

            return `${wsUrl}${streamUrl}${token}`;
        });
    };

    const clickHandler = async (value: VideoList, index: number) => {
        if (!setCtrPlayerModelData) return;

        const { protocol, url, endTime, startTime } = value;
        const token = `?token=${localStorage.getItem('accessToken')}`;
        const prev = location.protocol.includes('https') ? 'wss:' : 'ws:';
        const wsUrl = `${prev}//${window.location.host}`;
        let streamUrl = '';

        if (sgModeApplied) {
            selectedVideo.includes(index)
                ? setSelectedVideo([-1, -1])
                : setSelectedVideo([index, -1]);

            if (protocol === 'frp') {
                setCtrPlayerModelData({
                    type: 'streamUrlList',
                    payload: selectedVideo.includes(index) ? [] : [url]
                });

                setCtrPlayerModelData({
                    type: 'playerLiveMode',
                    payload: [false, false]
                });
            }

            if (protocol === 'stream') {
                setCtrPlayerModelData({
                    type: 'playerLiveMode',
                    payload: [true, true]
                });

                if (selectedVideo.includes(index)) {
                    setCtrPlayerModelData({
                        type: 'streamUrlList',
                        payload: []
                    });
                } else {
                    const streamUrl = await obtainUrl(deviceId, startTime, endTime);
                    setCtrPlayerModelData({
                        type: 'streamUrlList',
                        payload: [streamUrl]
                    });
                }
            }
        } else {
            if (selectedVideo.includes(index)) {
                const newSelectedVideo = [...selectedVideo];
                const delIndex = selectedVideo.indexOf(index);

                newSelectedVideo.splice(delIndex, 1, -1);
                // 如果newSelectedVideo0号位是-1，1号位不是-1，就反转数组
                if (newSelectedVideo[0] === -1 && newSelectedVideo[1] !== -1) {
                    newSelectedVideo.reverse();
                }

                setSelectedVideo(newSelectedVideo);

                const newStreamUrlList = [...streamUrlList];
                if (protocol === 'frp') {
                    const delIndexInStreamUrlList = newStreamUrlList.findIndex((item) => item === url);
                    newStreamUrlList.splice(delIndexInStreamUrlList, 1);
                }

                if (protocol === 'stream') {
                    if (devLC) {
                        streamUrl = `ws://192.168.9.148${streamUrl}${token}`;
                        const delIndexInStreamUrlList = newStreamUrlList.findIndex((item) => item === streamUrl);
                        newStreamUrlList.splice(delIndexInStreamUrlList, 1);
                    } else if (devOL) {
                        streamUrl = `wss://lzz.enbo12119.com${streamUrl}${token}`;
                        const delIndexInStreamUrlList = newStreamUrlList.findIndex((item) => item === streamUrl);
                        newStreamUrlList.splice(delIndexInStreamUrlList, 1);
                    } else {
                        streamUrl = `${wsUrl}${streamUrl}${token}`;
                        const delIndexInStreamUrlList = newStreamUrlList.findIndex((item) => item === streamUrl);
                        newStreamUrlList.splice(delIndexInStreamUrlList, 1);
                    }
                }

                setCtrPlayerModelData({
                    type: 'streamUrlList',
                    payload: newStreamUrlList
                });
            } else {
                const newSelectedVideo = [...selectedVideo];
                const addIndex = selectedVideo.indexOf(-1);
                newSelectedVideo.splice(addIndex, 1, index);
                if (addIndex === -1) {
                    newSelectedVideo.splice(-1, 1, index);
                }
                setSelectedVideo(newSelectedVideo);

                const newStreamUrlList = [...streamUrlList];
                if (protocol === 'frp') {
                    if (newStreamUrlList.length < 2) {
                        newStreamUrlList.push(url);
                    } else {
                        newStreamUrlList.splice(-1, 1, url);
                    }

                    const newPlayerLiveMode = [...playerLiveMode] as [boolean, boolean];
                    if (addIndex === -1) {
                        newPlayerLiveMode.splice(-1, 1, false);
                    } else {
                        newPlayerLiveMode.splice(addIndex, 1, false);
                    }

                    setCtrPlayerModelData({
                        type: 'playerLiveMode',
                        payload: newPlayerLiveMode
                    });
                }

                if (protocol === 'stream') {
                    const streamUrl = await obtainUrl(deviceId, startTime, endTime);
                    if (newStreamUrlList.length < 2) {
                        newStreamUrlList.push(streamUrl);
                    } else {
                        newStreamUrlList.splice(-1, 1, streamUrl);
                    }

                    const newPlayerLiveMode = [...playerLiveMode] as [boolean, boolean];
                    if (addIndex === -1) {
                        newPlayerLiveMode.splice(-1, 1, true);
                    } else {
                        newPlayerLiveMode.splice(addIndex, 1, true);
                    }
                    setCtrPlayerModelData({
                        type: 'playerLiveMode',
                        payload: newPlayerLiveMode
                    });
                }

                setCtrPlayerModelData({
                    type: 'streamUrlList',
                    payload: newStreamUrlList
                });
            }
        }
    };

    useEffect(() => {
        if (setCtrPlayerModelData) {
            setCtrPlayerModelData({
                type: 'streamUrlList',
                payload: []
            });
        }
    }, []);

    useEffect(() => {
        if (deviceId === '') return;

        setLoading(true);
        obtainDeviceRecordingsList({
            id: deviceTypeCode === '4' ? deviceId : selectedCamera,
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
                item.start = item.startTime.slice(11, 16);
                item.end = item.endTime.slice(11, 16);
                // // todo: 临时处理
                // const random = Math.random();
                // item.url = random > 0.5
                //     ? 'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/prod/file/2021/08/31/540p.mp4'
                //     : 'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/test/file/2021/07/01/haiwang.mp4';
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

    useEffect(() => {
        if (sgModeApplied && !selectedVideo.includes(-1)) {
            const plyOEle = document.getElementById('ws-plyO') as HTMLVideoElement;
            const plyTEle = document.getElementById('ws-plyT') as HTMLVideoElement;

            if (plyOEle) {
                setSelectedVideo([-1, selectedVideo[1]]);
            }
            if (plyTEle) {
                setSelectedVideo([selectedVideo[0], -1]);

            }
        }
    }, [sgModeApplied]);

    useUpdateEffect(() => {
        setSelectedVideo(selectedVideo.reverse());
    }, [exchangePlayer]);

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
                            className={classes(cn, selectedVideo.includes(index) ? 'list-item-active' : 'list-item')}
                            onClick={() => clickHandler(item, index)}
                            key={index}
                        >
                            <span>{`${item.start}-${item.end}`}</span>
                            <span>{item.duration}</span>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default VideoListPanel;
