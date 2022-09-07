import { useReducer } from 'react';

export interface VideoModelState {
    controlled: boolean;
    isFullscreen: boolean;
    waiting: boolean;
    error: boolean;
    mime: string;
    transmissionRate: number;
}

export const initialState: VideoModelState = {
    controlled: false,
    isFullscreen: false,
    waiting: false,
    error: false,
    mime: '',
    transmissionRate: 0,
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

export interface ErrorActionType {
    type: 'error';
    payload: VideoModelState['error'];
}

export interface MimeActionType {
    type: 'mime';
    payload: VideoModelState['mime'];
}

export interface TransmissionRateActionType {
    type: 'transmissionRate';
    payload: VideoModelState['transmissionRate'];
}

export type MergeActionType =
    | ControlledActionType
    | IsFullscreenActionType
    | WaitingActionType
    | ErrorActionType
    | MimeActionType
    | TransmissionRateActionType;

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
            case 'error':
                return { ...state, error: payload };
            case 'mime':
                return { ...state, mime: payload };
            case 'transmissionRate':
                return { ...state, transmissionRate: payload };
            default:
                return state;
        }
    };

    const [videoModel, dispatch] = useReducer(reducer, initialState);

    return { videoModel, dispatch };
};