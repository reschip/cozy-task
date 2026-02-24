import { useState } from 'react';
import type { Task } from '../App';

interface TasksProps {
  tasks: Task[];
  updateTasks: (tasks: Task[]) => void;
}

export default function Tasks({ tasks, updateTasks }: TasksProps) {
  const [newTask, setNewTask] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task: Task = {
      id: crypto.randomUUID(),
      text: newTask,
      completed: false,
      inProgress: false
    };

    updateTasks([task, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    const updated = tasks.map(t => {
      if (t.id === id) {
        if (!t.inProgress && !t.completed) {
          // Todo -> In Progress
          return { ...t, inProgress: true, completed: false };
        } else if (t.inProgress && !t.completed) {
          // In Progress -> Completed
          return { ...t, inProgress: false, completed: true };
        } else {
          // Completed -> Todo
          return { ...t, inProgress: false, completed: false };
        }
      }
      return t;
    });
    updateTasks(updated);
  };

  const deleteTask = (id: string) => {
    updateTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="fade-in">
      <h1>My Tasks</h1>
      <p className="subtitle">What needs to be done today?</p>

      <form onSubmit={addTask} className="input-container">
        <input
          type="text"
          placeholder="New task... (press Enter)"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      </form>

      <div className="item-list">
        {tasks.map(task => (
          <div key={task.id} className="list-item">
            <div
              className={`checkbox-container ${task.inProgress ? 'in-progress' : ''} ${task.completed ? 'completed' : ''}`}
              onClick={() => toggleTask(task.id)}
            >
              <div className="checkmark"></div>
            </div>
            <div className={`content ${task.completed ? 'completed' : ''}`}>
              {task.text}
            </div>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              ×
            </button>
          </div>
        ))}
        {tasks.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '24px', fontSize: '13px' }}>
            No tasks yet. Take a deep breath and enjoy the moment.
          </div>
        )}
      </div>
    </div>
  );
}
