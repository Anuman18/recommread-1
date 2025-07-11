import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaTrophy, FaClock, FaMagic, FaBook } from "react-icons/fa";

function Contests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light"); // Change manually or link to global context
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/contests")
      .then((res) => res.json())
      .then((data) => {
        setContests(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const now = new Date();
  const activeContests = contests.filter(c => new Date(c.endDate) > now);
  const pastContests = contests.filter(c => new Date(c.endDate) <= now);

  const bgColor = theme === "dark" ? "#1a1a1a" : "#f9f9fb";
  const textColor = theme === "dark" ? "#ffffff" : "#1e1e1e";
  const cardBg = theme === "dark" ? "#2a2a2a" : "#ffffff";

  const timeLeft = (endDate) => {
    const timeDiff = new Date(endDate) - now;
    if (timeDiff < 0) return "Ended";
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return `${days} day${days !== 1 ? "s" : ""} left`;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }
    })
  };

  return (
    <div style={{ ...styles.page, background: bgColor, color: textColor }}>
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={styles.header}
      >
        <button onClick={() => navigate(-1)} style={styles.iconBtn}>
          <FaArrowLeft />
        </button>
        <h2 style={styles.title}>Writing Contests</h2>
        <button style={styles.iconBtn}><FaBook /></button>
      </motion.div>

      {/* Ongoing Contests */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Ongoing Contests</h3>
        {loading ? (
          <p>Loading contests...</p>
        ) : activeContests.length === 0 ? (
          <div style={styles.empty}>
            <FaMagic size={48} />
            <p>No contests right now. Stay tuned!</p>
            <button style={styles.suggestBtn}>Suggest a Contest Idea</button>
          </div>
        ) : (
          activeContests.map((contest, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate="show"
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              style={{ ...styles.card, background: cardBg, color: textColor }}
            >
              <div style={styles.cardTop}>
                <h4 style={styles.cardTitle}>{contest.title}</h4>
                <span style={styles.prize}>
                  {contest.prize.includes("₹") ? "🏆" : "🎁"} {contest.prize}
                </span>
              </div>
              <p style={styles.cardDesc}>{contest.description}</p>
              <div style={styles.cardBottom}>
                <span style={styles.time}><FaClock /> {timeLeft(contest.endDate)}</span>
                <button
                  style={styles.cta}
                  onClick={() => navigate("/write", { state: { contest } })}
                >
                  Participate
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Past Contests */}
      {pastContests.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Previous Contests</h3>
          {pastContests.map((c, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate="show"
              variants={cardVariants}
              whileHover={{ scale: 1.01 }}
              style={{ ...styles.card, background: cardBg }}
            >
              <div style={styles.cardTop}>
                <h4 style={styles.cardTitle}>{c.title}</h4>
                <button style={styles.viewBtn} onClick={() => alert("Winners Coming Soon")}>
                  View Winners
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    paddingBottom: "4rem",
    padding: "1rem",
    fontFamily: "'Inter', sans-serif"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem"
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    margin: 0
  },
  iconBtn: {
    background: "#eee",
    border: "none",
    borderRadius: "12px",
    padding: "0.6rem",
    fontSize: "16px",
    cursor: "pointer"
  },
  section: {
    marginBottom: "2rem"
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "0.5rem"
  },
  card: {
    borderRadius: "24px",
    padding: "1rem",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    marginBottom: "1rem",
    transition: "0.3s ease",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    margin: 0
  },
  prize: {
    fontSize: "14px",
    background: "#ffe7b2",
    padding: "0.3rem 0.7rem",
    borderRadius: "16px"
  },
  cardDesc: {
    fontSize: "14px",
    color: "#666"
  },
  time: {
    fontSize: "13px",
    color: "#888",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem"
  },
  cardBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cta: {
    background: "#111",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "16px",
    fontSize: "14px",
    border: "none",
    cursor: "pointer"
  },
  empty: {
    textAlign: "center",
    marginTop: "2rem",
    color: "#999"
  },
  suggestBtn: {
    marginTop: "1rem",
    background: "#ddd",
    border: "none",
    padding: "0.7rem 1.2rem",
    borderRadius: "16px",
    cursor: "pointer"
  },
  viewBtn: {
    background: "#eee",
    border: "none",
    borderRadius: "12px",
    padding: "0.4rem 0.8rem",
    fontSize: "13px",
    cursor: "pointer"
  }
};

export default Contests;
