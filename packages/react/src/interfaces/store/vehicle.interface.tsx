export interface LedColor {
    led_identifier: number;
    red: number;
    green: number;
    blue: number;
    id?: number;
    vehicle_state_id?: number;
}

export interface BuzzerVariable {
    activated: number;
    frequency: number;
    id?: number;
    vehicle_state_id?: number;
}

export interface HeadAngle {
    vertical_angle: number;
    horizontal_angle: number;
    id?: number;
    vehicle_state_id?: number;
}

export interface VehicleStateData {
    face: number;
    led_animation: number;
    buzzer_alarm: number;
    video_activated: number;
    primary_led_colors: LedColor[];
    buzzer_variable: BuzzerVariable;
    head_angle: HeadAngle;
}

export interface Vehicle {
    id: number;
    name: string;
    ip_adress: string;
    is_available: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface VehicleState {
    vehicles: Vehicle[];
    selectedVehicle: number | null;
    vehicleState: VehicleStateData | null;
    loading: boolean;
    error: string | null;
}
