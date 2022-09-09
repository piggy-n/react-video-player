import { useReducer } from 'react';

export interface ControllerModelState {
    isController: boolean;
    isVideoList: boolean;
}

export const initialState: ControllerModelState = {
    isController: false,
    isVideoList: false,
};

export interface isControllerActionType {
    type: 'isController';
    payload: ControllerModelState['isController'];
}

export interface isVideoListActionType {
    type: 'isVideoList';
    payload: ControllerModelState['isVideoList'];
}

export type MergeActionType =
    | isControllerActionType
    | isVideoListActionType;

export const useControllerModel = () => {
    const reducer = (state: ControllerModelState, action: MergeActionType) => {
        const { type, payload } = action;

        switch (type) {
            case 'isController':
                return { ...state, isController: payload };
            case 'isVideoList':
                return { ...state, isVideoList: payload };
            default:
                return state;
        }
    };

    const [controllerModel, dispatch] = useReducer(reducer, initialState);

    return { controllerModel, dispatch };
};