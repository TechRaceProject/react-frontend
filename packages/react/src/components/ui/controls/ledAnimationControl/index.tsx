import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from '~/components/common/select';
import { RootState } from '~/store/store';
import Button from '~/components/common/button';
import { setVehicleState } from '~/store/slices/vehicle_state.slice';
import { closeModal } from '~/store/slices/section.slice';

const animationOptions = [
    { value: '0', label: 'Animation 0' },
    { value: '1', label: 'Animation 1' },
    { value: '2', label: 'Animation 2' },
    { value: '3', label: 'Animation 3' },
    { value: '4', label: 'Animation 4' },
    { value: '5', label: 'Animation 5' },
];

function LedAnimationControl() {
    const dispatch = useDispatch();
    const vehicleState = useSelector((state: RootState) => state.vehicle_state);
    const ledAnimation = useSelector(
        (state: RootState) => state.vehicle_state.led_animation
    );
    const [selectedAnimation, setSelectedAnimation] = useState<string>(
        ledAnimation?.toString() || '0'
    );

    useEffect(() => {
        if (ledAnimation !== undefined)
            setSelectedAnimation(ledAnimation.toString());
    }, [ledAnimation]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAnimation(e.target.value);
    };

    const validate = () => {
        const payload = {
            ...vehicleState,
            led_animation: Number(selectedAnimation),
        };

        dispatch(setVehicleState(payload));
        dispatch(closeModal());
    };

    return (
        <>
            <Select
                id="led-animation"
                name="ledAnimation"
                label="Animation"
                options={animationOptions}
                value={selectedAnimation}
                onChange={handleChange}
            />
            <Button text="Enregistrer" onClick={validate} outline />
        </>
    );
}

export default LedAnimationControl;
