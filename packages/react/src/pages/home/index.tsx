import { useContext, useEffect, useState } from 'react';
import './style.css';
import VideoFeed from '~/assets/images/placeholders/video_feed.png';
import FreenoveVehicle from '~/assets/images/placeholders/freenove_vehicle.jpg';
import InfoCard from '~/components/common/info_card';
import MovementHistory from '~/components/common/movement_history';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { RaceInterface } from '@shared/interfaces/other/race.interface';
import ApiRace from '@shared/api/race/race.api';
import { AuthContext } from '~/context/auth.context';
import Chart, {
    PieChartProps,
    SimpleColumnChartProps,
} from '~/components/charts';

export default function Home() {
    const [races, setRaces] = useState<RaceInterface[]>([]);
    const token = useSelector((state: RootState) => state.auth.token);
    const userId = useContext(AuthContext).user.id;

    const fetchRaces = async () => {
        if (!token || !userId) {
            return;
        }

        const { data } = await ApiRace.getAllUserRaces(userId, token);

        if (data) {
            setRaces(data.data);
        }
    };

    useEffect(() => {
        fetchRaces();
    }, [token]);

    const getDurationInMilliseconds = (
        startTime: string,
        endTime: string
    ): number => {
        const start = new Date(startTime).getTime();
        const end = new Date(endTime).getTime();
        return end - start;
    };

    const getAverageRaceDuration = (): string => {
        const totalDuration = races
            .filter((race) => race.end_time !== null)
            .reduce((accumulator: number, race: RaceInterface) => {
                return (
                    accumulator +
                    getDurationInMilliseconds(
                        race.start_time,
                        race.end_time as string
                    )
                );
            }, 0);

        const averageDuration =
            races.length > 0 ? totalDuration / races.length : 0;

        const result = averageDuration / 60000;

        const hours = Math.floor(result / 60);
        const minutes = Math.floor(result % 60);
        const seconds = Math.round(((result % 60) - minutes) * 60);

        if (hours >= 1) {
            return `${hours} heure${hours > 1 ? 's' : ''}, ${minutes} min${minutes > 1 ? 's' : ''} et ${seconds} sec${seconds > 1 ? 's' : ''}`;
        }

        if (minutes > 0) {
            return `${minutes} min${minutes > 1 ? 's' : ''} et ${seconds} sec${seconds > 1 ? 's' : ''}`;
        }

        return `${seconds} sec${seconds > 1 ? 's' : ''}`;
    };

    const getTotalRacesDuration = (): string => {
        const totalDuration = races.reduce(
            (accumulator: number, race: RaceInterface) => {
                return (
                    accumulator +
                    getDurationInMilliseconds(
                        race.start_time,
                        race.end_time as string
                    )
                );
            },
            0
        );

        const totalMinutes = totalDuration / 60000;

        const hours = Math.floor(totalMinutes / 60);
        const minutes = Math.floor(totalMinutes % 60);
        const seconds = Math.round(((totalMinutes % 60) - minutes) * 60);

        if (hours >= 1) {
            return `${hours} heure${hours > 1 ? 's' : ''}, ${minutes} min${minutes > 1 ? 's' : ''} et ${seconds} sec${seconds > 1 ? 's' : ''}`;
        }

        if (minutes > 0) {
            return `${minutes} min${minutes > 1 ? 's' : ''} et ${seconds} sec${seconds > 1 ? 's' : ''}`;
        }

        return `${seconds} sec${seconds > 1 ? 's' : ''}`;
    };

    const getTotalCoveredDistance = (): string => {
        const totalDistance = races.reduce((sum, race) => {
            return sum + race.distance_covered;
        }, 0);

        if (totalDistance <= 1) {
            return `${totalDistance} mètre`;
        }

        return `${totalDistance} mètres`;
    };

    const getTotalCollisionDuration = (): string => {
        const totalCollisionDuration = races.reduce(
            (sum: number, race: RaceInterface) => {
                return sum + race.collision_duration;
            },
            0
        );

        const hours = Math.floor(totalCollisionDuration / 3600);
        const minutes = Math.floor((totalCollisionDuration % 3600) / 60);
        const seconds = totalCollisionDuration % 60;

        if (hours > 0) {
            return `${hours} heure${hours > 1 ? 's' : ''}, ${minutes} min${minutes > 1 ? 's' : ''} et ${seconds} sec${seconds > 1 ? 's' : ''}`;
        }

        if (minutes > 0) {
            return `${minutes} min${minutes > 1 ? 's' : ''} et ${seconds} sec${seconds > 1 ? 's' : ''}`;
        }

        return `${seconds} sec${seconds > 1 ? 's' : ''}`;
    };

    const getRaceTypePieChartOptions = (): PieChartProps => {
        const autoModeRaceY =
            (races.filter((race: RaceInterface) => race.type === 'auto')
                .length /
                races.length) *
            100;
        const manualModeRaceY =
            (races.filter((race: RaceInterface) => race.type === 'manual')
                .length /
                races.length) *
            100;

        const raceTypePieChartOptions: PieChartProps = {
            options: {
                animationEnabled: true,
                exportEnabled: false,
                theme: 'light1',
                data: [
                    {
                        type: 'pie',
                        indexLabel: '{label}: {y}%',
                        startAngle: -90,
                        dataPoints: [
                            {
                                y: Number(autoModeRaceY.toFixed(2)),
                                label: 'Auto',
                            },
                            {
                                y: Number(manualModeRaceY.toFixed(2)),
                                label: 'Manuel',
                            },
                        ],
                    },
                ],
            },
        };

        return raceTypePieChartOptions;
    };

    const getLastRacesAverageSpeedSimpleLineChartOptions =
        (): SimpleColumnChartProps => {
            const lastRaces = races.slice(-5);

            const dataPoints = lastRaces.map((race: RaceInterface) => {
                return {
                    label: new Date(race.start_time).toLocaleDateString(),
                    y: race.average_speed,
                };
            });

            const simpleColumnOption: SimpleColumnChartProps = {
                options: {
                    data: [
                        {
                            type: 'column',
                            indexLabel: '{y}',
                            dataPoints: dataPoints,
                        },
                    ],
                },
            };

            return simpleColumnOption;
        };

    return (
        <div className="dashboard-container">
            <div className="dashboard">
                <div className="dashboard-top-section">
                    <div className="dashboard-video-feed">
                        <img src={VideoFeed} alt="video feed placeholder" />
                    </div>

                    <div className="dashboard-movement-history-and-covered-distance">
                        <div className="dashboard-movement-history">
                            <MovementHistory />
                        </div>

                        <div
                            className="dashboard-covered-distance"
                            style={{ marginTop: '1rem' }}
                        >
                            <InfoCard
                                icon="distance"
                                title="Distance parcourue"
                                value={getTotalCoveredDistance()}
                                style={{ border: 'none', boxShadow: 'none' }}
                            />
                        </div>
                    </div>
                </div>

                <div className="dashboard-info-cards">
                    <InfoCard
                        icon="battery"
                        title="Autonomie du véhicule"
                        value="85%"
                    />
                    <InfoCard
                        icon="time"
                        title="Durée moyenne de vos courses"
                        value={getAverageRaceDuration()}
                    />
                    <InfoCard
                        icon="time"
                        title="Durée cumulée de vos courses"
                        value={getTotalRacesDuration()}
                    />
                    <InfoCard
                        icon="warning"
                        title="Temps passé en collision"
                        value={getTotalCollisionDuration()}
                    />
                </div>

                <div className="dashboard-charts-section">
                    <div className="dashboard-chart">
                        <span>Répartition des types de courses</span>
                        <Chart
                            options={getRaceTypePieChartOptions()}
                            width="80%"
                            height="80%"
                        />
                    </div>

                    <div className="dashboard-chart">
                        <span>Vitesse moyenne sur vos dernières courses</span>
                        <Chart
                            options={getLastRacesAverageSpeedSimpleLineChartOptions()}
                        />
                    </div>

                    <div className="dashboard-vehicle-image">
                        <img
                            src={FreenoveVehicle}
                            alt="freenove esp32 vehicle image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
