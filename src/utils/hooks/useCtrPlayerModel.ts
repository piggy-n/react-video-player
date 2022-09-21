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

export type MergeActionType =
    | DisableDragActionType
    | PositionActionType
    | ResizeHandlesArrActionType
    | FeatureActionType
    | StreamsActionType;

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
            default:
                return state;
        }
    };

    const [ctrPlayerModel, setCtrPlayerModelData] = useReducer(reducer, initialState);

    return { ctrPlayerModel, setCtrPlayerModelData };
};
