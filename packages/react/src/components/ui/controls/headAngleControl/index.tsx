import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputRange from '~/components/common/inputRange';
import { RootState } from '~/store/store';
import Button from '~/components/common/button';
import { closeModal } from '~/store/slices/section.slice';
import { setVehicleStateHeadAngle } from '~/store/slices/vehicle_state.slice';

function HeadAngleControl() {
    const dispatch = useDispatch();
    const headAngle = useSelector(
        (state: RootState) => state.vehicle_state.head_angle
    );
    const [angles, setAngles] = useState<number[]>([
        headAngle?.vertical_angle || 180,
        headAngle?.horizontal_angle || 0,
    ]);

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

    const validate = () => {
        const payload = {
            vertical_angle: angles[0],
            horizontal_angle: angles[1],
        };

        dispatch(setVehicleStateHeadAngle(payload));
        dispatch(closeModal());
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
            <Button text="Enregistrer" onClick={validate} outline />
        </>
    );
}

export default HeadAngleControl;
