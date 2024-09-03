export interface VehicleInterface {
    id: number;
    name: string;
    ip_address: string;
    is_available: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}