import { useState } from 'react';
import type { Event } from '../App';

interface EventsProps {
  events: Event[];
  updateEvents: (events: Event[]) => void;
}

export default function Events({ events, updateEvents }: EventsProps) {
  const [newEvent, setNewEvent] = useState('');
  const [newDate, setNewDate] = useState('');

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.trim() || !newDate.trim()) return;

    const event: Event = {
      id: crypto.randomUUID(),
      title: newEvent,
      date: newDate
    };

    // Sort events by date in ascending order
    const updated = [...events, event].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    updateEvents(updated);

    setNewEvent('');
    setNewDate('');
  };

  const deleteEvent = (id: string) => {
    updateEvents(events.filter(e => e.id !== id));
  };

  return (
    <div className="fade-in">
      <h1>Upcoming Events</h1>
      <p className="subtitle">Important dates to keep in mind.</p>

      <form onSubmit={addEvent} className="input-container">
        <input
          type="text"
          placeholder="New event... (press Enter)"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          style={{ flex: 2 }}
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>

      <div className="item-list">
        {events.map((event) => (
          <div key={event.id} className="list-item">
            <div style={{
              backgroundColor: 'var(--pastel-blue)',
              color: 'var(--text-primary)',
              padding: '6px 10px',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '12px',
              minWidth: '80px',
              textAlign: 'center'
            }}>
              {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </div>
            <div className="content">
              {event.title}
            </div>
            <button className="delete-btn" onClick={() => deleteEvent(event.id)}>
              ×
            </button>
          </div>
        ))}
        {events.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '24px', fontSize: '13px' }}>
            No upcoming events. Your schedule is beautifully empty.
          </div>
        )}
      </div>
    </div>
  );
}
