
import React, { useState } from 'react';
import { Task } from '../../types';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Complete Math assignment', pomodoros: 2, completed: false },
    { id: '2', title: 'Read Article on UX Trends', pomodoros: 1, completed: false },
    { id: '3', title: 'Email Professor', pomodoros: 1, completed: false },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      pomodoros: 1,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const clearFinished = () => {
    setTasks(tasks.filter(t => !t.completed));
  };

  return (
    <div className="flex flex-col gap-6 w-full mb-12">
      <div className="w-full">
        <label className="flex flex-col w-full shadow-sm">
          <div className="flex w-full items-stretch">
            <input 
              className="form-input flex-1 w-full bg-surface border border-gray-300 text-text-main placeholder:text-text-secondary focus:ring-0 focus:border-primary h-14 px-6 text-base font-normal transition-all" 
              placeholder="What are you working on next?" 
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
            <button 
              onClick={addTask}
              className="flex items-center justify-center px-6 bg-gray-100 border-y border-r border-gray-300 hover:bg-gray-200 transition-colors group cursor-pointer text-text-secondary hover:text-primary"
            >
              <span className="material-symbols-outlined">add</span>
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
          className="text-text-secondary text-xs font-medium hover:text-primary hover:underline uppercase tracking-wide"
        >
          Clear finished
        </button>
      </div>

      <div className="flex flex-col gap-0 bg-surface border border-border-subtle shadow-sm divide-y divide-border-subtle">
        {tasks.map((task) => (
          <div 
            key={task.id}
            className={`group flex items-center justify-between p-5 hover:bg-bg-page transition-colors cursor-pointer ${task.completed ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center gap-4">
              <button 
                onClick={(e) => { e.stopPropagation(); toggleTask(task.id); }}
                className={`size-5 border-2 transition-colors flex items-center justify-center ${task.completed ? 'bg-primary border-primary text-white' : 'border-gray-300 hover:border-primary hover:bg-primary/10'}`}
              >
                {task.completed && <span className="material-symbols-outlined !text-[14px]">check</span>}
              </button>
              <div className="flex flex-col">
                <span className={`text-text-main font-medium text-base group-hover:text-primary transition-colors ${task.completed ? 'line-through' : ''}`}>
                  {task.title}
                </span>
                <span className="text-text-secondary text-xs flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined !text-[14px]">timer</span> {task.pomodoros} Pomodoro{task.pomodoros > 1 ? 's' : ''}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 text-text-secondary hover:text-text-main hover:bg-gray-200 transition-colors">
                <span className="material-symbols-outlined !text-[20px]">edit</span>
              </button>
              <button className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-50 transition-colors">
                <span className="material-symbols-outlined !text-[20px]">delete</span>
              </button>
              <button className="p-2 text-text-secondary hover:text-text-main cursor-grab active:cursor-grabbing">
                <span className="material-symbols-outlined !text-[20px]">drag_indicator</span>
              </button>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="p-8 text-center text-text-secondary italic">No tasks planned. Add one above!</div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
