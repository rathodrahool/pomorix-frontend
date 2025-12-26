import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { apiClient, API_ENDPOINTS } from '../../api';
import { ConfirmModal } from '../Common';
import type { TaskResponse } from '../../types';

interface TaskListProps {
  sharedTasks: TaskResponse[];
  sharedLoading: boolean;
  onRefresh: () => Promise<void>;
}

const TaskList: React.FC<TaskListProps> = ({ sharedTasks, sharedLoading, onRefresh }) => {
  // Use shared state from Home component
  const tasks = sharedTasks;
  const loading = sharedLoading;
  const fetchTasks = onRefresh;
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<{ id: string; title: string } | null>(null);

  const addTask = async () => {
    if (!newTaskTitle.trim()) return;

    setIsCreating(true);
    try {
      const response = await apiClient.post(API_ENDPOINTS.TASKS.CREATE, { title: newTaskTitle });
      await fetchTasks(); // Refresh the list
      setNewTaskTitle('');
      toast.success(response.data.message); // Use backend message
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to create task';
      toast.error(errorMsg);
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    const wasCompleted = task?.completed;

    try {
      const response = await apiClient.patch(API_ENDPOINTS.TASKS.TOGGLE_COMPLETE(id));
      await fetchTasks(); // Refresh the list
      toast.success(response.data.message || (wasCompleted ? 'Task marked as incomplete' : 'Task completed! 🎉'));
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to update task';
      toast.error(errorMsg);
    }
  };

  const handleDeleteTask = (task: any) => {
    setTaskToDelete({ id: task.id, title: task.title });
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!taskToDelete) return;

    try {
      const response = await apiClient.delete(API_ENDPOINTS.TASKS.DELETE(taskToDelete.id));
      await fetchTasks();
      toast.success(response.data.message);
      setDeleteModalOpen(false);
      setTaskToDelete(null);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to delete task';
      toast.error(errorMsg);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const startEdit = (task: any) => {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditingTitle('');
  };

  const saveEdit = async () => {
    if (!editingTitle.trim() || !editingTaskId) return;

    try {
      const response = await apiClient.patch(API_ENDPOINTS.TASKS.UPDATE(editingTaskId), { title: editingTitle });
      await fetchTasks();
      toast.success(response.data.message || 'Task updated successfully');
      setEditingTaskId(null);
      setEditingTitle('');
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to update task';
      toast.error(errorMsg);
    }
  };

  const clearFinished = async () => {
    const completedTasks = tasks.filter(t => t.completed);
    if (completedTasks.length === 0) return;

    try {
      await Promise.all(completedTasks.map(task => apiClient.delete(API_ENDPOINTS.TASKS.DELETE(task.id))));
      await fetchTasks(); // Refresh the list
      toast.success(`${completedTasks.length} completed task${completedTasks.length > 1 ? 's' : ''} cleared`);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to clear tasks';
      toast.error(errorMsg);
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      // If clicking on an already active task, just deactivate it
      const clickedTask = tasks.find(t => t.id === id);
      if (clickedTask?.is_active) {
        const response = await apiClient.patch(API_ENDPOINTS.TASKS.TOGGLE_ACTIVE(id));
        await fetchTasks();
        toast.success(response.data.message || 'Task deactivated');
        return;
      }

      // Find currently active task and deactivate it first
      const currentlyActiveTask = tasks.find(t => t.is_active);
      if (currentlyActiveTask && currentlyActiveTask.id !== id) {
        await apiClient.patch(API_ENDPOINTS.TASKS.TOGGLE_ACTIVE(currentlyActiveTask.id));
      }

      // Now activate the clicked task
      const response = await apiClient.patch(API_ENDPOINTS.TASKS.TOGGLE_ACTIVE(id));
      await fetchTasks();
      toast.success(response.data.message || 'Task activated');
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to toggle task';
      toast.error(errorMsg);
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Task?"
        message={
          taskToDelete ? (
            <>
              Are you sure you want to delete "<span className="font-bold text-text-main">{taskToDelete.title}</span>"? This action cannot be undone.
            </>
          ) : ''
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        isLoading={loading}
        variant="danger"
      />

      <div className="flex flex-col gap-6 w-full mb-12">
        <div className="w-full">
          <label className="flex flex-col w-full shadow-sm">
            <div className="flex w-full items-stretch">
              <input
                className="form-input flex-1 w-full bg-surface border border-gray-300 text-text-main placeholder:text-text-secondary focus:ring-0 focus:border-primary h-14 px-6 text-base font-normal transition-all"
                placeholder="What are you working on next?"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isCreating && addTask()}
                disabled={isCreating || loading}
              />
              <button
                onClick={addTask}
                disabled={isCreating || loading || !newTaskTitle.trim()}
                className="flex items-center justify-center px-6 bg-gray-100 border-y border-r border-gray-300 hover:bg-gray-200 transition-colors group cursor-pointer text-text-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined">
                  {isCreating ? 'hourglass_empty' : 'add'}
                </span>
              </button>
            </div>
          </label>
        </div>

        <div className="flex items-center justify-between px-1 pt-2 border-b-2 border-primary/20 pb-2">
          <h3 className="text-text-main text-sm font-bold uppercase tracking-wider flex items-center gap-2">
            <span className="size-2 bg-primary inline-block"></span>
            Up Next
          </h3>
          <button
            onClick={clearFinished}
            disabled={loading || !tasks.some(t => t.completed)}
            className="text-text-secondary text-xs font-medium hover:text-primary hover:underline uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear finished
          </button>
        </div>

        {loading && tasks.length === 0 ? (
          <div className="p-8 text-center text-text-secondary">
            <span className="material-symbols-outlined animate-spin">progress_activity</span>
            <p className="mt-2">Loading tasks...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-0 bg-surface border border-border-subtle shadow-sm divide-y divide-border-subtle">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleToggleActive(task.id)}
                className={`group flex items-center justify-between p-5 hover:bg-bg-page transition-colors cursor-pointer ${task.completed ? 'opacity-50' : ''
                  } ${task.is_active ? 'bg-orange-50/30 border-l-4 !border-l-[#F15025]' : ''
                  }`}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleToggleTask(task.id); }}
                    disabled={loading || editingTaskId === task.id}
                    className={`size-5 border-2 transition-colors flex items-center justify-center ${task.completed ? 'bg-primary border-primary text-white' : 'border-gray-300 hover:border-primary hover:bg-primary/10'} disabled:opacity-50`}
                  >
                    {task.completed && <span className="material-symbols-outlined !text-[14px]">check</span>}
                  </button>
                  <div className="flex flex-col flex-1">
                    {editingTaskId === task.id ? (
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onBlur={saveEdit}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEdit();
                          if (e.key === 'Escape') cancelEdit();
                        }}
                        className="flex-1 border border-primary px-3 py-1.5 text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                        autoFocus
                      />
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <span className={`text-text-main font-medium text-base group-hover:text-primary transition-colors ${task.completed ? 'line-through' : ''
                            }`}>
                            {task.title}
                          </span>
                          {task.is_active && (
                            <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-bold uppercase tracking-wide">
                              Active
                            </span>
                          )}
                        </div>
                        <span className="text-text-secondary text-xs flex items-center gap-1 mt-1">
                          <span className="material-symbols-outlined !text-[14px]">timer</span> {task.pomodoros || 0} Pomodoro{task.pomodoros !== 1 ? 's' : ''}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); startEdit(task); }}
                    disabled={loading || editingTaskId !== null}
                    className="p-2 text-text-secondary hover:text-primary hover:bg-gray-100 transition-colors disabled:opacity-50 rounded"
                  >
                    <span className="material-symbols-outlined !text-[20px]">edit</span>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteTask(task); }}
                    disabled={loading || editingTaskId !== null}
                    className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50 rounded"
                  >
                    <span className="material-symbols-outlined !text-[20px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
            {tasks.length === 0 && !loading && (
              <div className="p-8 text-center text-text-secondary italic">No tasks planned. Add one above!</div>
            )}
          </div>
        )}
      </div >
    </>
  );
};

export default TaskList;
