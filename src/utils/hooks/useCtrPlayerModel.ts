import type { Position } from '@/types/video';
import type { ResizeHandle } from 'react-resizable';
import { useReducer } from 'react';

export interface CtrPlayerModelState {
    disableDrag: boolean;
    position: Position | null;
    resizeHandlesArr: ResizeHandle[];
}

export const initialState: CtrPlayerModelState = {
    disableDrag: true,
    position: null,
    resizeHandlesArr: ['se', 'e', 's'],
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

export type MergeActionType =
    | DisableDragActionType
    | PositionActionType
    | ResizeHandlesArrActionType;

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
            default:
                return state;
        }
    };

    const [ctrPlayerModel, setCtrPlayerModelData] = useReducer(reducer, initialState);

    return { ctrPlayerModel, setCtrPlayerModelData };
};
