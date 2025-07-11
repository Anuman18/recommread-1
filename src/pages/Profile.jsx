import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPen, FaEye, FaHeart, FaMoon, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [theme, setTheme] = useState("light");
  const [editing, setEditing] = useState(false);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/user/profile")
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.profile);
        setStories(data.stories);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const bg = theme === "dark" ? "#1a1a1a" : "#f9f9fb";
  const cardBg = theme === "dark" ? "#2a2a2a" : "#ffffff";
  const text = theme === "dark" ? "#ffffff" : "#1e1e1e";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleEditSubmit = () => {
    // PUT /api/user/update with updated profile info (optional)
    setEditing(false);
  };

  return (
    <div style={{ ...styles.container, backgroundColor: bg, color: text }}>
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={styles.header}
      >
        <motion.img
          src={profile?.avatar || "https://i.imgur.com/6VBx3io.png"}
          alt="Profile"
          style={styles.avatar}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
        <h2>{profile?.name}</h2>
        <p style={styles.handle}>@{profile?.username}</p>
        <p style={styles.bio}>{profile?.bio || "Storyteller at heart 💫"}</p>
        <button onClick={() => setEditing(true)} style={styles.editBtn}>
          <FaPen style={{ marginRight: "6px" }} /> Edit Profile
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div
        style={styles.statsRow}
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {},
        }}
      >
        <motion.div style={{ ...styles.statCard, backgroundColor: cardBg }} variants={itemVariant}>
          🖊️ <strong>{profile?.totalStories || 0}</strong> Stories
        </motion.div>
        <motion.div style={{ ...styles.statCard, backgroundColor: cardBg }} variants={itemVariant}>
          👁️ <strong>{profile?.totalViews || 0}</strong> Views
        </motion.div>
        <motion.div style={{ ...styles.statCard, backgroundColor: cardBg }} variants={itemVariant}>
          ❤️ <strong>{profile?.totalLikes || 0}</strong> Likes
        </motion.div>
      </motion.div>

      {/* Achievements */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Badges & Milestones</h3>
        <div style={styles.badgeRow}>
          {profile?.badges?.map((badge, i) => (
            <motion.div
              key={i}
              style={{ ...styles.badge, backgroundColor: cardBg }}
              whileHover={{ scale: 1.05 }}
            >
              {badge.emoji} {badge.title}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Published Stories */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Your Stories</h3>
        {stories.length === 0 ? (
          <p>No stories yet. <span onClick={() => navigate("/write")} style={styles.link}>Start Writing →</span></p>
        ) : (
          stories.map((story, i) => (
            <motion.div
              key={i}
              style={{ ...styles.storyCard, backgroundColor: cardBg }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div>
                <strong>{story.title}</strong>
                <p style={styles.meta}>{story.genre} • {story.views} 👁️ • {story.likes} ❤️</p>
              </div>
              <div style={styles.actions}>
                <button onClick={() => navigate("/write", { state: { draft: story } })}>Edit</button>
                <button onClick={() => navigate(`/story/${story.id}`)}>View</button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Settings */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Settings</h3>
        <button
          style={{ ...styles.settingBtn, backgroundColor: cardBg }}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <FaMoon /> Toggle {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
        <button
          style={{ ...styles.settingBtn, backgroundColor: "#ffdddd", color: "#c70000" }}
          onClick={handleLogout}
        >
          <FaSignOutAlt /> Log Out
        </button>
      </div>

      {/* Edit Modal (Basic Inline Edit Example) */}
      {editing && (
        <div style={styles.modal}>
          <h3>Edit Profile</h3>
          <input
            style={styles.input}
            placeholder="Name"
            value={profile?.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <textarea
            style={styles.input}
            placeholder="Bio"
            value={profile?.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          />
          <button style={styles.editBtn} onClick={handleEditSubmit}>Save</button>
        </div>
      )}
    </div>
  );
}

const itemVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const styles = {
  container: {
    minHeight: "100vh",
    padding: "1.2rem",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  handle: {
    fontSize: "14px",
    color: "#888",
    margin: "4px 0",
  },
  bio: {
    fontSize: "14px",
    margin: "6px 0 12px",
  },
  editBtn: {
    background: "#008cff",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "14px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
  },
  statsRow: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "1.8rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  statCard: {
    flex: "1 1 30%",
    padding: "1rem",
    borderRadius: "24px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
    fontSize: "14px",
  },
  section: {
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "16px",
    marginBottom: "1rem",
    fontWeight: 600,
  },
  badgeRow: {
    display: "flex",
    overflowX: "auto",
    gap: "1rem",
  },
  badge: {
    padding: "8px 16px",
    borderRadius: "24px",
    fontSize: "14px",
    whiteSpace: "nowrap",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  },
  storyCard: {
    borderRadius: "20px",
    padding: "1rem",
    marginBottom: "1rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  meta: {
    fontSize: "12px",
    color: "#888",
    marginTop: "4px",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  link: {
    color: "#0077ff",
    cursor: "pointer",
  },
  settingBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "20px",
    marginBottom: "1rem",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "none",
    cursor: "pointer",
  },
  modal: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#fff",
    padding: "1rem",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    boxShadow: "0 -2px 12px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "16px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
};

export default Profile;
