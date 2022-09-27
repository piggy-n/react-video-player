import { createContext } from 'react';
import type { Dispatch } from 'react';
import type { CtrPlayerModelState, MergeActionType } from '@/utils/hooks/useCtrPlayerModel';
import { initialState } from '@/utils/hooks/useCtrPlayerModel';

export interface CtrPlayerContextType {
    ctrPlayerModel: CtrPlayerModelState;
    setCtrPlayerModelData?: Dispatch<MergeActionType>;
    deviceId: string;
    onClose?: () => void;
}

export const defaultValue: Partial<CtrPlayerContextType> = {
    ctrPlayerModel: initialState,
};

export const CtrPlayerContext = createContext<CtrPlayerContextType>(<CtrPlayerContextType>defaultValue);
