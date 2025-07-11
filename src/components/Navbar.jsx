import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import supabase from '../services/supabase';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUser(data.user);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: '#111',
        color: 'white',
        flexWrap: 'wrap'
      }}>
        <div>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
            📚 RecommRead
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/write" style={linkStyle}>Write</Link>
        <Link to="/contests" style={linkStyle}>Contests</Link>
        <Link to="/rewards" style={linkStyle}>Rewards</Link>
        <Link to="/drafts" style={linkStyle}>Drafts</Link>
        <Link to="/analytics" style={linkStyle}>Analytics</Link>
        <Link to="/leaderboard" style={linkStyle}>Leaderboard</Link>
        {user && <button onClick={handleLogout} style={buttonStyle}>Logout</button>}
      </div>
    </nav>
  );
}

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  padding: '0.4rem 0.8rem',
  borderRadius: '6px',
  backgroundColor: '#222',
  fontSize: '0.95rem'
};


const buttonStyle = {
  backgroundColor: '#e63946',
  color: 'white',
  border: 'none',
  padding: '0.4rem 0.8rem',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold'
};


export default Navbar;
