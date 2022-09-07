import { createContext } from 'react';
import { initialState } from '@/utils/hooks/useVideoModel';
import type { Dispatch } from 'react';
import type { VideoModelState, MergeActionType } from '@/utils/hooks/useVideoModel';
import type { PlayerProps } from '@/core/Player/type';
import type { VideoAttributes } from '@/types/video';

export interface VideoContextType extends Partial<PlayerProps> {
    dispatch: Dispatch<MergeActionType>;
    videoModel: VideoModelState;
    videoEle: HTMLVideoElement | null;
    videoContainerEle: HTMLElement | null;
    H265Player: any;
    videoAttributes: VideoAttributes;
}

export const defaultValue: Partial<VideoContextType> = {
    videoModel: initialState,
    videoEle: null,
    videoContainerEle: null,
};

export const VideoContext = createContext<VideoContextType>(<VideoContextType>defaultValue);