import { MessageEvent } from 'react-native-sse';
import { SendBuzzerCommand } from '../commands/SendBuzzerCommand';
import { SendHeadRotationCommand } from '../commands/SendHeadRotationCommand';
import { SendLedAnimationCommand } from '../commands/SendLedAnimationCommand';
import { SendPrimaryLedColorCommand } from '../commands/SendPrimaryLedColorCommand';

export const handleSSEMessage = (event: MessageEvent) => {
    try {
        const data = event.data
            ? JSON.parse(event.data)
            : { error: 'Aucune donnée reçue' };

        if (data.error) {
            console.log("['handleSSEMessage'] ", data.error);

            return;
        }

        if (data.type === 'vehicle_state') {
            handleVehicleStateMessage(data);

            return;
        }
    } catch (error) {
        console.error(
            "['handleSSEMessage'] Erreur lors du parsing du message SSE : ",
            error
        );
    }
};

interface VehicleStateFromSSE {
    attributes: {
        buzzer_alarm: number;
        buzzer_variable: {
            activated: number;
            frequency: number;
            id: number;
            vehicle_state_id: number;
        };
        face: number;
        head_angle: {
            horizontal_angle: number;
            id: number;
            vehicle_state_id: number;
            vertical_angle: number;
        };
        led_animation: number;
        primary_led_colors: {
            id: number;
            vehicle_state_id: number;
            led_identifier: number;
            red: number;
            green: number;
            blue: number;
        }[];
        video_activated: number;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
    };
    id: number;
    type: 'vehicle_state';
}

const handleVehicleStateMessage = (data: VehicleStateFromSSE) => {
    /**
     * à la réception d'un message ici, on doit, pour chaque element de data.attributes,
     * envoyer un requête à la voiture pour set l'élèment correspondant avec la valeur qui est
     * dans la réponse (même si elle n'a pas changé avant/après)
     */
    if (!data.attributes) {
        console.log("['handleVehicleStateMessage'] Aucune donnée à traiter");

        return;
    }

    const { attributes } = data;

    if (attributes.buzzer_alarm !== undefined) {
        console.log(
            "['handleVehicleStateMessage'] buzzer_alarm : ",
            attributes.buzzer_alarm
        );
        SendBuzzerCommand(attributes.buzzer_alarm);
    }

    if (attributes.led_animation !== undefined) {
        console.log(
            "['handleVehicleStateMessage'] led_animation : ",
            attributes.led_animation
        );

        SendLedAnimationCommand(attributes.led_animation);
    }

    if (attributes.head_angle !== undefined) {
        console.log(
            "['handleVehicleStateMessage'] head_angle : ",
            Object.values(attributes.head_angle)
        );

        SendHeadRotationCommand(Object.values(attributes.head_angle));
    }

    if (attributes.buzzer_variable !== undefined) {
        console.log(
            "['handleVehicleStateMessage'] buzzer_variable : ",
            attributes.buzzer_variable
        );
    }

    if (attributes.primary_led_colors !== undefined) {
        for (const primaryLedColor of attributes.primary_led_colors) {
            console.log(
                "['handleVehicleStateMessage'] primary_led_colors : ",
                primaryLedColor
            );

            SendPrimaryLedColorCommand(Object.values(primaryLedColor));
        }
    }
};
