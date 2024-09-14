import './style.css';

interface InputRangeProps {
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number;
    value: number;
    onChange: (value: number) => void;
}

function InputRange({
    min = 0,
    max = 100,
    step = 1,
    value,
    onChange,
}: InputRangeProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(event.target.value));
    };

    return (
        <div className="input-range-container">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                className="input-range"
            />
            <div className="value-indicator">{value}</div>
        </div>
    );
}

export default InputRange;
