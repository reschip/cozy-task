import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import Tasks from './components/Tasks';
import Events from './components/Events';
import Ideas from './components/Ideas';

export type AppData = {
  tasks: Task[];
  events: Event[];
  ideas: Idea[];
};

export type Task = { id: string; text: string; completed: boolean; inProgress?: boolean };
export type Event = { id: string; title: string; date: string };
export type Idea = { id: string; content: string; date: string; color: string };

function App() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'events' | 'ideas'>('tasks');
  const [data, setData] = useState<AppData>({ tasks: [], events: [], ideas: [] });

  useEffect(() => {
    // We will load data from Rust here
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res: any = await invoke('get_data');
      setData({
        tasks: res.tasks || [],
        events: res.events || [],
        ideas: res.ideas || []
      });
    } catch (e) {
      console.error('Failed to load data', e);
    }
  };

  const saveData = async (newData: AppData) => {
    try {
      setData(newData);
      await invoke('save_data', { data: newData });
    } catch (e) {
      console.error('Failed to save data', e);
    }
  };

  const updateTasks = (newTasks: Task[]) => saveData({ ...data, tasks: newTasks });
  const updateEvents = (newEvents: Event[]) => saveData({ ...data, events: newEvents });
  const updateIdeas = (newIdeas: Idea[]) => saveData({ ...data, ideas: newIdeas });

  return (
    <div className="app-container fade-in">
      <div className="topbar">
        <img src="/rana_rename.png" alt="Rana logo" style={{ width: '28px', height: '28px', objectFit: 'contain', marginRight: '10px' }} />
        <div className="topbar-logo" style={{ marginLeft: '-4px' }}>CozyTasks</div>
        <div
          className={`nav-item ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          Tasks
        </div>
        <div
          className={`nav-item ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Events
        </div>
        <div
          className={`nav-item ${activeTab === 'ideas' ? 'active' : ''}`}
          onClick={() => setActiveTab('ideas')}
        >
          Ideas
        </div>
      </div>

      <div className="main-content">
        {activeTab === 'tasks' && <Tasks tasks={data.tasks} updateTasks={updateTasks} />}
        {activeTab === 'events' && <Events events={data.events} updateEvents={updateEvents} />}
        {activeTab === 'ideas' && <Ideas ideas={data.ideas} updateIdeas={updateIdeas} />}
      </div>
    </div>
  );
}

export default App;
