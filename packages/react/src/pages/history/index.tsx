import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { RaceItemProps } from '~/components/ui/historyRaceItem';
import ApiVehicleHandler from '~/api/race/api.race.handler';
import HistoryRaceList from '~/components/ui/historyRaceList';
import SearchBar from '~/components/common/searchBar';
import DatePicker from '~/components/common/datePicker';
import Alert from '~/components/feedback/alert';
import Loader from '~/components/feedback/loader';
import Button from '~/components/common/button';
import { FaSync } from 'react-icons/fa';
import './style.css';

function History() {
    const [races, setRaces] = useState<RaceItemProps[]>([]);
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'succeeded' | 'failed'
    >('idle');
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const isNavBarOpen = useSelector((state: RootState) => state.nav.isOpen);

    const loadRaces = async () => {
        setStatus('loading');
        setError(null);
        const { data, error } = await ApiVehicleHandler.getHistoryRace();

        if (error) {
            setError(error);
            setStatus('failed');
        } else {
            const racesArray = data?.data || [];
            setRaces(racesArray);
            console.log(
                'Races state after setting (inside loadRaces):',
                racesArray
            );
            setStatus('succeeded');
        }
    };

    useEffect(() => {
        loadRaces();
    }, []);

    const handleRaceDeleted = () => {
        loadRaces();
    };

    const filteredRaces = races.filter((race) => {
        const raceDate = new Date(race.start_time);
        const isWithinDateRange =
            (!startDate || raceDate >= new Date(startDate)) &&
            (!endDate || raceDate <= new Date(endDate));

        const matchesSearchTerm = race.name
            ? race.name.toLowerCase().includes(searchTerm.toLowerCase())
            : false;

        return isWithinDateRange && matchesSearchTerm;
    });

    const containerClass = isNavBarOpen
        ? 'content-page'
        : 'content-page-navBar-closed';

    return (
        <div className={`history-container ${containerClass}`}>
            {status === 'loading' && <Loader />}
            {error && <Alert type="error" message={error} duration={5000} />}
            <div className="history-filter">
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
                <Button
                    icon={FaSync}
                    onClick={loadRaces}
                    variant="primary"
                    outline={true}
                    className="refresh-button"
                />
            </div>
            {filteredRaces.length === 0 ? (
                <p className="no-data-message">
                    Aucune donnée disponible pour la période sélectionnée.
                </p>
            ) : (
                <HistoryRaceList
                    races={filteredRaces}
                    onRaceDeleted={handleRaceDeleted}
                />
            )}
        </div>
    );
}

export default History;
