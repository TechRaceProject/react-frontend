import HistoryRaceItem from '~/components/ui/historyRaceList';
import { HistoryRaceTableProps } from '~/interfaces/other/race.interface';
import ApiVehicleHandler from '~/api/race/api.race.handler';
import './style.css';

const headersList = [
    { field: 'name', label: 'Nom' },
    { field: 'date', label: 'Date' },
    { field: 'distance', label: 'Distance' },
    { field: 'duration', label: 'Durée' },
    { field: 'error', label: 'Hors parcours' },
    { field: 'collision_duration', label: 'Collision' },
    { field: 'average_speed', label: 'V. moyenne' },
    { field: 'status', label: 'Statut' },
];

function HistoryRaceTable({ races, onRaceDeleted }: HistoryRaceTableProps) {
    const handleDeleteRace = async (raceId: number) => {
        await ApiVehicleHandler.deleteRace(raceId);
        onRaceDeleted();
    };

    return (
        <div className="race-list">
            <div className="race-header">
                {headersList.map(({ field, label }) => (
                    <div key={field} className={`race-head-${field}`}>
                        <p>{label}</p>
                    </div>
                ))}
                <div className="race-head-action">
                    <p>Action</p>
                </div>
            </div>
            <div className="race-body">
                {races.map((race) => (
                    <HistoryRaceItem
                        key={race.ID}
                        {...race}
                        onDelete={handleDeleteRace}
                    />
                ))}
            </div>
        </div>
    );
}

export default HistoryRaceTable;
