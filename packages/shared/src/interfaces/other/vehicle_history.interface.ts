export interface VehicleHistoryInterface {
    id: number;
    vehicle_id: number;
    vehicle: VehicleRelationInterface;
    message: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

interface VehicleRelationInterface {
    id: number;
    name: string;
    ip_address: string;
    is_available: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}