import { useEffect, useState } from 'react';
import supabase from '../services/supabase';

function Drafts() {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    const user = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('drafts')
      .select('*')
      .eq('user_id', user.data.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      setMessage('Failed to fetch drafts');
    } else {
      setDrafts(data);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>📚 Your Drafts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : drafts.length === 0 ? (
        <p>No drafts found.</p>
      ) : (
        drafts.map((draft) => (
          <div key={draft.id} style={{
            border: '1px solid #ccc',
            padding: '1rem',
            margin: '1rem 0',
            borderRadius: '10px',
            background: '#f4f4f4'
          }}>
            <h3>{draft.title}</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>
              {draft.content.length > 400
                ? draft.content.substring(0, 400) + '...'
                : draft.content}
            </p>
          </div>
        ))
      )}
      <p>{message}</p>
    </div>
  );
}

export default Drafts;
