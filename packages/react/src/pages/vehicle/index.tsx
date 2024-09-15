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
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const fetchVehicles = async () => {
        dispatch(resetVehicleState());
        setError(null);

        const { data, error } = await ApiVehicleHandler.getVehicles();

        if (error) {
            setError(error);
            return;
        }

        if (data) {
            setVehicles(data.data as VehicleInterface[]);

            if (data.data.length > 0) {
                setSelectedVehicle(data.data[0]);

                handleVehicleChange({
                    target: { value: data.data[0].id.toString() },
                } as React.ChangeEvent<HTMLSelectElement>);

                await getVehicleVehicleState(data.data[0].id);
            }
        }
    };

    const updateVehicleState = async () => {
        const { data, error } =
            await ApiVehiculeStateHandler.updateVehicleState();

        if (error) {
            setError(error);
            return;
        }

        if (data) {
            setVehicleState(data.data);
        }

        setSuccess('Les modifications ont été enregistrées avec succès');

        setTimeout(() => {
            setSuccess(null);
        }, 3000);
    };

    const handleVehicleChange = async (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        dispatch(resetVehicleState());
        const vehicleId = Number(e.target.value);
        const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);

        if (!vehicle) {
            return;
        }

        setSelectedVehicle(vehicle);

        await getVehicleVehicleState(vehicleId);
    };

    const getVehicleVehicleState = async (vehicleId: number) => {
        const { data, error } =
            await ApiVehiculeStateHandler.getAllUserVehiculeState();

        if (error) {
            setError(error);
            return;
        }

        if (data) {
            const vehicleState = data.data.find(
                (vehicleState: VehicleStateInterface) =>
                    vehicleState.vehicle_id === vehicleId
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
        }
    };

    const handleSectionClick = (sectionName: string) => {
        dispatch(setActiveSection(sectionName));
        dispatch(openModal());
    };

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const containerClass = isNavBarOpen
        ? 'content-page'
        : 'content-page-navBar-closed';

    return (
        <div className={`vehicle-page ${containerClass}`}>
            {error && <Alert type="error" message={error} duration={5000} />}
            {success && (
                <Alert type="success" message={success} duration={3000} />
            )}

            <div className="vehicle-content">
                <div className="vehicle-filter">
                    <div className="vehicle-select">
                        <Select
                            id="vehicle-select"
                            name="vehicle"
                            label="Choisir un véhicule"
                            options={vehicles.map(
                                (vehicle: VehicleInterface) => ({
                                    value: vehicle.id.toString(),
                                    label: vehicle.name,
                                })
                            )}
                            value={selectedVehicle?.id.toString() || ''}
                            onChange={handleVehicleChange}
                        />
                    </div>

                    <div className="vehicle-buttons">
                        <Button
                            icon={FaSync}
                            onClick={fetchVehicles}
                            variant="primary"
                            outline={true}
                            className="refresh-button"
                        />
                        <Button
                            onClick={updateVehicleState}
                            icon={FaSave}
                            variant="success"
                            outline={true}
                        />
                    </div>
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
