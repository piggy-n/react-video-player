import { createContext } from 'react';

export interface LayoutContextType {
    onMouseOver?: (arg: boolean) => void;
    onWebFullScreen?: (arg: boolean) => void;
}

export const defaultValue: Partial<LayoutContextType> = {
};

export const LayoutContext = createContext<LayoutContextType>(<LayoutContextType>defaultValue);
