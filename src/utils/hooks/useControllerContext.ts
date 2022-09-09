import type { Dispatch } from 'react';
import { createContext } from 'react';
import type { ControllerModelState, MergeActionType } from '@/utils/hooks/useControllerModel';
import { initialState } from '@/utils/hooks/useControllerModel';

export interface ControllerContextType {
    dispatch: Dispatch<MergeActionType>;
    controllerModel: ControllerModelState;
}

export const defaultValue: Partial<ControllerContextType> = {
    controllerModel: initialState
};

export const ControllerContext = createContext<ControllerContextType>(<ControllerContextType>defaultValue);