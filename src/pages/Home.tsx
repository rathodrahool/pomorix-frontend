
import React, { useState, useEffect } from 'react';
import TimerDisplay from '../components/Timer/TimerDisplay';
import TaskList from '../components/Tasks/TaskList';
import StatsSidebar from '../components/Sidebar/StatsSidebar';
import LiveFeed from '../components/Sidebar/LiveFeed';
import { useTasks } from '../hooks';

const Home: React.FC = () => {
  // Manage tasks state at Home level to share between components
  const { tasks, loading, fetchTasks, toggleActive } = useTasks();
  const [currentTask, setCurrentTask] = useState("What are you working on?");

  // Update current task when active task changes
  useEffect(() => {
    const activeTask = tasks.find(task => task.is_active);
    if (activeTask) {
      setCurrentTask(activeTask.title);
    } else {
      setCurrentTask("What are you working on?");
    }
  }, [tasks]);

  const hasActiveTask = tasks.some(task => task.is_active);
  const hasAnyTasks = tasks.length > 0;

  const handlePomodoroComplete = async () => {
    await fetchTasks(); // Refresh to get updated completed_pomodoros count
    // Backend should handle task completion and auto-activation of next task
  };

  return (
    <div className="flex flex-col xl:flex-row h-[calc(100vh-64px)] overflow-hidden">
      {/* Left Sidebar - Stats (Large screens only) */}
      <aside className="hidden xl:block w-[300px] border-r border-border-subtle bg-bg-page overflow-y-auto shrink-0">
        <StatsSidebar />
      </aside>

      {/* Main Content - Timer & Tasks */}
      <main className="flex-1 flex flex-col items-center overflow-y-auto py-8 px-4 md:px-8 bg-white">
        <div className="flex flex-col w-full max-w-[700px] gap-8">
          <TimerDisplay
            initialTask={currentTask}
            onTaskChange={setCurrentTask}
            hasActiveTask={hasActiveTask}
            hasAnyTasks={hasAnyTasks}
            onPomodoroComplete={handlePomodoroComplete}
          />
          <TaskList sharedTasks={tasks} sharedLoading={loading} onRefresh={fetchTasks} />
        </div>
      </main>

      {/* Right Sidebar - Live Feed */}
      <aside className="hidden lg:flex w-[350px] flex-col border-l border-border-subtle bg-bg-page overflow-y-auto shrink-0">
        <LiveFeed />
      </aside>
    </div>
  );
};

export default Home;
