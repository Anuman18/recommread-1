import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import supabase from '../services/supabase';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Signup successful!');
      // optional: add to profile table if needed
      navigate('/login');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>📝 Signup for RecommRead</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        /><br /><br />

        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Signup</button>
      </form>

      <p>{message}</p>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default Signup;
