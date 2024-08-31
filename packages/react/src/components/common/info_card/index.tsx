import './style.css';

import Document from '~/assets/icons/document.png';
import Social from '~/assets/icons/social.png';
import Star from '~/assets/icons/star.png';
import Warning from '~/assets/icons/warning.png';

type IconType = 'document' | 'social' | 'star' | 'warning';

interface InfoCardProps {
    icon: IconType;
    title: string;
    value: string | number;
}

export default function index({ icon, title, value }: InfoCardProps) {

    const getIcon = (icon: IconType) => {
        switch (icon) {
            case 'document':
                return Document;
            case 'social':
                return Social;
            case 'star':
                return Star;
            case 'warning':
                return Warning;
        }
    }

    return (
        <div className="card">
            <div className="card-icon">
                <img src={getIcon(icon)} alt={`${icon} icon`} />
            </div>
            <div className="card-content">
                <span className="card-title">{title}</span>
                <span className="card-value">{value}</span>
            </div>
        </div>
    );
}
