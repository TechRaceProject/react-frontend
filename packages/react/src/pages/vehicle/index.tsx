import './style.css';
import { useEffect } from 'react';
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
import {
    setSelectedVehicle,
    setVehicles,
    setLoading,
    setError,
    setVehicleState,
} from '~/store/slices/vehicle.slice';
import Modal from '~/components/feedback/modal';
import ControlSection from '~/components/ui/controlSection';
import Select from '~/components/common/select';
import Button from '~/components/common/button';
import { FaSync } from 'react-icons/fa';
import ApiVehicleHandler from '~/api/vehicle/api.vehicle.handler';
import { VehicleStateData } from '~/interfaces/store/vehicle.interface';

function VehicleController() {
    const dispatch = useDispatch();
    const isNavBarOpen = useSelector((state: RootState) => state.nav.isOpen);
    const activeSection = useSelector(
        (state: RootState) => state.section.activeSection
    );
    const isModalOpen = useSelector(
        (state: RootState) => state.section.isModalOpen
    );
    const vehicles = useSelector((state: RootState) => state.vehicle.vehicles);
    const selectedVehicle = useSelector(
        (state: RootState) => state.vehicle.selectedVehicle
    );

    const fetchVehicles = async () => {
        dispatch(setLoading(true));
        const { data, error } = await ApiVehicleHandler.getVehicles();
        if (error) {
            dispatch(setError(error));
        } else if (data) {
            dispatch(setVehicles(data.data));

            if (data.data.length > 0) {
                const firstVehicleId = data.data[0].id;
                dispatch(setSelectedVehicle(firstVehicleId));

                handleVehicleChange({
                    target: { value: firstVehicleId.toString() },
                } as React.ChangeEvent<HTMLSelectElement>);
            }
        }
        dispatch(setLoading(false));
    };

    const handleSectionClick = (sectionName: string) => {
        dispatch(setActiveSection(sectionName));
        dispatch(openModal());
    };

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    const handleVehicleChange = async (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const vehicleId = Number(e.target.value);
        dispatch(setSelectedVehicle(vehicleId));

        dispatch(setLoading(true));
        const { data, error } =
            await ApiVehicleHandler.getVehicleState(vehicleId);

        if (error) {
            dispatch(setError(error));
        } else if (data) {
            dispatch(setVehicleState(data.data as VehicleStateData));
        }

        dispatch(setLoading(false));
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const containerClass = isNavBarOpen
        ? 'content-page'
        : 'content-page-navBar-closed';

    return (
        <div className={`vehicle-page ${containerClass}`}>
            <div className="vehicle-content">
                <div className="vehicle-select-refresh">
                    <div className="vehicle-select">
                        <Select
                            id="vehicle-select"
                            name="vehicle"
                            label="Choisir un véhicule"
                            options={vehicles.map((vehicle) => ({
                                value: vehicle.id.toString(),
                                label: vehicle.name,
                            }))}
                            value={selectedVehicle?.toString() || ''}
                            onChange={handleVehicleChange}
                        />
                    </div>
                    <Button
                        icon={FaSync}
                        onClick={fetchVehicles}
                        variant="primary"
                        outline={true}
                        className="refresh-button"
                    />
                </div>
                <div className="vehicle-image">
                    <img src={ImgCar} alt="Vehicle" />
                </div>
                <ButtonGroup
                    sections={controlSectionsData}
                    onSectionClick={handleSectionClick}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={
                    controlSectionsData.find(
                        (section) => section.name === activeSection
                    )?.label || ''
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
