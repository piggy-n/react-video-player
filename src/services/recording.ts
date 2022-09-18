import request from '@/utils/methods/request';
import type { Response } from '@/types/services';

export const obtainDeviceRecordingsList: (params: {
    id: string;
    channelId?: string;
    startTime?: string;
    endTime?: string;
    page?: number;
    pageSize?: number;
}) => Promise<Response | undefined> = (
    {
        id,
        ...rest
    }
) => {
    return request(`/resource/device/${id}/service/video/record`, {
        method: 'GET',
        params: {
            ...rest,
        },
    });
};
