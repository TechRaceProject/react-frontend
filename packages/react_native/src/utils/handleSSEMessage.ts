import { MessageEvent } from "react-native-sse";

export const handleSSEMessage = (event: MessageEvent) => {
    try {
        const data = (event.data) 
            ? JSON.parse(event.data) 
            : {"error": "Aucune donnée reçue"};

        if (data.error) {
            console.log("['handleSSEMessage'] ", data.error);
            
            return;
        }

        if (data.type === "vehicle_state") {
            handleVehicleStateMessage(data);

            return;
        }
        

    } catch (error) {
        console.error("['handleSSEMessage'] Erreur lors du parsing du message SSE : ", error);
    }
};

interface VehicleStateFromSSE {
    attributes: {
        buzzer_alarm: number;
        buzzer_variable: {
            activated: number;
            CreatedAt: string;
            DeletedAt: string | null;
            frequency: number;
            ID: number;
            UpdatedAt: string;
            VehicleStateID: number;
        };
        face: number;
        head_angle: {
            CreatedAt: string;
            DeletedAt: string | null;
            horizontal_angle: number;
            ID: number;
            UpdatedAt: string;
            VehicleStateID: number;
            vertical_angle: number;
        };
        led_animation: number;
        primary_led_colors: {
            ID: number;
            vehicle_state_id: number;
            led_identifier: number;
            red: number;
            green: number;
            blue: number;
        }[];
        video_activated: number;
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
        console.log("['handleVehicleStateMessage'] buzzer_alarm : ", attributes.buzzer_alarm);
    }

    if (attributes.face !== undefined) {
        console.log("['handleVehicleStateMessage'] face : ", attributes.face);
    }
    
    if (attributes.video_activated !== undefined) {
        console.log("['handleVehicleStateMessage'] video_activated : ", attributes.video_activated);
    }

    if (attributes.led_animation !== undefined) {
        console.log("['handleVehicleStateMessage'] led_animation : ", attributes.led_animation);
    }

    if (attributes.head_angle !== undefined) {
        console.log("['handleVehicleStateMessage'] head_angle : ", attributes.head_angle);
    }

    if (attributes.buzzer_variable !== undefined) {
        console.log("['handleVehicleStateMessage'] buzzer_variable : ", attributes.buzzer_variable);
    }

    if (attributes.primary_led_colors !== undefined) {
        for (const primaryLedColor of attributes.primary_led_colors) {
            console.log("['handleVehicleStateMessage'] primary_led_colors : ", primaryLedColor);
        }
    }
};