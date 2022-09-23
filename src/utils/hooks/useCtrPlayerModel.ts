import type { Feature, Mode, Position } from '@/types/ctrPlayer';
import type { ResizeHandle } from 'react-resizable';
import { useReducer } from 'react';
import type { Stream } from '@/types/ctrPlayer';

export interface CtrPlayerModelState {
    disableDrag: boolean;
    position: Position | null;
    resizeHandlesArr: ResizeHandle[];

    feature: Feature;
    streams: Stream[];

    singleGrid: boolean;
    doubleGrid: boolean;
    pictureInPicture: boolean;
    streamUrlList: string[];
    playerWrapperEle: HTMLDivElement | null;
    isController: boolean,
    isVideoList: boolean,
    panelVisible: boolean,

    speed: number;
    mode: Mode;
    prevMode: Mode;
}

export const initialState: CtrPlayerModelState = {
    disableDrag: true,
    position: null,
    resizeHandlesArr: ['se', 'e', 's'],
    feature: {
        stream: false,
        control: false,
        record: false,
    },
    streams: [],
    singleGrid: true,
    doubleGrid: false,
    pictureInPicture: false,
    streamUrlList: [],
    playerWrapperEle: null,
    isController: false,
    isVideoList: false,
    panelVisible: false,
    speed: 50,
    mode: 'single',
    prevMode: 'single',
};

export interface DisableDragActionType {
    type: 'disableDrag';
    payload: CtrPlayerModelState['disableDrag'];
}

export interface PositionActionType {
    type: 'position';
    payload: CtrPlayerModelState['position'];
}

export interface ResizeHandlesArrActionType {
    type: 'resizeHandlesArr';
    payload: CtrPlayerModelState['resizeHandlesArr'];
}

export interface FeatureActionType {
    type: 'feature';
    payload: CtrPlayerModelState['feature'];
}

export interface StreamsActionType {
    type: 'streams';
    payload: CtrPlayerModelState['streams'];
}

export interface SingleGridActionType {
    type: 'singleGrid';
    payload: CtrPlayerModelState['singleGrid'];
}

export interface DoubleGridActionType {
    type: 'doubleGrid';
    payload: CtrPlayerModelState['doubleGrid'];
}

export interface PictureInPictureActionType {
    type: 'pictureInPicture';
    payload: CtrPlayerModelState['pictureInPicture'];
}

export interface StreamUrlListActionType {
    type: 'streamUrlList';
    payload: CtrPlayerModelState['streamUrlList'];
}

export interface PlayerWrapperEleActionType {
    type: 'playerWrapperEle';
    payload: CtrPlayerModelState['playerWrapperEle'];
}

export interface IsControllerActionType {
    type: 'isController';
    payload: CtrPlayerModelState['isController'];
}

export interface IsVideoListActionType {
    type: 'isVideoList';
    payload: CtrPlayerModelState['isVideoList'];
}

export interface PanelVisibleActionType {
    type: 'panelVisible';
    payload: CtrPlayerModelState['panelVisible'];
}

export interface SpeedActionType {
    type: 'speed';
    payload: CtrPlayerModelState['speed'];
}

export interface ModeActionType {
    type: 'mode';
    payload: CtrPlayerModelState['mode'];
}

export interface PrevModeActionType {
    type: 'prevMode';
    payload: CtrPlayerModelState['prevMode'];
}

export type MergeActionType =
    | DisableDragActionType
    | PositionActionType
    | ResizeHandlesArrActionType
    | FeatureActionType
    | StreamsActionType
    | SingleGridActionType
    | DoubleGridActionType
    | PictureInPictureActionType
    | StreamUrlListActionType
    | PlayerWrapperEleActionType
    | IsControllerActionType
    | IsVideoListActionType
    | PanelVisibleActionType
    | SpeedActionType
    | ModeActionType
    | PrevModeActionType;

export const useCtrPlayerModel = () => {
    const reducer = (state: CtrPlayerModelState, action: MergeActionType) => {
        const { type, payload } = action;

        switch (type) {
            case 'disableDrag':
                return { ...state, disableDrag: payload };
            case 'position':
                return { ...state, position: payload };
            case 'resizeHandlesArr':
                return { ...state, resizeHandlesArr: payload };
            case 'feature':
                return { ...state, feature: payload };
            case 'streams':
                return { ...state, streams: payload };
            case 'singleGrid':
                return { ...state, singleGrid: payload };
            case 'doubleGrid':
                return { ...state, doubleGrid: payload };
            case 'pictureInPicture':
                return { ...state, pictureInPicture: payload };
            case 'streamUrlList':
                return { ...state, streamUrlList: payload };
            case 'playerWrapperEle':
                return { ...state, playerWrapperEle: payload };
            case 'isController':
                return { ...state, isController: payload };
            case 'isVideoList':
                return { ...state, isVideoList: payload };
            case 'panelVisible':
                return { ...state, panelVisible: payload };
            case 'speed':
                return { ...state, speed: payload };
            case 'mode':
                return { ...state, mode: payload };
            case 'prevMode':
                return { ...state, prevMode: payload };
            default:
                return state;
        }
    };

    const [ctrPlayerModel, setCtrPlayerModelData] = useReducer(reducer, initialState);

    return { ctrPlayerModel, setCtrPlayerModelData };
};
