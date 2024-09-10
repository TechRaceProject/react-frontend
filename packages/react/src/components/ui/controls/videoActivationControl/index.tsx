import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Switch from '~/components/common/switch';
import { RootState } from '~/store/store';
import Button from '~/components/common/button';
import { setVehicleState } from '~/store/slices/vehicle_state.slice';
import { closeModal } from '~/store/slices/section.slice';

function VideoActivationControl() {
    const dispatch = useDispatch();
    const vehicleState = useSelector((state: RootState) => state.vehicle_state);
    const videoActivation = useSelector(
        (state: RootState) => state.vehicle_state.video_activated
    );
    const [isVideoActive, setIsVideoActive] = useState<number>(
        videoActivation || 0
    );

    useEffect(() => {
        if (videoActivation !== undefined) setIsVideoActive(videoActivation);
    }, [videoActivation]);

    const handleSwitchChange = () => {
        setIsVideoActive(isVideoActive === 0 ? 1 : 0);
    };

    const validate = () => {
        console.log('validate : ', isVideoActive);
        const payload = {
            ...vehicleState,
            video_activated: isVideoActive,
        };

        dispatch(setVehicleState(payload));
        dispatch(closeModal());
    };

    return (
        <>
            <Switch
                label="Activer"
                isChecked={isVideoActive === 1}
                onChange={handleSwitchChange}
            />
            <Button text="Enregistrer" onClick={validate} outline />
        </>
    );
}

export default VideoActivationControl;
