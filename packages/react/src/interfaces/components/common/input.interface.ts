export type InputProps = {
    id: string;
    label?: string;
    name: string;
    value: string | number;
    type?: string;
    placeholder?: string;
    error?: string;
    icon?: React.ComponentType<{ className?: string }>;
    minLength?: number;
    maxLength?: number;
    inputClasses?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
