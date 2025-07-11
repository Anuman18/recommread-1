import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaPen } from "react-icons/fa";

function Drafts() {
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const theme = "light"; // Change this manually or link to global context

  useEffect(() => {
    fetch("/api/drafts")
      .then((res) => res.json())
      .then((data) => {
        setDrafts(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load drafts");
        setLoading(false);
      });
  }, []);

  const openDraft = (draft) => {
    navigate("/write", { state: { draft } });
  };

  const bgColor = theme === "dark" ? "#1a1a1a" : "#f9f9fb";
  const textColor = theme === "dark" ? "#ffffff" : "#1e1e1e";
  const cardBg = theme === "dark" ? "#2a2a2a" : "#ffffff";

  return (
    <div style={{ ...styles.page, background: bgColor, color: textColor }}>
      {/* Top Bar */}
      <motion.div
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={styles.header}
      >
        <button onClick={() => navigate(-1)} style={styles.iconBtn}>
          <FaArrowLeft />
        </button>
        <div>
          <h2 style={styles.title}>My Drafts</h2>
          <p style={styles.subtitle}>Continue writing your unfinished stories</p>
        </div>
        <button style={styles.iconBtn}>🔍</button>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={styles.content}
      >
        {loading ? (
          <p style={styles.message}>Loading drafts...</p>
        ) : error ? (
          <p style={styles.message}>{error}</p>
        ) : drafts.length === 0 ? (
          <div style={styles.empty}>
            <p>No drafts found. Start writing your next story!</p>
            <button onClick={() => navigate("/write")} style={styles.ctaBtn}>Start Writing</button>
          </div>
        ) : (
          drafts.map((draft, i) => (
            <motion.div
              key={i}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              style={{ ...styles.card, background: cardBg, color: textColor }}
              onClick={() => openDraft(draft)}
            >
              <div style={styles.cardTop}>
                <h3 style={styles.cardTitle}>{draft.title || "Untitled Story"}</h3>
                <span style={styles.genreTag}>{draft.genre || "#Unknown"}</span>
              </div>
              <p style={styles.bodyPreview}>
                {(draft.body || "").slice(0, 80)}{draft.body?.length > 80 ? "..." : ""}
              </p>
              <div style={styles.cardBottom}>
                <span style={styles.time}>{timeAgo(draft.updated_at)}</span>
                <button style={styles.editBtn}><FaPen /></button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}

// Helper to get time ago text
function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return "Just now";
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

const styles = {
  page: {
    minHeight: "100vh",
    paddingBottom: "4rem",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    position: "sticky",
    top: 0,
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem",
    zIndex: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "bold",
  },
  subtitle: {
    margin: 0,
    fontSize: "12px",
    color: "#777",
  },
  iconBtn: {
    background: "#eee",
    border: "none",
    borderRadius: "12px",
    padding: "0.6rem",
    fontSize: "16px",
    cursor: "pointer",
  },
  content: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  card: {
    borderRadius: "20px",
    padding: "1rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    transition: "0.3s ease",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    margin: 0,
  },
  genreTag: {
    background: "#eee",
    padding: "0.2rem 0.6rem",
    borderRadius: "12px",
    fontSize: "12px",
  },
  bodyPreview: {
    fontSize: "14px",
    color: "#555",
  },
  cardBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "12px",
    color: "#777",
  },
  time: {
    fontStyle: "italic",
  },
  editBtn: {
    border: "none",
    background: "#ddd",
    padding: "0.4rem 0.6rem",
    borderRadius: "10px",
    cursor: "pointer",
  },
  message: {
    textAlign: "center",
    marginTop: "2rem",
    fontSize: "14px",
    color: "#666",
  },
  empty: {
    textAlign: "center",
    marginTop: "4rem",
  },
  ctaBtn: {
    marginTop: "1rem",
    background: "#111",
    color: "#fff",
    padding: "0.8rem 1.2rem",
    borderRadius: "16px",
    border: "none",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default Drafts;
