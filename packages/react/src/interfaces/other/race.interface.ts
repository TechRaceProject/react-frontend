export interface HistoryRaceListProps {
    ID: number;
    start_time: string;
    end_time: string | null;
    distance_covered: number;
    average_speed: number;
    collision_duration: number;
    status: string;
    out_of_parcours: number;
    name: string;
    onDelete: (id: number) => void;
}

export interface HistoryRaceTableProps {
    races: HistoryRaceListProps[];
    onRaceDeleted: () => void;
}

export interface HistoryRaceFieldProps {
    value?: string | number | null;
    unit?: string;
}

export type StatusType = 'not_started' | 'in_progress' | 'completed';
