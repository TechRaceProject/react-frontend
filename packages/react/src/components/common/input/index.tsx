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
        <div>
            {label && <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>}
            <div className="mt-2">
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
                className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
            {error && <small className="input-error-message">{error}</small>}
        </div>
    );
}

export default Input;
