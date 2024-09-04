import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Select from '~/components/common/select';
import useVehicleStateUpdater from '~/hooks/useVehicleStateUpdater';
import { RootState } from '~/store/store';
import Button from '~/components/common/button';

const animationOptions = [
    { value: '0', label: 'Animation 0' },
    { value: '1', label: 'Animation 1' },
    { value: '2', label: 'Animation 2' },
    { value: '3', label: 'Animation 3' },
    { value: '4', label: 'Animation 4' },
    { value: '5', label: 'Animation 5' },
];

function LedAnimationControl() {
    const ledAnimation = useSelector(
        (state: RootState) => state.vehicle.vehicleState?.led_animation
    );
    const [selectedAnimation, setSelectedAnimation] = useState<string>(
        ledAnimation?.toString() || '0'
    );
    const updateVehicleState = useVehicleStateUpdater();

    useEffect(() => {
        if (ledAnimation !== undefined)
            setSelectedAnimation(ledAnimation.toString());
    }, [ledAnimation]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAnimation(e.target.value);
    };

    const handleSave = async () => {
        try {
            const payload = { led_animation: Number(selectedAnimation) };
            await updateVehicleState(payload);
        } catch (error) {
            console.error(
                "Erreur lors de la mise à jour de l'animation LED:",
                error
            );
        }
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
            <Button text="Sauvegarder" onClick={handleSave} outline />
        </>
    );
}

export default LedAnimationControl;
