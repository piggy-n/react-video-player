import { useReducer } from 'react';

export interface ProgressBarModelState {
    position: number;
    percentage: number;
    suspending: boolean;
    dragging: boolean;
}

export const initialState: ProgressBarModelState = {
    position: 0,
    percentage: 0,
    suspending: false,
    dragging: false,
};

export interface positionActionType {
    type: 'position';
    payload: ProgressBarModelState['position'];
}

export interface percentageActionType {
    type: 'percentage';
    payload: ProgressBarModelState['percentage'];
}

export interface suspendingActionType {
    type: 'suspending';
    payload: ProgressBarModelState['suspending'];
}

export interface draggingActionType {
    type: 'dragging';
    payload: ProgressBarModelState['dragging'];
}

export type MergeActionType =
    | positionActionType
    | percentageActionType
    | suspendingActionType
    | draggingActionType;

export const useProgressBarModel = () => {
    const reducer = (state: ProgressBarModelState, action: MergeActionType) => {
        const { type, payload } = action;

        switch (type) {
            case 'position':
                return { ...state, position: payload };
            case 'percentage':
                return { ...state, percentage: payload };
            case 'suspending':
                return { ...state, suspending: payload };
            case 'dragging':
                return { ...state, dragging: payload };
            default:
                return state;
        }
    };

    const [progressBarModel, dispatch] = useReducer(reducer, initialState);

    return { progressBarModel, dispatch };
};