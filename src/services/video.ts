import type { Response } from '@/types/services';
import request from '@/utils/methods/request';

export const obtainDeviceStream: (params: {
    id: string;
}) => Promise<Response | undefined> = (
    {
        id,
    }
) => {
    return request(`/resource/device/${id}/service/stream`, {
        method: 'GET',
    });
};
