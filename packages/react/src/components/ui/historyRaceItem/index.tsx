import './style.css';

export interface RaceItemProps {
    raceId: number;
    name: string;
    date: string;
    duration: string;
    distance: string;
    status: string;
}

function HistoryRaceItem({
    raceId,
    name,
    date,
    duration,
    distance,
    status,
}: RaceItemProps) {
    const getStatusClass = () => {
        switch (status.toLowerCase()) {
            case 'en cours':
                return 'status-in-progress';
            case 'effectué':
                return 'status-success';
            case 'refusé':
                return 'status-failed';
            default:
                return 'status-default';
        }
    };

    return (
        <tr className="race-item" key={raceId}>
            <td className="race-name">{name}</td>
            <td className="race-distance">{distance}</td>
            <td className="race-duration">{duration}</td>
            <td className="race-date">{new Date(date).toLocaleDateString()}</td>
            <td className={`race-status ${getStatusClass()}`}>{status}</td>
        </tr>
    );
}

export default HistoryRaceItem;
