import { useEffect, useState } from 'react';
import HistoryRaceItem from '~/components/ui/historyRaceItem';
import { RaceItemProps } from '~/components/ui/historyRaceItem';
import ApiVehicleHandler from '~/api/race/api.race.handler';
import './style.css';

interface HistoryRaceListProps {
    races: RaceItemProps[];
    onRaceDeleted: () => void;
}

function HistoryRaceList({ races, onRaceDeleted }: HistoryRaceListProps) {
    const [availableFields, setAvailableFields] = useState<string[]>([]);

    const handleDeleteRace = async (raceId: number) => {
        await ApiVehicleHandler.deleteRace(raceId);
        onRaceDeleted();
    };

    useEffect(() => {
        const fields = new Set<string>();

        races.forEach((race) => {
            if (race.start_time) fields.add('date');
            if (race.name) fields.add('name');
            if (race.distance_covered !== undefined) fields.add('distance');
            if (race.start_time && race.end_time) fields.add('duration');
            if (race.status) fields.add('status');
            if (race.out_of_parcours !== undefined) fields.add('collisions');
        });

        setAvailableFields(Array.from(fields));
    }, [races]);

    return (
        <div className="race-list">
            <div className="race-header">
                {availableFields.includes('name') && (
                    <p className="race-head-name">Name</p>
                )}
                {availableFields.includes('date') && <p>Date</p>}
                {availableFields.includes('distance') && <p>Distance (km)</p>}
                {availableFields.includes('duration') && <p>Durée (h:m:s)</p>}
                {availableFields.includes('collisions') && <p>Erreur</p>}
                {availableFields.includes('status') && <p>Statut</p>}
                <p>Action</p>
            </div>
            <div className="race-body">
                {races.map((race) => (
                    <HistoryRaceItem
                        key={race.ID}
                        ID={race.ID}
                        start_time={race.start_time}
                        end_time={race.end_time}
                        distance_covered={race.distance_covered}
                        status={race.status}
                        out_of_parcours={race.out_of_parcours}
                        name={race.name || `Course ${race.ID}`}
                        onDelete={handleDeleteRace}
                    />
                ))}
            </div>
        </div>
    );
}

export default HistoryRaceList;
