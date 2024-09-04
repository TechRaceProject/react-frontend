import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Switch from '~/components/common/switch';
import useVehicleStateUpdater from '~/hooks/useVehicleStateUpdater';
import { RootState } from '~/store/store';
import Button from '~/components/common/button';

function VideoActivationControl() {
    const videoActivation = useSelector(
        (state: RootState) => state.vehicle.vehicleState?.video_activated
    );
    const [isVideoActive, setIsVideoActive] = useState<number>(
        videoActivation || 0
    );
    const updateVehicleState = useVehicleStateUpdater();

    useEffect(() => {
        if (videoActivation !== undefined) setIsVideoActive(videoActivation);
    }, [videoActivation]);

    const handleSwitchChange = () => {
        setIsVideoActive(isVideoActive === 0 ? 1 : 0);
    };

    const handleSave = async () => {
        try {
            const payload = { video_activated: isVideoActive };
            await updateVehicleState(payload);
        } catch (error) {
            console.error(
                "Erreur lors de la mise à jour de l'activation vidéo:",
                error
            );
        }
    };

    return (
        <>
            <Switch
                label="Activer"
                isChecked={isVideoActive === 1}
                onChange={handleSwitchChange}
            />
            <Button text="Sauvegarder" onClick={handleSave} outline />
        </>
    );
}

export default VideoActivationControl;
