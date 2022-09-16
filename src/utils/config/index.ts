export const env = process.env.NODE_ENV;

export const prodApi = env === 'development' ? 'http://192.168.9.148/prod-api' : '/prod-api';