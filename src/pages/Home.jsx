import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaPenNib, FaHome, FaTrophy, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const mockStories = [
  {
    id: 1,
    title: "Midnight Train",
    author: "Aarya",
    genre: "Mystery",
    preview: "The train arrived at 12:04 a.m. Nobody was driving it...",
  },
  {
    id: 2,
    title: "Hearts in Tokyo",
    author: "Kavya S.",
    genre: "Romance",
    preview: "Cherry blossoms weren’t the only thing falling this spring...",
  },
  {
    id: 3,
    title: "The Last Algorithm",
    author: "Dev Y.",
    genre: "Sci-Fi",
    preview: "When AI surpassed gods, only one human dared question it...",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme] = useState("light");

  useEffect(() => {
    // Simulate fetch
    setTimeout(() => {
      setStories(mockStories);
      setLoading(false);
    }, 800);
  }, []);

  const filteredStories = stories.filter(
    (story) =>
      story.title.toLowerCase().includes(search.toLowerCase()) ||
      story.genre.toLowerCase().includes(search.toLowerCase())
  );

  const handleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id]
    );
  };

  const handleRead = (story) => {
    navigate("/story", { state: { story } });
  };

  const bg = theme === "dark" ? "#1a1a1a" : "#ffffff";
  const text = theme === "dark" ? "#ffffff" : "#1e1e1e";

  return (
    <div style={{ ...styles.container, backgroundColor: bg, color: text }}>
      {/* Top Bar */}
      <motion.div
        style={styles.topBar}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={styles.logo}>RecommRead</h2>
        <div style={styles.searchBox}>
          <FaSearch style={{ marginRight: 8, color: "#aaa" }} />
          <input
            placeholder="Search by title or genre"
            style={styles.input}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Banner */}
      <motion.div
        style={styles.banner}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        ✨ Write your first story today!
      </motion.div>

      {/* Story Feed */}
      <div style={styles.feed}>
        {loading ? (
          <p>Loading stories...</p>
        ) : filteredStories.length === 0 ? (
          <p>No stories found. Try another search!</p>
        ) : (
          filteredStories.map((story, i) => (
            <motion.div
              key={story.id}
              style={styles.card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div style={styles.cardTop}>
                <h3 style={styles.title}>{story.title}</h3>
                <span style={styles.bookmark} onClick={() => handleBookmark(story.id)}>
                  {bookmarks.includes(story.id) ? "💖" : "🔖"}
                </span>
              </div>
              <p style={styles.meta}>by {story.author} • #{story.genre}</p>
              <p style={styles.preview}>{story.preview}</p>
              <motion.button
                style={styles.readBtn}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRead(story)}
              >
                Read
              </motion.button>
            </motion.div>
          ))
        )}
      </div>

      {/* Bottom Navigation */}
      {/* <motion.div
        style={styles.nav}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <NavIcon icon={<FaHome />} label="Home" active />
        <NavIcon icon={<FaPenNib />} label="Write" onClick={() => navigate("/write")} />
        <NavIcon icon={<FaTrophy />} label="Contests" onClick={() => navigate("/contests")} />
        <NavIcon icon={<FaUser />} label="Profile" onClick={() => navigate("/profile")} />
      </motion.div> */}
    </div>
  );
}

const NavIcon = ({ icon, label, active, onClick }) => (
  <motion.div
    style={{
      ...styles.navIcon,
      color: active ? "#5247e8" : "#888",
    }}
    onClick={onClick}
    whileTap={{ scale: 0.85 }}
  >
    {icon}
    <small style={{ fontSize: "10px", marginTop: 4 }}>{label}</small>
    {active && <motion.div style={styles.navGlow} layoutId="active-tab" />}
  </motion.div>
);

const styles = {
  container: {
    fontFamily: "'Inter', sans-serif",
    padding: "1rem",
    paddingBottom: "80px",
    minHeight: "100vh",
  },
  topBar: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    marginBottom: "1rem",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#5247e8",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    background: "#f1f1f1",
    padding: "0.6rem 1rem",
    borderRadius: "20px",
  },
  input: {
    border: "none",
    outline: "none",
    fontSize: "14px",
    background: "transparent",
    flex: 1,
  },
  banner: {
    background: "#d0f4de",
    padding: "0.75rem 1rem",
    borderRadius: "20px",
    fontWeight: "600",
    marginBottom: "1rem",
    textAlign: "center",
  },
  feed: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "1rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    position: "relative",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
    margin: 0,
  },
  meta: {
    fontSize: "13px",
    color: "#666",
    marginBottom: "0.5rem",
  },
  preview: {
    fontSize: "14px",
    color: "#333",
    marginBottom: "1rem",
  },
  readBtn: {
    background: "#5247e8",
    color: "#fff",
    border: "none",
    borderRadius: "16px",
    padding: "0.5rem 1rem",
    fontSize: "14px",
    cursor: "pointer",
  },
  bookmark: {
    fontSize: "18px",
    cursor: "pointer",
  },
  nav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#ffffffcc",
    backdropFilter: "blur(10px)",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "0.75rem 1rem",
    borderTop: "1px solid #eee",
    borderRadius: "20px 20px 0 0",
  },
  navIcon: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "20px",
    position: "relative",
    cursor: "pointer",
  },
  navGlow: {
    position: "absolute",
    top: -6,
    width: "8px",
    height: "8px",
    backgroundColor: "#5247e8",
    borderRadius: "50%",
  },
};
