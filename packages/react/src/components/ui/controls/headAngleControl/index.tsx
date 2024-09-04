import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import InputRange from '~/components/common/inputRange';
import useVehicleStateUpdater from '~/hooks/useVehicleStateUpdater';
import { RootState } from '~/store/store';
import Button from '~/components/common/button';

function HeadAngleControl() {
    const headAngle = useSelector(
        (state: RootState) => state.vehicle.vehicleState?.head_angle
    );
    const [angles, setAngles] = useState<number[]>([
        headAngle?.vertical_angle || 180,
        headAngle?.horizontal_angle || 0,
    ]);
    const updateVehicleState = useVehicleStateUpdater();

    useEffect(() => {
        if (headAngle) {
            setAngles([headAngle.vertical_angle, headAngle.horizontal_angle]);
        }
    }, [headAngle]);

    const handleVerticalChange = (value: number) => {
        setAngles([value, angles[1]]);
    };

    const handleHorizontalChange = (value: number) => {
        setAngles([angles[0], value]);
    };

    const handleSave = async () => {
        try {
            const payload = {
                head_angle: {
                    vertical_angle: angles[0],
                    horizontal_angle: angles[1],
                },
            };
            await updateVehicleState(payload);
        } catch (error) {
            console.error(
                'Erreur lors de la mise à jour des angles de tête:',
                error
            );
        }
    };

    return (
        <>
            <InputRange
                min={0}
                max={180}
                step={1}
                value={angles[0]}
                onChange={handleVerticalChange}
            />
            <InputRange
                min={0}
                max={180}
                step={1}
                value={angles[1]}
                onChange={handleHorizontalChange}
            />
            <Button text="Sauvegarder" onClick={handleSave} outline />
        </>
    );
}

export default HeadAngleControl;
