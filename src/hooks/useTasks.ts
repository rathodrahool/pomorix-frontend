import { useState, useCallback, useEffect } from 'react';
import { taskService } from '../services';
import type { TaskResponse, CreateTaskRequest, UpdateTaskRequest } from '../types';

/**
 * Tasks Hook
 * Manages task list state and provides CRUD operations
 */

interface UseTasksReturn {
    tasks: TaskResponse[];
    loading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
    createTask: (taskData: CreateTaskRequest) => Promise<TaskResponse | null>;
    updateTask: (taskId: string, updates: UpdateTaskRequest) => Promise<TaskResponse | null>;
    deleteTask: (taskId: string) => Promise<boolean>;
    toggleComplete: (taskId: string) => Promise<boolean>;
    setActive: (taskId: string) => Promise<boolean>;
}

export function useTasks(autoFetch = true): UseTasksReturn {
    const [tasks, setTasks] = useState<TaskResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await taskService.getTasks();
            setTasks(data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    }, []);

    const createTask = useCallback(async (taskData: CreateTaskRequest): Promise<TaskResponse | null> => {
        setError(null);

        try {
            const newTask = await taskService.createTask(taskData);
            setTasks(prev => [...prev, newTask]);
            return newTask;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create task');
            return null;
        }
    }, []);

    const updateTask = useCallback(async (
        taskId: string,
        updates: UpdateTaskRequest
    ): Promise<TaskResponse | null> => {
        setError(null);

        try {
            const updatedTask = await taskService.updateTask(taskId, updates);
            setTasks(prev => prev.map(task => task.id === taskId ? updatedTask : task));
            return updatedTask;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update task');
            return null;
        }
    }, []);

    const deleteTask = useCallback(async (taskId: string): Promise<boolean> => {
        setError(null);

        try {
            await taskService.deleteTask(taskId);
            setTasks(prev => prev.filter(task => task.id !== taskId));
            return true;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to delete task');
            return false;
        }
    }, []);

    const toggleComplete = useCallback(async (taskId: string): Promise<boolean> => {
        setError(null);

        try {
            const updatedTask = await taskService.toggleComplete(taskId);
            setTasks(prev => prev.map(task => task.id === taskId ? updatedTask : task));
            return true;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to toggle task');
            return false;
        }
    }, []);

    const setActive = useCallback(async (taskId: string): Promise<boolean> => {
        setError(null);

        try {
            const updatedTask = await taskService.setActive(taskId);
            // Deactivate all other tasks and activate this one
            setTasks(prev => prev.map(task => ({
                ...task,
                active: task.id === taskId,
            })));
            return true;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to set active task');
            return false;
        }
    }, []);

    // Auto-fetch tasks on mount if enabled
    useEffect(() => {
        if (autoFetch) {
            fetchTasks();
        }
    }, [autoFetch, fetchTasks]);

    return {
        tasks,
        loading,
        error,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        toggleComplete,
        setActive,
    };
}
