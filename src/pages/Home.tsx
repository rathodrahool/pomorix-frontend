
import React, { useState } from 'react';
import TimerDisplay from '../components/Timer/TimerDisplay';
import TaskList from '../components/Tasks/TaskList';
import StatsSidebar from '../components/Sidebar/StatsSidebar';
import LiveFeed from '../components/Sidebar/LiveFeed';

const Home: React.FC = () => {
  const [currentTask, setCurrentTask] = useState("Review Chapter 4 Notes");

  return (
    <div className="flex flex-col xl:flex-row h-[calc(100vh-64px)] overflow-hidden">
      {/* Left Sidebar - Stats (Large screens only) */}
      <aside className="hidden xl:block w-[300px] border-r border-border-subtle bg-bg-page overflow-y-auto shrink-0">
        <StatsSidebar />
      </aside>

      {/* Main Content - Timer & Tasks */}
      <main className="flex-1 flex flex-col items-center overflow-y-auto py-8 px-4 md:px-8 bg-white">
        <div className="flex flex-col w-full max-w-[700px] gap-8">
          <TimerDisplay initialTask={currentTask} onTaskChange={setCurrentTask} />
          <TaskList />
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
