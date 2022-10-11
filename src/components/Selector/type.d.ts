type Option = {
    label: string;
    value: string;
    url?: string;
}

export interface SelectorProps {
    value?: string[] | string;
    onChange?: (value: string[] | string) => void;
    options?: Option[];
    open?: boolean;
    onDropdownVisibleChange?: (open: boolean) => void;
    mode?: 'multiple' | 'tags';
}
