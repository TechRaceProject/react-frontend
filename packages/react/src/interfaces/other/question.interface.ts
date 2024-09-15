export interface Question {
    id: string;
    label: string;
    name: string;
    type:
        | 'text'
        | 'password'
        | 'checkbox'
        | 'email'
        | 'number'
        | 'tel'
        | 'date'
        | 'month'
        | 'range'
        | 'switch'
        | 'select'
        | 'file';
    placeholder?: string;
    required?: boolean;
    icon?: React.ComponentType<{ className?: string }>;
    options?: Array<{ label: string; value: string }>;
    accept?: string;
}
