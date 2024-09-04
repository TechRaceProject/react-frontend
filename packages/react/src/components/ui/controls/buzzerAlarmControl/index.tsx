import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Switch from '~/components/common/switch';
import Input from '~/components/common/input';
import useVehicleStateUpdater from '~/hooks/useVehicleStateUpdater';
import { RootState } from '~/store/store';
import Button from '~/components/common/button';

function BuzzerAlarmControl() {
    const buzzerVariable = useSelector(
        (state: RootState) => state.vehicle.vehicleState?.buzzer_variable
    );
    const [buzzerState, setBuzzerState] = useState<number[]>([
        buzzerVariable?.activated || 0,
        buzzerVariable?.frequency || 0,
    ]);
    const updateVehicleState = useVehicleStateUpdater();

    useEffect(() => {
        if (buzzerVariable) {
            setBuzzerState([
                buzzerVariable.activated,
                buzzerVariable.frequency,
            ]);
        }
    }, [buzzerVariable]);

    const handleSwitchChange = () => {
        const newActivatedState = buzzerState[0] === 0 ? 1 : 0;
        setBuzzerState([newActivatedState, buzzerState[1]]);
    };

    const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBuzzerState([buzzerState[0], Number(e.target.value)]);
    };

    const handleSave = async () => {
        try {
            const payload = {
                buzzer_variable: {
                    activated: buzzerState[0],
                    frequency: buzzerState[1],
                },
            };
            await updateVehicleState(payload);
        } catch (error) {
            console.error(
                'Erreur lors de la mise à jour de la variable de buzzer:',
                error
            );
        }
    };

    return (
        <>
            <Switch
                label="ON/OFF"
                isChecked={buzzerState[0] === 1}
                onChange={handleSwitchChange}
            />
            <Input
                id="frequency"
                name="frequency"
                label="Fréquence"
                type="number"
                minLength={0}
                maxLength={10000}
                value={buzzerState[1]}
                onChange={handleFrequencyChange}
            />
            <Button text="Sauvegarder" onClick={handleSave} outline />
        </>
    );
}

export default BuzzerAlarmControl;
