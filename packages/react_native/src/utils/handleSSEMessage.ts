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
        primary_led_color: {
            blue: number;
            CreatedAt: string;
            DeletedAt: string | null;
            green: number;
            ID: number;
            led_identifier: number;
            red: number;
            UpdatedAt: string;
            VehicleStateID: number;
        };
        secondary_led_color: {
            binary_representation: number;
            blue: number;
            CreatedAt: string;
            DeletedAt: string | null;
            green: number;
            ID: number;
            red: number;
            UpdatedAt: string;
            VehicleStateID: number;
        };
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

    console.log("['handleVehicleStateMessage'] doit gérer : ", data);
};