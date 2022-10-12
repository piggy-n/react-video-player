import { createContext } from 'react';
import type { Dispatch } from 'react';
import type { CtrPlayerModelState, MergeActionType } from '@/utils/hooks/useCtrPlayerModel';
import { initialState } from '@/utils/hooks/useCtrPlayerModel';
import { Position } from '@/types/ctrPlayer';

export interface CtrPlayerContextType {
    ctrPlayerModel: CtrPlayerModelState;
    setCtrPlayerModelData?: Dispatch<MergeActionType>;
    deviceId: string;
    deviceName?: string;
    deviceStatus?: boolean;
    onClose?: () => void;
    poster?: string;
    devLC?: boolean;
    devOL?: boolean;
    onlyRecord?: boolean;
    defaultPosition?: Position;
}

export const defaultValue: Partial<CtrPlayerContextType> = {
    ctrPlayerModel: initialState,
};

export const CtrPlayerContext = createContext<CtrPlayerContextType>(<CtrPlayerContextType>defaultValue);
