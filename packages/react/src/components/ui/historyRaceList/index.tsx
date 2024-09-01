import './style.css';
import { FaTrash } from 'react-icons/fa';
import Button from '~/components/common/button';
import { calculateDuration } from '~/utils/calculateDuration.utils';
import {
    HistoryRaceListProps,
    StatusType,
} from '~/interfaces/other/race.interface';
import HistoryRaceField from '~/components/ui/historyRaceField';

const statusMap: Record<StatusType, { className: string; text: string }> = {
    not_started: { className: 'status-default', text: 'à venir' },
    in_progress: { className: 'status-in-progress', text: 'en cours' },
    completed: { className: 'status-success', text: 'terminé' },
};

function HistoryRaceItem({
    ID,
    start_time,
    end_time,
    distance_covered,
    average_speed,
    collision_duration,
    status = 'not_started',
    out_of_parcours,
    name,
    onDelete,
}: HistoryRaceListProps) {
    const currentStatus =
        statusMap[status as StatusType] || statusMap['not_started'];

    const fields = [
        { value: name || 'Not available' },
        {
            value: start_time
                ? new Date(start_time).toLocaleDateString('fr-FR')
                : 'Not available',
        },
        { value: distance_covered, unit: 'm' },
        {
            value:
                start_time && end_time
                    ? calculateDuration(start_time, end_time)
                    : 'Not available',
        },
        { value: out_of_parcours, unit: 's' },
        { value: collision_duration, unit: 's' },
        { value: average_speed, unit: 'm/s' },
    ];

    return (
        <div className="race-item">
            {fields.map((field, index) => (
                <HistoryRaceField
                    key={index}
                    value={field.value}
                    unit={field.unit}
                />
            ))}
            <div className="race-item-field">
                <p className={`race-status ${currentStatus.className}`}>
                    {currentStatus.text}
                </p>
            </div>
            <div className="race-item-field">
                <Button icon={FaTrash} onClick={() => onDelete(ID)} outline />
            </div>
        </div>
    );
}

export default HistoryRaceItem;
