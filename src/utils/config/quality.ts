export type qualityCnName = '标清' | '高清' | '超清' | '全高清' | '超高清';

export type qualityEnName = 'SD' | 'HD' | 'FHD' | 'QHD' | 'UHD';

export type qualityKey = '480P' | '720P' | '1080P' | '2k' | '4k';

export interface qualityListType {
    id: number;
    key: qualityKey;
    cnName: qualityCnName;
    enName: qualityEnName;
}

export const qualityList: qualityListType[] = [
    { cnName: '标清', key: '480P', enName: 'SD', id: 1 },
    { cnName: '高清', key: '720P', enName: 'HD', id: 2 },
    { cnName: '超清', key: '1080P', enName: 'FHD', id: 3 },
    { cnName: '全高清', key: '2k', enName: 'QHD', id: 4 },
    { cnName: '超高清', key: '4k', enName: 'UHD', id: 5 }
];