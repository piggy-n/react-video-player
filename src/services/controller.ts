import type { Response } from '@/types/services';
import request from '@/utils/methods/request';

export const obtainControlAccess: (params: {
    id: string;
    lock?: boolean;
    time?: number;
}) => Promise<Response | undefined> = (
    {
        id,
        lock,
        time,
    }
) => {
    return request(`/resource/device/${id}/service/ptz/open?lock=${lock}&time=${time}`, {
        method: 'PUT',
    });
};