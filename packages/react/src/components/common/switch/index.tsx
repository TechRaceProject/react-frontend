import { SwitchProps } from '~/interfaces/components/common/switch.interface';
import './style.css';

function Switch({ label, isChecked, onChange }: SwitchProps) {
    return (
        <div className="switch-container">
            <label htmlFor="switch-input" className="switch">
                <input
                    id="switch-input"
                    type="checkbox"
                    checked={isChecked}
                    onChange={onChange}
                />
                <span className="slider" />
            </label>
            <label htmlFor="switch-input" className="switch-label">
                {label}
            </label>
        </div>
    );
}

export default Switch;
