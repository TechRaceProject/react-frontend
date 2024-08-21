import { useState, useEffect } from 'react';
import ApiRace from '~/api/race/race.api';
import HistoryRaceItem from '~/components/ui/historyRaceItem';
import { RaceItemProps } from '~/components/ui/historyRaceItem';
import SearchBar from '~/components/common/searchBar';
import DatePicker from '~/components/common/datePicker';
import Alert from '~/components/feedback/alert';
import './style.css';

function History() {
    const [races, setRaces] = useState<RaceItemProps[]>([]);
    const [filteredRaces, setFilteredRaces] = useState<RaceItemProps[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRaces = async () => {
            const response = await ApiRace.getHistoryRace();

            if (response.error) {
                setError(response.error);
                setRaces([]);
                setFilteredRaces([]);
            } else {
                setRaces(response.data || []);
                setFilteredRaces(response.data || []);
            }
        };

        fetchRaces();
    }, []);

    useEffect(() => {
        const filtered = races.filter((race: RaceItemProps) => {
            const raceDate = new Date(race.date);
            const isWithinDateRange =
                (!startDate || raceDate >= new Date(startDate)) &&
                (!endDate || raceDate <= new Date(endDate));
            const matchesSearchTerm = race.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            return isWithinDateRange && matchesSearchTerm;
        });

        setFilteredRaces(filtered);
    }, [searchTerm, startDate, endDate, races]);

    return (
        <div className="history-contenaire content-page">
            {error && <Alert type="error" message={error} duration={5000} />}

            <div className="history-filtre">
                <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />
                <DatePicker
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                />
            </div>

            <div className="race-list">
                {filteredRaces.map((race) => (
                    <HistoryRaceItem
                        key={race.raceId}
                        raceId={race.raceId}
                        name={race.name}
                        date={race.date}
                        duration={race.duration}
                        distance={race.distance}
                        status={race.status}
                    />
                ))}
            </div>
        </div>
    );
}

export default History;
