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
    return request(`/resource/device/${id}/service/ptz/open`, {
        method: 'PUT',
        body: JSON.stringify({ lock: lock ? 'true' : 'false', time }),
    });
};

export const releaseControlAccess: (params: {
    id: string
}) => Promise<Response | undefined> = (
    { id }
) => {
    return request(`/resource/device/${id}/service/ptz/close`, {
        method: 'PUT',
    });
};

export const pushControlCommands: (params: {
    id: string;
    operation: string;
    speed: number;
}) => Promise<Response | undefined> = (
    {
        id,
        operation,
        speed,
    }
) => {
    return request(`/resource/device/${id}/service/ptz/move`, {
        method: 'PUT',
        body: JSON.stringify({ operation, speed }),
    });
};
