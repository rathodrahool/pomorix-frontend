export interface CreateBugRequest {
    title: string;
    description: string;
}

export interface Bug {
    id: number;
    title: string;
    description: string;
    user_id: number | null;
    created_at: string;
}
