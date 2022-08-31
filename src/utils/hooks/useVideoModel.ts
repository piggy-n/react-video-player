import { useReducer } from 'react';

export interface VideoModelState {
    controlled: boolean;
    resizing: boolean;
}

export const initialState: VideoModelState = {
    controlled: false,
    resizing: false,
};

export interface ControlledActionType {
    type: 'controlled';
    payload: VideoModelState['controlled'];
}

export interface ResizingActionType {
    type: 'resizing';
    payload: VideoModelState['resizing'];
}

export type MergeActionType =
    | ControlledActionType
    | ResizingActionType;

export const useVideoModel = () => {
    const reducer = (state: VideoModelState, action: MergeActionType) => {
        const { type, payload } = action;

        switch (type) {
            case 'controlled':
                return { ...state, controlled: payload };
            case 'resizing':
                return { ...state, resizing: payload };
            default:
                return state;
        }
    };

    const [videoModel, dispatch] = useReducer(reducer, initialState);

    return { videoModel, dispatch };
};