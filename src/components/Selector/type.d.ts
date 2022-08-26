type Option = {
    label: string;
    value: string;
    url?: string;
}

export interface SelectorProps {
    value?: string[];
    onChange?: (value: string[]) => void;
    options?: Option[];
}