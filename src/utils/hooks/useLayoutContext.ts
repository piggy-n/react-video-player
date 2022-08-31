import { createContext } from 'react';

export interface LayoutContextType {
    resizing: boolean;
    onMouseOver: (arg: boolean) => void;
}

export const defaultValue: Partial<LayoutContextType> = {
    resizing: false,
};

export const LayoutContext = createContext<LayoutContextType>(<LayoutContextType>defaultValue);