import { useReducer } from 'react';

export interface ControllerModelState {
    controllerVisible: boolean;
    isController: boolean;
    isVideoList: boolean;
    speed: number;
    urlList: string[];
    isDoubleGrip: boolean;
    isPip: boolean;
}

export const initialState: ControllerModelState = {
    controllerVisible: false,
    isController: false,
    isVideoList: false,
    speed: 50,
    urlList: [],
    isDoubleGrip: false,
    isPip: false,
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

export interface SpeedActionType {
    type: 'speed';
    payload: ControllerModelState['speed'];
}

export interface UrlListActionType {
    type: 'urlList';
    payload: ControllerModelState['urlList'];
}

export interface IsDoubleGripActionType {
    type: 'isDoubleGrip';
    payload: ControllerModelState['isDoubleGrip'];
}

export interface IsPipActionType {
    type: 'isPip';
    payload: ControllerModelState['isPip'];
}

export type MergeActionType =
    | ControllerVisibleActionType
    | IsControllerActionType
    | IsVideoListActionType
    | SpeedActionType
    | UrlListActionType
    | IsDoubleGripActionType
    | IsPipActionType;

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
            case 'speed':
                return { ...state, speed: payload };
            case 'urlList':
                return { ...state, urlList: payload };
            case 'isDoubleGrip':
                return { ...state, isDoubleGrip: payload };
            case 'isPip':
                return { ...state, isPip: payload };
            default:
                return state;
        }
    };

    const [controllerModel, dispatch] = useReducer(reducer, initialState);

    return { controllerModel, dispatch };
};
