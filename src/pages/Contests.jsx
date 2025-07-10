import { useEffect, useState } from 'react';
import supabase from '../services/supabase';

function Contests() {
  const [contests, setContests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    const { data, error } = await supabase
      .from('contests')
      .select('*')
      .gte('deadline', new Date().toISOString().split('T')[0])
      .order('deadline', { ascending: true });

    if (error) {
      console.error(error);
    } else {
      setContests(data);
    }
  };

  const submitEntry = async () => {
    const user = await supabase.auth.getUser();
    const userId = user.data.user.id;

    const { error } = await supabase.from('contest_entries').insert({
      user_id: userId,
      contest_id: selected.id,
      title,
      content
    });

    if (error) {
      setMessage('Error submitting story');
    } else {
      setMessage('✅ Your story was submitted!');
      setSelected(null);
      setTitle('');
      setContent('');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>🏆 Story Contests</h2>

      {!selected ? (
        <>
          {contests.length === 0 ? (
            <p>No active contests.</p>
          ) : (
            contests.map((c) => (
              <div key={c.id} style={{
                border: '1px solid #ccc',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '10px'
              }}>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <p><strong>Deadline:</strong> {c.deadline}</p>
                <button onClick={() => setSelected(c)} style={{ marginTop: '0.5rem' }}>
                  Submit Story
                </button>
              </div>
            ))
          )}
        </>
      ) : (
        <>
          <h3>✍️ Submit to: {selected.title}</h3>
          <input
            type="text"
            placeholder="Your Story Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          /><br /><br />
          <textarea
            placeholder="Write your story here..."
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: '100%', padding: '1rem' }}
          /><br /><br />
          <button onClick={submitEntry}>Submit Entry</button>
          <button onClick={() => setSelected(null)} style={{ marginLeft: '1rem' }}>Cancel</button>
        </>
      )}

      <p>{message}</p>
    </div>
  );
}

export default Contests;
