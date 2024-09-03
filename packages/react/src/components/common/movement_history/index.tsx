import { useEffect, useState } from 'react';
import './style.css';
import { FaCarBattery } from 'react-icons/fa6';
import { VehicleHistoryInterface } from '@shared/interfaces/other/vehicle_history.interface';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import ApiVehicleHistory from '@shared/api/vehicle_history/vehicle_history.api';

export default function MovementHistory() {
    const [vehicleHistory, setVehicleHistory] = useState<
        VehicleHistoryInterface[]
    >([]);
    const token = useSelector((state: RootState) => state.auth.token);

    const fetchVehicleHistory = async () => {
        if (!token) {
            return;
        }

        const { data } = await ApiVehicleHistory.getAllVehicleHistories(token);

        if (data) {
            const vehicleHistory = data.data.reverse();
            setVehicleHistory(vehicleHistory);
        }
    };

    useEffect(() => {
        fetchVehicleHistory();
    }, []);

    return (
        <div className="movement-history-container">
            <span className="movement-history-title">
                Historique des commandes
            </span>

            <ul className="scrollable-list">
                {vehicleHistory.map((history, index) => (
                    <li className="movement-item" key={index}>
                        <FaCarBattery size={30} color="#5aa9e6" />

                        <div className="movement-text">
                            <span className="main-text">
                                {history.vehicle.name}
                            </span>
                            <span className="sub-text">{history.message}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
