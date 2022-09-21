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

    singleGrid: boolean;
    doubleGrid: boolean;
    pictureInPicture: boolean;
    streamUrlList: string[];
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

export type MergeActionType =
    | DisableDragActionType
    | PositionActionType
    | ResizeHandlesArrActionType
    | FeatureActionType
    | StreamsActionType
    | SingleGridActionType
    | DoubleGridActionType
    | PictureInPictureActionType
    | StreamUrlListActionType;

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
            default:
                return state;
        }
    };

    const [ctrPlayerModel, setCtrPlayerModelData] = useReducer(reducer, initialState);

    return { ctrPlayerModel, setCtrPlayerModelData };
};
