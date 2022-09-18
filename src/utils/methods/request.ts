import { extend } from 'umi-request';

const request = extend({
    prefix: '/prod-api',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
    },
    credentials: 'include',
});

request.interceptors.request.use((url, options) => {
    if (options.body instanceof FormData) {
        if (options.headers) {
            if ('Content-Type' in options.headers) delete options.headers['Content-Type'];
            return {
                url,
                options,
            };
        }
    }
    return {
        url,
        options,
    };
});

export default request;
