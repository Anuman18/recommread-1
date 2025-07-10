import { useEffect, useState } from 'react';
import supabase from '../services/supabase';

function Home() {
  const [stories, setStories] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    const { data, error } = await supabase.from('stories').select('*').order('created_at', { ascending: false });
    if (error) {
      setMessage('Error fetching stories: ' + error.message);
    } else {
      setStories(data);
    }
    setLoading(false);
  };

  const handleSwipe = async (direction) => {
    const story = stories[index];
    const user = await supabase.auth.getUser();
    if (!user?.data?.user?.id) return alert("Login required");

    await supabase.from('analytics').insert({
      story_id: story.id,
      action_type: direction === 'right' ? 'like' : 'skip',
      user_id: user.data.user.id,
    });

    setMessage(`You swiped ${direction} on "${story.title}"`);
    setIndex(index + 1);
  };

  if (loading) return <p style={{ padding: '2rem' }}>Loading stories...</p>;
  if (index >= stories.length) return <p style={{ padding: '2rem' }}>No more stories!</p>;

  const story = stories[index];

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>📖 Swipe Story</h2>
      <div style={{
        border: '2px solid #333',
        padding: '1rem',
        borderRadius: '12px',
        background: '#f4f4f4',
        marginBottom: '1rem'
      }}>
        <h3>{story.title}</h3>
        <p>{story.content.substring(0, 250)}...</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => handleSwipe('left')} style={{ padding: '0.5rem 1rem' }}>👈 Skip</button>
        <button onClick={() => handleSwipe('right')} style={{ padding: '0.5rem 1rem' }}>❤️ Like</button>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default Home;
