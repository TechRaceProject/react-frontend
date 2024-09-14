import './style.css';
import { useEffect, useState } from 'react';
import ImgCar from '~/assets/images/Freenove-Car.png';
import ButtonGroup from '~/components/ui/buttonGroup';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '~/store/store';
import { controlSectionsData } from '~/data/controlSections.data';
import {
    setActiveSection,
    openModal,
    closeModal,
} from '~/store/slices/section.slice';
import Modal from '~/components/feedback/modal';
import ControlSection from '~/components/ui/controlSection';
import Select from '~/components/common/select';
import Button from '~/components/common/button';
import { FaSync, FaSave } from 'react-icons/fa';
import ApiVehicleHandler from '~/api/vehicle/api.vehicle.handler';
import { VehicleInterface } from '@shared/interfaces/other/vehicle.interface';
import {
    resetVehicleState,
    setVehicleState,
    setVehicleStateBuzzerVariable,
    setVehicleStateHeadAngle,
    setVehicleStatePrimaryLedColors,
} from '~/store/slices/vehicle_state.slice';
import ApiVehiculeStateHandler from '~/api/vehicle_state/api.vehicule_state.handler';
import { VehicleStateInterface } from '~/interfaces/store/vehicle_state.interface';
import Alert from '~/components/feedback/alert';

function VehicleController() {
    const dispatch = useDispatch();
    const isNavBarOpen = useSelector((state: RootState) => state.nav.isOpen);
    const activeSection = useSelector(
        (state: RootState) => state.section.activeSection
    );
    const isModalOpen = useSelector(
        (state: RootState) => state.section.isModalOpen
    );
    const [vehicles, setVehicles] = useState<VehicleInterface[]>([]);
    const [selectedVehicle, setSelectedVehicle] =
        useState<VehicleInterface | null>(null);
    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            dispatch(resetVehicleState());
            const { data, error } = await ApiVehicleHandler.getVehicles();

            if (error) throw new Error(error);

            setVehicles(data.data || []);
            if (data.data.length > 0) {
                setSelectedVehicle(data.data[0]);
                await handleVehicleChange({
                    target: { value: data.data[0].id.toString() },
                } as React.ChangeEvent<HTMLSelectElement>);
                await getVehicleState(data.data[0].id);
            } else {
                setNotification({
                    type: 'error',
                    message: 'Aucun véhicule trouvé.',
                });
            }
        } catch {
            setNotification({
                type: 'error',
                message: 'Erreur lors du chargement des véhicules.',
            });
        }
    };

    const getVehicleState = async (vehicleId: number) => {
        try {
            const { data, error } =
                await ApiVehiculeStateHandler.getAllUserVehiculeState();
            if (error) throw new Error(error);

            const vehicleState = data.data.find(
                (state: VehicleStateInterface) => state.vehicle_id === vehicleId
            );
            if (vehicleState) {
                dispatch(setVehicleState(vehicleState));
                dispatch(
                    setVehicleStateBuzzerVariable(vehicleState.buzzer_variable)
                );
                dispatch(setVehicleStateHeadAngle(vehicleState.head_angle));
                if (vehicleState.primary_led_colors.length > 0) {
                    dispatch(
                        setVehicleStatePrimaryLedColors(
                            vehicleState.primary_led_colors
                        )
                    );
                }
            }
        } catch {
            setNotification({ type: 'error', message: ' ' });
        }
    };

    const handleVehicleChange = async (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const vehicleId = Number(e.target.value);
        const vehicle = vehicles.find((v) => v.id === vehicleId);

        if (!vehicle) return;

        setSelectedVehicle(vehicle);
        await getVehicleState(vehicleId);
    };

    const updateVehicleState = async () => {
        try {
            const { data, error } =
                await ApiVehiculeStateHandler.updateVehicleState();
            if (error) throw new Error(error);

            dispatch(setVehicleState(data.data));
            setNotification({
                type: 'success',
                message: 'Les modifications ont été enregistrées avec succès',
            });
            setTimeout(() => setNotification(null), 3000);
        } catch {
            setNotification({ type: 'error', message: ' ' });
        }
    };

    const handleSectionClick = (sectionName: string) => {
        dispatch(setActiveSection(sectionName));
        dispatch(openModal());
    };

    const handleCloseModal = () => dispatch(closeModal());

    const containerClass = isNavBarOpen
        ? 'content-page'
        : 'content-page-navBar-closed';

    return (
        <div className={`vehicle-page ${containerClass}`}>
            {notification && (
                <Alert
                    type={notification.type}
                    message={notification.message}
                    duration={5000}
                />
            )}

            <div className="vehicle-content">
                <div className="vehicle-filter">
                    <Select
                        id="vehicle-select"
                        name="vehicle"
                        label="Choisir un véhicule"
                        options={vehicles.map((v) => ({
                            value: v.id.toString(),
                            label: v.name,
                        }))}
                        value={selectedVehicle?.id.toString() || ''}
                        onChange={handleVehicleChange}
                    />
                    <Button
                        icon={FaSync}
                        onClick={fetchVehicles}
                        variant="primary"
                        outline={true}
                        className="refresh-button"
                    />
                    <Button
                        icon={FaSave}
                        onClick={updateVehicleState}
                        variant="success"
                        outline={true}
                        className="save-button"
                    />
                </div>

                <div className="vehicle-image">
                    <img src={ImgCar} alt="Vehicle" />
                </div>

                {vehicles.length > 0 ? (
                    <ButtonGroup
                        sections={controlSectionsData}
                        onSectionClick={handleSectionClick}
                    />
                ) : (
                    <p className="no-data-message">Aucun véhicule disponible</p>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={
                    controlSectionsData.find(
                        (section) => section.name === activeSection
                    )?.label || 'Section non disponible'
                }
                position="center"
            >
                {controlSectionsData.map((section) =>
                    section.name === activeSection ? (
                        <ControlSection key={section.name} section={section} />
                    ) : null
                )}
            </Modal>
        </div>
    );
}

export default VehicleController;
