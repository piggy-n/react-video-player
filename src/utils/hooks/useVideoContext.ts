import { createContext } from 'react';
import { initialState } from '@/utils/hooks/useVideoModel';
import type { Dispatch } from 'react';
import type { VideoModelState, MergeActionType } from '@/utils/hooks/useVideoModel';
import { PlayerProps } from '@/core/Player/type';

export interface VideoContextType extends PlayerProps {
    dispatch: Dispatch<MergeActionType>;
    videoModel: VideoModelState;
    videoEle: HTMLVideoElement | null;
    videoContainerEle: HTMLElement | null;
}

export const defaultValue: Partial<VideoContextType> = {
    videoModel: initialState,
    videoEle: null,
    videoContainerEle: null,
    isLive: true
};

export const VideoContext = createContext<VideoContextType>(<VideoContextType>defaultValue);