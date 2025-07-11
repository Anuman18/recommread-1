import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGift, FaArrowLeft, FaLock, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Rewards() {
  const navigate = useNavigate();
  const [dailyRewards, setDailyRewards] = useState([]);
  const [claimed, setClaimed] = useState(false);
  const [coins, setCoins] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [redeemables, setRedeemables] = useState([]);
  const [theme, setTheme] = useState("light");

  const bg = theme === "dark" ? "#1a1a1a" : "#f9f9fb";
  const text = theme === "dark" ? "#ffffff" : "#1e1e1e";
  const cardBg = theme === "dark" ? "#2a2a2a" : "#ffffff";

  useEffect(() => {
    // Dummy fetch simulation (replace with real APIs)
    setDailyRewards([
      { day: 1, reward: "+10 🪙", claimed: true },
      { day: 2, reward: "+15 🪙", claimed: true },
      { day: 3, reward: "+20 🪙", claimed: false },
      { day: 4, reward: "+AI Prompt", claimed: false },
      { day: 5, reward: "+30 🪙", claimed: false },
      { day: 6, reward: "+Story Boost", claimed: false },
      { day: 7, reward: "+50 🪙", claimed: false },
    ]);
    setCoins(125);
    setAchievements([
      { title: "📚 First Story", unlocked: true },
      { title: "🔥 3-Day Streak", unlocked: true },
      { title: "🎯 5 Stories", unlocked: false },
      { title: "🏆 Contest Winner", unlocked: false },
    ]);
    setRedeemables([
      { id: 1, title: "Unlock AI Tool", cost: 100, icon: "🤖" },
      { id: 2, title: "Exclusive Avatar", cost: 150, icon: "🧑‍🎨" },
    ]);
  }, []);

  const handleClaim = () => {
    setClaimed(true);
    setCoins(coins + 20); // example
    toast.success("🎉 Reward Claimed!");
  };

  return (
    <div style={{ ...styles.page, backgroundColor: bg, color: text }}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <FaArrowLeft onClick={() => navigate(-1)} style={styles.icon} />
        <h2>Daily Rewards</h2>
        <FaGift style={{ ...styles.icon, color: "gold" }} />
      </div>

      {/* Daily Streak Card */}
      <motion.div
        style={{ ...styles.card, backgroundColor: cardBg }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3>7-Day Login Streak</h3>
        <div style={styles.streakRow}>
          {dailyRewards.map((item, i) => (
            <motion.div
              key={i}
              style={{
                ...styles.dayTile,
                backgroundColor: item.claimed
                  ? "#a0e7a0"
                  : i === 2
                  ? "#ffe595"
                  : "#e0e0e0",
              }}
              animate={i === 2 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <strong>Day {item.day}</strong>
              <span>{item.claimed ? <FaCheckCircle color="green" /> : item.reward}</span>
            </motion.div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleClaim}
          disabled={claimed}
          style={{
            ...styles.claimBtn,
            backgroundColor: claimed ? "#ccc" : "#008cff",
            cursor: claimed ? "not-allowed" : "pointer",
          }}
        >
          {claimed ? "✅ Reward Claimed" : "🎁 Claim Today’s Reward"}
        </motion.button>
      </motion.div>

      {/* Achievements */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Your Achievements</h3>
        <div style={styles.badgeGrid}>
          {achievements.map((badge, i) => (
            <motion.div
              key={i}
              style={{
                ...styles.badge,
                backgroundColor: badge.unlocked ? "#fff8e1" : "#ddd",
                opacity: badge.unlocked ? 1 : 0.5,
              }}
              whileHover={{ scale: 1.06 }}
            >
              {badge.unlocked ? badge.title : <><FaLock /> {badge.title}</>}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reward Coins Summary */}
      <motion.div
        style={{ ...styles.card, backgroundColor: cardBg }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3>🪙 Total Coins: <span style={{ fontWeight: "bold", fontSize: "20px" }}>{coins}</span></h3>
        <p>Write 5 more stories to unlock “Storyteller Badge”</p>
      </motion.div>

      {/* Redeemables */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Redeem Your Coins</h3>
        {redeemables.map((item) => (
          <motion.div
            key={item.id}
            style={{ ...styles.redeemItem, backgroundColor: cardBg }}
            whileHover={{ scale: 1.02 }}
          >
            <div>
              <strong>{item.icon} {item.title}</strong>
              <p style={{ fontSize: "14px", color: "#666" }}>{item.cost} 🪙</p>
            </div>
            <button
              disabled={coins < item.cost}
              style={{
                ...styles.redeemBtn,
                backgroundColor: coins < item.cost ? "#ccc" : "#00c853",
              }}
            >
              {coins < item.cost ? "Insufficient" : "Redeem"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "1.2rem",
    fontFamily: "'Inter', sans-serif",
    minHeight: "100vh",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  icon: {
    fontSize: "18px",
    cursor: "pointer",
  },
  card: {
    padding: "1rem",
    borderRadius: "24px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: "1.5rem",
  },
  streakRow: {
    display: "flex",
    overflowX: "auto",
    gap: "12px",
    margin: "12px 0",
  },
  dayTile: {
    minWidth: "80px",
    height: "80px",
    borderRadius: "20px",
    padding: "0.5rem",
    fontSize: "14px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  },
  claimBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "20px",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
  },
  section: {
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "16px",
    marginBottom: "0.8rem",
    fontWeight: 600,
  },
  badgeGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },
  badge: {
    padding: "10px 16px",
    borderRadius: "20px",
    fontSize: "14px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
  },
  redeemItem: {
    borderRadius: "20px",
    padding: "1rem",
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  redeemBtn: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "20px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Rewards;
