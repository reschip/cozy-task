import { useState } from 'react';
import type { Idea } from '../App';

interface IdeasProps {
  ideas: Idea[];
  updateIdeas: (ideas: Idea[]) => void;
}

const PASTEL_COLORS = ['pastel-yellow', 'pastel-pink', 'pastel-blue', 'pastel-mint'];

export default function Ideas({ ideas, updateIdeas }: IdeasProps) {
  const [newIdea, setNewIdea] = useState('');

  const addIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdea.trim()) return;

    // Pick a random pastel color class for the idea card
    const randomColor = PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)];

    const idea: Idea = {
      id: crypto.randomUUID(),
      content: newIdea,
      date: new Date().toISOString(),
      color: randomColor
    };

    updateIdeas([idea, ...ideas]);
    setNewIdea('');
  };

  const deleteIdea = (id: string) => {
    updateIdeas(ideas.filter(i => i.id !== id));
  };

  return (
    <div className="fade-in">
      <h1>My Ideas</h1>
      <p className="subtitle">A cozy space for your free-flowing thoughts.</p>

      <form onSubmit={addIdea}>
        <textarea
          className="idea-input"
          placeholder="What's on your mind?..."
          value={newIdea}
          onChange={(e) => setNewIdea(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              addIdea(e as any);
            }
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '-4px 0 16px 0' }}>
          <button type="submit" className="minimal-btn">Save</button>
        </div>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {ideas.map((idea) => (
          <div key={idea.id} className={`idea-card ${idea.color}`}>
            <div style={{ paddingRight: '24px' }}>{idea.content}</div>
            <span className="idea-date">
              {new Date(idea.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </span>
            <button className="delete-btn" onClick={() => deleteIdea(idea.id)}>
              ×
            </button>
          </div>
        ))}
        {ideas.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '24px', fontSize: '13px', gridColumn: '1 / -1' }}>
            No ideas written down yet. Waiting for a spark of inspiration!
          </div>
        )}
      </div>
    </div>
  );
}
