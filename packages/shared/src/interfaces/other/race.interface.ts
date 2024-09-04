

import { VehicleInterface } from "./vehicle.interface";

export interface RaceInterface {
    id: number;
    name: string;
    vehicle_id: number;
    vehicle: VehicleInterface;
    start_time: string;
    end_time: string | null;
    collision_duration: number;
    distance_covered: number;
    average_speed: number;
    out_of_parcours: number;
    status: string;
    type: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}