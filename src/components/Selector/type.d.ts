type Value = string | number | null;

type Option = {
    label: string;
    value: Value;
    url?: string;
}

export interface SelectorProps {
    value?: Value;
    onChange?: (value: Value) => void;
    options?: Option[];
}