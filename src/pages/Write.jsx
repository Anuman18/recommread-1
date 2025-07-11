import { useState } from 'react';
import supabase from '../services/supabase';
import { generateStory } from '../services/gemini';

function Write() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedStory, setGeneratedStory] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setMessage('');
    const story = await generateStory(prompt);
    setGeneratedStory(story);
    setLoading(false);
  };

  const handleSave = async () => {
    const user = await supabase.auth.getUser();
    const userId = user?.data?.user?.id;
    if (!userId) {
      setMessage('Please login first.');
      return;
    }

    if (!title || !generatedStory) {
      setMessage('Please enter a title and generate a story first.');
      return;
    }

    const { error } = await supabase.from('stories').insert({
      title,
      content: generatedStory,
      author_id: userId
    });

    if (error) {
      setMessage('❌ Failed to save story');
    } else {
      setMessage('✅ Story saved to library!');
      setPrompt('');
      setTitle('');
      setGeneratedStory('');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto' }}>
      <h2>✍️ AI Story Generator</h2>
      <input
        type="text"
        placeholder="Enter story idea or genre..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{
          width: '100%',
          padding: '0.5rem',
          marginBottom: '1rem'
        }}
      />
      <button onClick={handleGenerate} disabled={loading} style={btnStyle}>
        {loading ? 'Generating...' : 'Generate Story'}
      </button>

      {generatedStory && (
        <>
          <h3 style={{ marginTop: '2rem' }}>📝 Your Story</h3>
          <textarea
            value={generatedStory}
            readOnly
            rows={10}
            style={{
              width: '100%',
              padding: '1rem',
              fontFamily: 'monospace',
              background: '#f4f4f4',
              borderRadius: '8px'
            }}
          />
          <input
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              marginTop: '1rem'
            }}
          />
          <button onClick={handleSave} style={btnStyle}>
            💾 Save Story
          </button>
        </>
      )}

      <p style={{ color: 'crimson', marginTop: '1rem' }}>{message}</p>
    </div>
  );
}

const btnStyle = {
  padding: '0.5rem 1rem',
  background: '#111',
  color: 'white',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  marginBottom: '1rem'
};

export default Write;
