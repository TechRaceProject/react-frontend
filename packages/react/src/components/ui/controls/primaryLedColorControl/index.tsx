import { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Input from '~/components/common/input';
import Select from '~/components/common/select';
import { RootState } from '~/store/store';
import Button from '~/components/common/button';
import { rgbToHex, hexToRgb } from '~/utils/color.utils';
import { setVehicleStatePrimaryLedColors } from '~/store/slices/vehicle_state.slice';
import { closeModal } from '~/store/slices/section.slice';
import { PrimaryLedColorInterface } from '~/interfaces/store/primary_led_color.interface';

function PrimaryLedColorControl() {
    const dispatch = useDispatch();
    const primaryLedColors = useSelector(
        (state: RootState) => state.vehicle_state.primary_led_colors || [],
        shallowEqual
    );

    const [localColors, setLocalColors] =
        useState<PrimaryLedColorInterface[]>(primaryLedColors);
    const [selectedLed, setSelectedLed] = useState<string>('all');

    useEffect(() => {
        if (primaryLedColors !== localColors) {
            setLocalColors(primaryLedColors);
        }
    }, [primaryLedColors]);

    const handleColorChange = (value: string) => {
        const { red, green, blue } = hexToRgb(value);
        const updatedColors = localColors.map((color, index) => {
            if (selectedLed === 'all' || parseInt(selectedLed, 10) === index) {
                return { ...color, red, green, blue };
            }
            return color;
        });
        setLocalColors(updatedColors);
    };

    const validate = () => {
        const payload = localColors.map((color: PrimaryLedColorInterface) => ({
            led_identifier: color.led_identifier,
            red: color.red,
            green: color.green,
            blue: color.blue,
        }));

        dispatch(setVehicleStatePrimaryLedColors(payload));
        dispatch(closeModal());
    };

    const currentColor =
        selectedLed === 'all'
            ? rgbToHex(
                  localColors[0]?.red ?? 0,
                  localColors[0]?.green ?? 0,
                  localColors[0]?.blue ?? 0
              )
            : rgbToHex(
                  localColors[parseInt(selectedLed, 10)]?.red ?? 0,
                  localColors[parseInt(selectedLed, 10)]?.green ?? 0,
                  localColors[parseInt(selectedLed, 10)]?.blue ?? 0
              );

    return (
        <>
            <Select
                id="led-select"
                name="ledSelect"
                label="Sélectionner une ou plusieurs LED"
                options={[
                    { value: 'all', label: 'Toutes les LEDs' },
                    ...localColors.map((_, index) => ({
                        value: index.toString(),
                        label: `LED ${index + 1}`,
                    })),
                ]}
                value={selectedLed}
                onChange={(e) => setSelectedLed(e.target.value)}
            />
            <Input
                id="primary-color"
                name="primary-color"
                label="Couleur"
                type="color"
                value={currentColor}
                onChange={(e) => handleColorChange(e.target.value)}
            />
            <Button text="Enregistrer" onClick={validate} outline />
        </>
    );
}

export default PrimaryLedColorControl;
