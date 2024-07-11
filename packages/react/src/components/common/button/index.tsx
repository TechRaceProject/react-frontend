import { ButtonProps } from '~/interfaces/components/common/button.interface';
import './style.css';

function Button({
    text,
    icon: Icon = undefined,
    onClick,
    submit = false,
    disabled = false,
}: ButtonProps) {

    return (
        <button
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={onClick}
            type={submit ? 'submit' : 'button'}
            disabled={disabled}
        >
            {text && <span>{text}</span>}
            {Icon && <Icon />}
        </button>
    );
}

export default Button;
