import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '~/components/common/button';
import Select from '~/components/common/select';
import { closeModal } from '~/store/slices/section.slice';
import { setVehicleState } from '~/store/slices/vehicle_state.slice';
import { RootState } from '~/store/store';

const faceOptions = [
    { value: '0', label: 'Visage 0' },
    { value: '1', label: 'Visage 1' },
    { value: '2', label: 'Visage 2' },
    { value: '3', label: 'Visage 3' },
    { value: '4', label: 'Visage 4' },
    { value: '5', label: 'Visage 5' },
    { value: '6', label: 'Visage 6' },
    { value: '7', label: 'Visage 7' },
    { value: '8', label: 'Visage 8' },
];

function FaceControl() {
    const dispatch = useDispatch();
    const vehicleState = useSelector((state: RootState) => state.vehicle_state);
    const face = useSelector((state: RootState) => state.vehicle_state.face);
    const [selectedFace, setSelectedFace] = useState<string>(
        face?.toString() || '0'
    );

    useEffect(() => {
        if (face !== undefined) setSelectedFace(face.toString());
    }, [face]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFace(e.target.value);
    };

    const validate = () => {
        const payload = {
            ...vehicleState,
            face: Number(selectedFace),
        };

        dispatch(setVehicleState(payload));
        dispatch(closeModal());
    };

    return (
        <>
            <Select
                id="face-selection"
                name="face"
                label="Selectionnez le visage qui sera affiché sur le robot"
                options={faceOptions}
                value={selectedFace}
                onChange={handleChange}
            />
            <Button text="Enregistrer" onClick={validate} outline />
        </>
    );
}

export default FaceControl;
