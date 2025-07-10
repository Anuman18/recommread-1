import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import supabase from '../services/supabase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Logged in!');
      navigate('/home');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>🔐 Login to RecommRead</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '0.5rem' }} /><br /><br />
        <input type="password" placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '0.5rem' }} /><br /><br />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Login</button>
      </form>
      <p>{message}</p>
      <p>Don’t have an account? <Link to="/signup">Signup here</Link></p>
    </div>
  );
}

export default Login;
