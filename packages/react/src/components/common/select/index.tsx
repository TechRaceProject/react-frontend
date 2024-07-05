import { useEffect, ChangeEvent } from 'react';
import { SelectProps } from '~/interfaces/components/common/select.interface';

function Select({
    id,
    label,
    onChange,
    options = [],
    name,
    value,
    selectClasses = 'select',
}: SelectProps) {
    useEffect(() => {
        if (options.length > 0 && !value && onChange) {
            const firstOption = options[0];
            onChange({
                target: {
                    name,
                    value: firstOption.value,
                },
                type: 'change',
            } as ChangeEvent<HTMLSelectElement>);
        }
    }, [options, value, name, onChange]);

    return (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            <select
                id={id}
                name={name}
                onChange={onChange}
                className={selectClasses}
                value={value}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;
