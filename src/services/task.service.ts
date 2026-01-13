import { apiClient, API_ENDPOINTS } from '../api';
import type {
    CreateTaskRequest,
    UpdateTaskRequest,
    TaskResponse,
    ApiResponse,
} from '../types';

/**
 * Task Service
 * Handles all task-related CRUD operations
 */
export const taskService = {
    /**
     * Get all tasks
     */
    async getTasks(): Promise<TaskResponse[]> {
        const response = await apiClient.get<ApiResponse<TaskResponse[]>>(
            API_ENDPOINTS.TASKS.LIST,
            {
                params: {
                    sort_by: 'created_at',
                    sort_order: 'asc'
                }
            }
        );
        return response.data.data;
    },

    /**
     * Get single task by ID
     */
    async getTask(taskId: string): Promise<TaskResponse> {
        const response = await apiClient.get<ApiResponse<TaskResponse>>(
            API_ENDPOINTS.TASKS.GET(taskId)
        );
        return response.data.data;
    },

    /**
     * Create new task
     */
    async createTask(taskData: CreateTaskRequest): Promise<TaskResponse> {
        const response = await apiClient.post<ApiResponse<TaskResponse>>(
            API_ENDPOINTS.TASKS.CREATE,
            taskData
        );
        return response.data.data;
    },

    /**
     * Update existing task
     */
    async updateTask(taskId: string, updates: UpdateTaskRequest): Promise<TaskResponse> {
        const response = await apiClient.patch<ApiResponse<TaskResponse>>(
            API_ENDPOINTS.TASKS.UPDATE(taskId),
            updates
        );
        return response.data.data;
    },

    /**
     * Delete task
     */
    async deleteTask(taskId: string): Promise<void> {
        await apiClient.delete(API_ENDPOINTS.TASKS.DELETE(taskId));
    },

    /**
     * Toggle task completion status
     */
    async toggleComplete(taskId: string): Promise<TaskResponse> {
        const response = await apiClient.patch<ApiResponse<TaskResponse>>(
            API_ENDPOINTS.TASKS.TOGGLE_COMPLETE(taskId)
        );
        return response.data.data;
    },

    /**
     * Toggle task as active/inactive
     * Only one task can be active at a time
     */
    async toggleActive(taskId: string): Promise<TaskResponse> {
        const response = await apiClient.patch<ApiResponse<TaskResponse>>(
            API_ENDPOINTS.TASKS.TOGGLE_ACTIVE(taskId)
        );
        return response.data.data;
    },
};
