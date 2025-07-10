import { useEffect, useState } from 'react';
import supabase from '../services/supabase';

function Rewards() {
  const [claimed, setClaimed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    checkRewardStatus();
  }, []);

  const checkRewardStatus = async () => {
    const user = await supabase.auth.getUser();
    const userId = user.data.user.id;

    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('rewards')
      .select('*')
      .eq('user_id', userId)
      .eq('reward_date', today);

    if (error) {
      setMessage('Error checking reward');
    } else {
      setClaimed(data.length > 0);
    }
    setLoading(false);
  };

  const claimReward = async () => {
    const user = await supabase.auth.getUser();
    const userId = user.data.user.id;

    const { error } = await supabase.from('rewards').insert({
      user_id: userId,
      reward_date: new Date().toISOString().split('T')[0],
      coins: 5,
    });

    if (error) {
      setMessage('Reward claim failed');
    } else {
      setClaimed(true);
      setMessage('🎉 You claimed 5 coins!');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h2>🎁 Daily Reward</h2>
      {loading ? (
        <p>Checking reward...</p>
      ) : claimed ? (
        <p>✅ You’ve already claimed today’s reward!</p>
      ) : (
        <button onClick={claimReward} style={{ padding: '0.75rem 1.5rem' }}>
          Claim 5 Coins 💰
        </button>
      )}
      <p>{message}</p>
    </div>
  );
}

export default Rewards;
