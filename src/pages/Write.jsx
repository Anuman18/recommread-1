import { useState } from 'react';
import { generateStoryFromPrompt } from '../services/gemini';
import supabase from '../services/supabase';

function Write() {
  const [prompt, setPrompt] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setMessage('');
    const story = await generateStoryFromPrompt(prompt);
    setGeneratedStory(story);
    setLoading(false);
  };

  const saveStory = async () => {
    const user = await supabase.auth.getUser();
    const userId = user.data.user.id;

    const { error } = await supabase.from('drafts').insert({
      title: prompt.slice(0, 30),
      content: generatedStory,
      user_id: userId
    });

    if (error) {
      setMessage('Error saving story: ' + error.message);
    } else {
      setMessage('Story saved to drafts!');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>✍️ AI Story Writer</h2>
      <textarea
        placeholder="Type your story idea..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        style={{ width: '100%', padding: '1rem' }}
      /><br /><br />
      <button onClick={handleGenerate} style={{ padding: '0.5rem 1rem' }}>
        {loading ? 'Generating...' : 'Generate Story'}
      </button><br /><br />

      {generatedStory && (
        <>
          <div style={{
            whiteSpace: 'pre-wrap',
            border: '1px solid #ccc',
            background: '#f9f9f9',
            padding: '1rem',
            borderRadius: '10px'
          }}>
            <h3>Your Story:</h3>
            <p>{generatedStory}</p>
          </div>
          <br />
          <button onClick={saveStory} style={{ padding: '0.5rem 1rem' }}>Save to Drafts</button>
        </>
      )}

      <p>{message}</p>
    </div>
  );
}

export default Write;
