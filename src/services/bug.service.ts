import apiClient from '../api/client';
import { Bug, CreateBugRequest } from '../types/bug.types';

class BugService {
    /**
     * Create a new bug report
     */
    async createBug(data: CreateBugRequest): Promise<Bug> {
        const response = await apiClient.post<Bug>('/bug-reports', data);
        return response.data;
    }
}

export const bugService = new BugService();
