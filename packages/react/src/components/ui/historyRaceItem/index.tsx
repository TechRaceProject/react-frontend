import './style.css';
import { FaTrash } from 'react-icons/fa';
import Button from '~/components/common/button';
import { calculateDuration } from '~/utils/calculateDuration.utils';

export interface RaceItemProps {
    ID: number;
    start_time: string;
    end_time: string | null;
    distance_covered: number;
    status: string;
    out_of_parcours: number;
    name: string;
    onDelete: (id: number) => void;
}

function HistoryRaceItem({
    ID,
    start_time,
    end_time,
    distance_covered,
    status,
    out_of_parcours,
    name,
    onDelete,
}: RaceItemProps) {
    const getStatusInfo = () => {
        switch (status.toLowerCase()) {
            case 'not_started':
                return {
                    className: 'status-default',
                    text: 'Pas lancer',
                };
            case 'in_progress':
                return {
                    className: 'status-in-progress',
                    text: 'En Cours',
                };
            case 'completed':
                return {
                    className: 'status-success',
                    text: 'Fini',
                };
            default:
                return {
                    className: 'status-default',
                    text: 'Pas lancer',
                };
        }
    };

    const { className, text } = getStatusInfo();

    return (
        <div className="race-item" key={ID}>
            {name && <p className="race-item-name">{name}</p>}
            {start_time && (
                <p className="race-date">
                    {new Date(start_time).toLocaleDateString()}
                </p>
            )}
            {!distance_covered && (
                <p className="race-distance">{distance_covered} km</p>
            )}
            {!calculateDuration(start_time, end_time) && (
                <p className="race-duration">
                    {calculateDuration(start_time, end_time)}
                </p>
            )}
            {!out_of_parcours && (
                <p className="race-collisions">{out_of_parcours}</p>
            )}
            {status && (
                <p>
                    <span className={`race-status ${className}`}>{text}</span>
                </p>
            )}
            <p>
                <Button icon={FaTrash} onClick={() => onDelete(ID)} outline />
            </p>
        </div>
    );
}

export default HistoryRaceItem;
