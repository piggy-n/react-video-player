import { createContext } from 'react';

export interface LayoutContextType {
    resizing: boolean;
    controllerVisible: boolean;
    onMouseOver?: (arg: boolean) => void;
    onWebFullScreen?: (arg: boolean) => void;
    onControllerVisibleChange?: (arg: boolean) => void;
}

export const defaultValue: Partial<LayoutContextType> = {
    resizing: false,
    controllerVisible: false,
};

export const LayoutContext = createContext<LayoutContextType>(<LayoutContextType>defaultValue);