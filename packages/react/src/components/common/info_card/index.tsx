import './style.css';

import { FaCarBattery } from 'react-icons/fa6';
import { GiPathDistance } from 'react-icons/gi';
import { IoTime } from 'react-icons/io5';
import { TiWarning } from 'react-icons/ti';

type IconType = 'battery' | 'distance' | 'time' | 'warning';

interface InfoCardProps {
    icon: IconType;
    title: string;
    style?: React.CSSProperties;
    value: string | number;
}

export default function InfoCard({ icon, title, style, value }: InfoCardProps) {
    const getIcon = (icon: IconType) => {
        switch (icon) {
            case 'battery':
                return <FaCarBattery size={30} color="#5aa9e6" />; // soft blue
            case 'distance':
                return <GiPathDistance size={30} color="#9c27b0" />; // soft gray
            case 'time':
                return <IoTime size={30} color="#81c784" />; // soft green
            case 'warning':
                return <TiWarning size={30} color="#ffcc80" />; // soft orange
            default:
                return null;
        }
    };

    const getBackgroundColor = (icon: IconType) => {
        switch (icon) {
            case 'battery':
                return '#e0f4fc'; // lighter soft blue
            case 'distance':
                return '#f3e5f5'; // lighter soft gray
            case 'time':
                return '#dff7ec'; // lighter soft green
            case 'warning':
                return '#fff4e0'; // lighter soft orange
            default:
                return '#ffffff'; // white
        }
    };

    return (
        <div className="card" style={style}>
            <div
                className="card-icon"
                style={{ backgroundColor: getBackgroundColor(icon) }}
            >
                {getIcon(icon)}
            </div>

            <div className="card-content">
                <span className="card-title">{title}</span>
                <span className="card-value">{value}</span>
            </div>
        </div>
    );
}
