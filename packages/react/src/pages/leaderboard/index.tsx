import { useEffect, useState } from 'react';
import ApiRaceHandler from '~/api/race/api.race.handler';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import PodiumItem from '~/components/ui/podiumItem';
import RankingItem from '~/components/ui/rankingItem';
import Select from '~/components/common/select';
import DatePicker from '~/components/common/datePicker';
import Button from '~/components/common/button';
import Alert from '~/components/feedback/alert';
import { FaSync } from 'react-icons/fa';
import { RankingProps } from '~/interfaces/other/ranking.interface';
import ProfileDefault from '~/assets/images/profile-default.svg';
import './style.css';

function Leaderboard() {
    const [ranking, setRaces] = useState<RankingProps[]>([]);
    const [vehicleFilter, setVehicleFilter] = useState('all');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredRaces, setFilteredRaces] = useState<RankingProps[]>([]);
    const [error, setError] = useState<string | null>(null);
    const isNavBarOpen = useSelector((state: RootState) => state.nav.isOpen);

    const fetchLeaderboardRace = async () => {
        const { data, error } = await ApiRaceHandler.getLeaderboardRace();
        if (data) {
            const formattedData = data.data.map((race: any) => ({
                ID: race.ID,
                position: 0,
                name: race.name,
                start_time: race.start_time,
                username: race.user.username,
                profilePicture: race.user.photo || ProfileDefault,
                vehicle: race.vehicle.name,
            }));
            setRaces(formattedData);
        }
        setError(error);
    };

    useEffect(() => {
        fetchLeaderboardRace();
    }, []);

    useEffect(() => {
        let filtered = ranking;

        if (vehicleFilter !== 'all') {
            filtered = filtered.filter(
                (race) => race.vehicle === vehicleFilter
            );
        }

        if (startDate) {
            filtered = filtered.filter(
                (race) => new Date(race.start_time) >= new Date(startDate)
            );
        }
        if (endDate) {
            filtered = filtered.filter(
                (race) => new Date(race.start_time) <= new Date(endDate)
            );
        }

        setFilteredRaces(filtered);
    }, [ranking, vehicleFilter, startDate, endDate]);

    const vehicleOptions = [
        { value: 'all', label: 'Tous' },
        ...Array.from(new Set(ranking.map((race) => race.vehicle))).map(
            (vehicle) => ({
                value: vehicle,
                label: vehicle,
            })
        ),
    ];

    const containerClass = isNavBarOpen
        ? 'content-page'
        : 'content-page-navBar-closed';

    return (
        <div className={`leaderboard-page ${containerClass}`}>
            {error && <Alert type="error" message={error} />}
            <div className="filters">
                <Select
                    id="vehicle-filter"
                    name="vehicle-filter"
                    label="Filtrer par Véhicule"
                    options={vehicleOptions}
                    value={vehicleFilter}
                    onChange={(e: { target: { value: string } }) =>
                        setVehicleFilter(e.target.value)
                    }
                />
                <DatePicker
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                />

                <Button
                    icon={FaSync}
                    onClick={fetchLeaderboardRace}
                    variant="primary"
                    outline={true}
                    className="refresh-button"
                />
            </div>
            <div className="podium">
                {filteredRaces.slice(0, 3).map((race, index) => (
                    <PodiumItem
                        key={race.ID}
                        position={index + 1}
                        name={race.name}
                        start_time={race.start_time}
                        username={race.username}
                        profilePicture={race.profilePicture}
                        vehicle={race.vehicle}
                    />
                ))}
            </div>
            <div className="rankings">
                {filteredRaces.slice(3, 10).map((race, index) => (
                    <RankingItem
                        key={race.ID}
                        position={index + 4}
                        name={race.name}
                        start_time={race.start_time}
                        username={race.username}
                        profilePicture={race.profilePicture}
                        vehicle={race.vehicle}
                    />
                ))}
            </div>
        </div>
    );
}

export default Leaderboard;
