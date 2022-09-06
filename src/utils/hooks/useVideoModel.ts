import { useReducer } from 'react';

export interface VideoModelState {
    controlled: boolean;
    isFullscreen: boolean;
    waiting: boolean;
}

export const initialState: VideoModelState = {
    controlled: false,
    isFullscreen: false,
    waiting: false,
};

export interface ControlledActionType {
    type: 'controlled';
    payload: VideoModelState['controlled'];
}

export interface IsFullscreenActionType {
    type: 'isFullscreen';
    payload: VideoModelState['isFullscreen'];
}

export interface WaitingActionType {
    type: 'waiting';
    payload: VideoModelState['waiting'];
}

export type MergeActionType =
    | ControlledActionType
    | IsFullscreenActionType
    | WaitingActionType

export const useVideoModel = () => {
    const reducer = (state: VideoModelState, action: MergeActionType) => {
        const { type, payload } = action;

        switch (type) {
            case 'controlled':
                return { ...state, controlled: payload };
            case 'isFullscreen':
                return { ...state, isFullscreen: payload };
            case 'waiting':
                return { ...state, waiting: payload };
            default:
                return state;
        }
    };

    const [videoModel, dispatch] = useReducer(reducer, initialState);

    return { videoModel, dispatch };
};