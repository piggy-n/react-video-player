import { createContext } from 'react';
import { initialState } from '@/utils/hooks/useVideoModel';
import type { Dispatch } from 'react';
import type { VideoModelState, MergeActionType } from '@/utils/hooks/useVideoModel';

export interface VideoContextType {
    dispatch: Dispatch<MergeActionType>;
    videoModel: VideoModelState;
}

export const defaultValue: Partial<VideoContextType> = {
    videoModel: initialState,
};

export const VideoContext = createContext<VideoContextType>(<VideoContextType>defaultValue);