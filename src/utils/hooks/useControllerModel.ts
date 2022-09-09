import { useReducer } from 'react';

export interface ControllerModelState {
    controllerVisible: boolean;
    isController: boolean;
    isVideoList: boolean;
}

export const initialState: ControllerModelState = {
    controllerVisible: false,
    isController: false,
    isVideoList: false,
};

export interface ControllerVisibleActionType {
    type: 'controllerVisible';
    payload: ControllerModelState['controllerVisible'];
}

export interface IsControllerActionType {
    type: 'isController';
    payload: ControllerModelState['isController'];
}

export interface IsVideoListActionType {
    type: 'isVideoList';
    payload: ControllerModelState['isVideoList'];
}

export type MergeActionType =
    | ControllerVisibleActionType
    | IsControllerActionType
    | IsVideoListActionType;

export const useControllerModel = () => {
    const reducer = (state: ControllerModelState, action: MergeActionType) => {
        const { type, payload } = action;

        switch (type) {
            case 'controllerVisible':
                return { ...state, controllerVisible: payload };
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