import React from 'react';
import './style.css';

interface FileInputProps {
    id: string;
    label: string;
    name?: string;
    icon?: React.ComponentType<{ className?: string }>;
    accept?: string;
    required?: boolean;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({
    id,
    label,
    name,
    icon: Icon,
    accept = '*',
    required = false,
    error,
    onChange,
}) => {
    return (
        <div className="file-input-container">
            {label && <label htmlFor={id}>{label}</label>}
            <div className="file-input-wrapper">
                {Icon && <Icon className="file-input-icon" />}
                <input
                    type="file"
                    id={id}
                    name={name}
                    accept={accept}
                    onChange={onChange}
                    required={required}
                    className="file-input-field"
                />
            </div>
            {error && <small className="input-error-message">{error}</small>}
        </div>
    );
};

export default FileInput;
