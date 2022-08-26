import { useReducer } from 'react';

export interface VideoModelState {
    controlled: boolean;
}

export interface ControlledActionType {
    type: 'controlled';
    payload: VideoModelState['controlled'];
}

export type MergeActionType =
    | ControlledActionType

export const initialState: VideoModelState = {
    controlled: false,
};

export const useVideoModel = () => {
    const reducer = (state: VideoModelState, action: MergeActionType) => {
        const { type, payload } = action;

        switch (type) {
            case 'controlled':
                return { ...state, controlled: payload };
            default:
                return state;
        }
    };

    const [videoModel, dispatch] = useReducer(reducer, initialState);

    return { videoModel, dispatch };
};