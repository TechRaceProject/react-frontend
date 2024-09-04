import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '~/components/common/button';
import Select from '~/components/common/select';
import useVehicleStateUpdater from '~/hooks/useVehicleStateUpdater';
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
    const face = useSelector(
        (state: RootState) => state.vehicle.vehicleState?.face
    );
    const [selectedFace, setSelectedFace] = useState<string>(
        face?.toString() || '0'
    );
    const updateVehicleState = useVehicleStateUpdater();

    useEffect(() => {
        if (face !== undefined) setSelectedFace(face.toString());
    }, [face]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFace(e.target.value);
    };

    const handleSave = async () => {
        try {
            const payload = { face: Number(selectedFace) };
            await updateVehicleState(payload);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de Face:', error);
        }
    };

    return (
        <>
            <Select
                id="face-selection"
                name="face"
                label="Sélection Visage"
                options={faceOptions}
                value={selectedFace}
                onChange={handleChange}
            />
            <Button text="Sauvegarder" onClick={handleSave} outline />
        </>
    );
}

export default FaceControl;
