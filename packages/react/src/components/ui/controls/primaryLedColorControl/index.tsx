import { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Input from '~/components/common/input';
import Select from '~/components/common/select';
import useVehicleStateUpdater from '~/hooks/useVehicleStateUpdater';
import { RootState } from '~/store/store';
import { LedColor } from '~/interfaces/store/vehicle.interface';
import Button from '~/components/common/button';
import { rgbToHex, hexToRgb } from '~/utils/color.utils';

function PrimaryLedColorControl() {
    const primaryLedColors = useSelector(
        (state: RootState) =>
            state.vehicle.vehicleState?.primary_led_colors || [],
        shallowEqual
    );

    const [localColors, setLocalColors] =
        useState<LedColor[]>(primaryLedColors);
    const [selectedLed, setSelectedLed] = useState<string>('all');
    const updateVehicleState = useVehicleStateUpdater();

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

    const handleSave = async () => {
        try {
            await updateVehicleState({ primary_led_colors: localColors });
        } catch (error) {
            console.error(
                'Erreur lors de la mise à jour des couleurs LED primaires:',
                error
            );
        }
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
                label="Sélectionner une LED"
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
            <Button text="Sauvegarder" onClick={handleSave} outline />
        </>
    );
}

export default PrimaryLedColorControl;
