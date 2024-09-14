import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Switch from '~/components/common/switch';
import Input from '~/components/common/input';
import { RootState } from '~/store/store';
import Button from '~/components/common/button';
import { setVehicleStateBuzzerVariable } from '~/store/slices/vehicle_state.slice';
import { closeModal } from '~/store/slices/section.slice';

function BuzzerAlarmControl() {
    const dispatch = useDispatch();
    const buzzerVariable = useSelector(
        (state: RootState) => state.vehicle_state.buzzer_variable
    );
    const [buzzerState, setBuzzerState] = useState<number[]>([
        buzzerVariable?.activated || 0,
        buzzerVariable?.frequency || 0,
    ]);

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

    const validate = () => {
        const payload = {
            activated: buzzerState[0],
            frequency: buzzerState[1],
        };

        dispatch(setVehicleStateBuzzerVariable(payload));
        dispatch(closeModal());
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
            <Button text="Enregistrer" onClick={validate} outline />
        </>
    );
}

export default BuzzerAlarmControl;
