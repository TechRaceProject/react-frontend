import { InputProps } from '~/interfaces/components/common/input.interface';
import './style.css';

function Input({
    id,
    label,
    name,
    value = '',
    type = 'text',
    placeholder,
    error,
    icon: Icon = undefined,
    minLength,
    maxLength,
    onChange,
}: InputProps) {
    return (
        <div className="input-container">
            {label && <label htmlFor={id}>{label}</label>}
            <div>
                {Icon && <Icon />}
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    minLength={minLength}
                    maxLength={maxLength}
                    onChange={onChange}
                    required
                />
            </div>
            {error && <small className="input-error-message">{error}</small>}
        </div>
    );
}

export default Input;
