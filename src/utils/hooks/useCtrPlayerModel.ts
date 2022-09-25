import type { Feature, Position } from '@/types/ctrPlayer';
import type { ResizeHandle } from 'react-resizable';
import { useReducer } from 'react';
import type { Stream } from '@/types/ctrPlayer';

export interface CtrPlayerModelState {
    disableDrag: boolean;
    position: Position | null;
    resizeHandlesArr: ResizeHandle[];

    feature: Feature;
    streams: Stream[];

    sgModeApplied: boolean;
    dbModeApplied: boolean;
    pipModeApplied: boolean;
    streamUrlList: string[];
    playerWrapperEle: HTMLDivElement | null;
    isController: boolean,
    isVideoList: boolean,
    panelVisible: boolean,

    speed: number;
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
    sgModeApplied: true,
    dbModeApplied: false,
    pipModeApplied: false,
    streamUrlList: [],
    playerWrapperEle: null,
    isController: false,
    isVideoList: false,
    panelVisible: false,
    speed: 50,
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

export interface SgModeAppliedActionType {
    type: 'sgModeApplied';
    payload: CtrPlayerModelState['sgModeApplied'];
}

export interface DbModeAppliedActionType {
    type: 'dbModeApplied';
    payload: CtrPlayerModelState['dbModeApplied'];
}

export interface PipModeAppliedActionType {
    type: 'pipModeApplied';
    payload: CtrPlayerModelState['pipModeApplied'];
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

export type MergeActionType =
    | DisableDragActionType
    | PositionActionType
    | ResizeHandlesArrActionType
    | FeatureActionType
    | StreamsActionType
    | SgModeAppliedActionType
    | DbModeAppliedActionType
    | PipModeAppliedActionType
    | StreamUrlListActionType
    | PlayerWrapperEleActionType
    | IsControllerActionType
    | IsVideoListActionType
    | PanelVisibleActionType
    | SpeedActionType;

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
            case 'sgModeApplied':
                return { ...state, sgModeApplied: payload };
            case 'dbModeApplied':
                return { ...state, dbModeApplied: payload };
            case 'pipModeApplied':
                return { ...state, pipModeApplied: payload };
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
            default:
                return state;
        }
    };

    const [ctrPlayerModel, setCtrPlayerModelData] = useReducer(reducer, initialState);

    return { ctrPlayerModel, setCtrPlayerModelData };
};
