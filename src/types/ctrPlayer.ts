export type Position = {
    x: number;
    y: number;
}

export type Size = {
    width: number;
    height: number;
}

export type Feature = {
    stream: boolean,
    control: boolean,
    record: boolean,
}

export type Stream = {
    url: string,
    streamTypeCode: string,
    streamTypeDesc: string,
    channelDesc: string,
    channelCode: string,
    value: string,
    label: string,
}

export type Service = {
    serviceCode: string,
    serviceDesc: string,
}

export type Mode = 'single' | 'double' | 'pip';

export type PlayerOpts = {
    playerOneUrl?: string,
    playerTwoUrl?: string,
    isMainPlayer: 'plyO' | 'plyT',
    isPipModePlayer: 'neither' | 'plyO' | 'plyT',
}

export interface ControllablePlayerProps {
    deviceId: string;
    onClose?: () => void;
}
