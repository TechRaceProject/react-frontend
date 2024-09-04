import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import ApiRaceHandler from '~/api/race/api.race.handler';
import HistoryRaceTable from '~/components/ui/historyRaceTable';
import SearchBar from '~/components/common/searchBar';
import DatePicker from '~/components/common/datePicker';
import Alert from '~/components/feedback/alert';
import Loader from '~/components/feedback/loader';
import Button from '~/components/common/button';
import { FaSync } from 'react-icons/fa';
import './style.css';
import { HistoryRaceListProps } from '~/interfaces/other/race.interface';

function History() {
    const [races, setRaces] = useState<HistoryRaceListProps[]>([]);
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
        const { data, error } = await ApiRaceHandler.getHistoryRace();

        if (error) {
            setError(error);
            setStatus('failed');
        } else {
            const racesArray = data?.data || [];
            setRaces(racesArray);
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

        const startDateEndOfDay = startDate ? new Date(startDate) : null;
        const endDateEndOfDay = endDate ? new Date(endDate) : null;

        if (startDateEndOfDay) {
            startDateEndOfDay.setHours(0, 0, 0, 0);
        }

        if (endDateEndOfDay) {
            endDateEndOfDay.setHours(23, 59, 59, 999);
        }

        const isWithinDateRange =
            (!startDateEndOfDay || raceDate >= startDateEndOfDay) &&
            (!endDateEndOfDay || raceDate <= endDateEndOfDay);

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
                <HistoryRaceTable
                    races={filteredRaces}
                    onRaceDeleted={handleRaceDeleted}
                />
            )}
        </div>
    );
}

export default History;
