export type QualityCnName = '标清' | '高清' | '超清' | '全高清' | '超高清';

export type QualityEnName = 'SD' | 'HD' | 'FHD' | 'QHD' | 'UHD';

export type QualityKey = '480P' | '720P' | '1080P' | '2k' | '4k';

export interface QualityType {
    key: QualityKey;
    cnName: QualityCnName;
    enName: QualityEnName;
}

export const qualityObj: Record<QualityEnName, QualityType> = {
    SD: { cnName: '标清', key: '480P', enName: 'SD' },
    HD: { cnName: '高清', key: '720P', enName: 'HD' },
    FHD: { cnName: '超清', key: '1080P', enName: 'FHD' },
    QHD: { cnName: '全高清', key: '2k', enName: 'QHD' },
    UHD: { cnName: '超高清', key: '4k', enName: 'UHD' },
};