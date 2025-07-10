import { useEffect, useState } from 'react';
import supabase from '../services/supabase';

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase.from('leaderboard').select('*');

    if (error) {
      console.error('Error fetching leaderboard:', error.message);
    } else {
      // fetch emails for top users
      const userIds = data.map(u => u.user_id);
      const { data: profiles } = await supabase
        .from('users') // optional: if you store custom profiles
        .select('id, username');

      const leaderboard = data.map((user, index) => ({
        ...user,
        rank: index + 1,
        username: profiles?.find(p => p.id === user.user_id)?.username || user.user_id.slice(0, 6)
      }));

      setUsers(leaderboard);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>🏅 Leaderboard</h2>
      {users.length === 0 ? (
        <p>No data yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #000' }}>
              <th>#</th>
              <th>User</th>
              <th>Coins</th>
              <th>Days Claimed</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.user_id} style={{ borderBottom: '1px solid #ccc' }}>
                <td>{u.rank}</td>
                <td>{u.username}</td>
                <td>{u.total_coins}</td>
                <td>{u.reward_days}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Leaderboard;
