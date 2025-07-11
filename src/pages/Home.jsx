import { useEffect, useState } from 'react';
import supabase from '../services/supabase';

function Home() {
  const [stories, setStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setMessage('Failed to load stories');
    } else {
      setStories(data);
    }
  };

  const handleAction = async (action) => {
    const currentStory = stories[currentIndex];
    if (!currentStory) return;

    const user = await supabase.auth.getUser();
    const { error } = await supabase.from('analytics').insert({
      user_id: user.data.user.id,
      story_id: currentStory.id,
      action_type: action
    });

    if (error) {
      setMessage('Failed to log action');
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const currentStory = stories[currentIndex];

  return (
    <div style={{
  border: '1px solid #ccc',
  padding: '2rem',
  borderRadius: '15px',
  background: '#ffffff',
  color: '#111', // ✅ Make text dark
  maxWidth: '600px',
  margin: '2rem auto',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)' // optional soft shadow
}}>
  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
    {currentStory.title}
  </h3>
  <p style={{
    whiteSpace: 'pre-wrap',
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#333'
  }}>
    {currentStory.content}
  </p>

    <div style={{
  marginTop: '2rem',
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem'
}}>
  <button
    onClick={() => handleAction('like')}
    style={{
      background: '#111',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      fontSize: '1rem',
      cursor: 'pointer',
      border: 'none'
    }}
  >
    ❤️ Like
  </button>
  <button
    onClick={() => handleAction('skip')}
    style={{
      background: '#111',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      fontSize: '1rem',
      cursor: 'pointer',
      border: 'none'
    }}
  >
    👈 Skip
  </button>
</div>
</div>
  );
}

export default Home;
