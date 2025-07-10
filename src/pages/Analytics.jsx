import { useEffect, useState } from 'react';
import supabase from '../services/supabase';

function Analytics() {
  const [stats, setStats] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const user = await supabase.auth.getUser();
    const userId = user.data.user.id;

    // 1. Get all stories by current user
    const { data: stories, error: storyError } = await supabase
      .from('stories')
      .select('id, title')
      .eq('author_id', userId);

    if (storyError) {
      setMessage('Failed to fetch your stories');
      return;
    }

    // 2. For each story, get like/skip count
    const analyticsData = [];

    for (let story of stories) {
      const { data: likeData } = await supabase
        .from('analytics')
        .select('id')
        .eq('story_id', story.id)
        .eq('action_type', 'like');

      const { data: skipData } = await supabase
        .from('analytics')
        .select('id')
        .eq('story_id', story.id)
        .eq('action_type', 'skip');

      analyticsData.push({
        title: story.title,
        likes: likeData.length,
        skips: skipData.length
      });
    }

    setStats(analyticsData);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>📈 Story Analytics</h2>
      {stats.length === 0 ? (
        <p>No stories or data yet.</p>
      ) : (
        stats.map((story, index) => (
          <div key={index} style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '1rem',
            marginBottom: '1rem',
            background: '#f9f9f9'
          }}>
            <h3>{story.title}</h3>
            <p>❤️ Likes: {story.likes}</p>
            <p>👈 Skips: {story.skips}</p>
          </div>
        ))
      )}
      <p>{message}</p>
    </div>
  );
}

export default Analytics;
