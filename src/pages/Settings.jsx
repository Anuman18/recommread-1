import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Settings() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");
  const [aiTone, setAiTone] = useState("Friendly");

  useEffect(() => {
    // Load user preferences (mocked)
    const userSettings = {
      theme: "light",
      notifications: true,
      language: "en",
      aiTone: "Friendly",
    };
    setTheme(userSettings.theme);
    setNotifications(userSettings.notifications);
    setLanguage(userSettings.language);
    setAiTone(userSettings.aiTone);
  }, []);

  const handleToggle = async (field, value) => {
    if (field === "theme") setTheme(value);
    if (field === "notifications") setNotifications(value);
    if (field === "aiTone") setAiTone(value);
    if (field === "language") setLanguage(value);

    try {
      // Simulate PUT API call
      toast.success("Preferences updated");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const confirmLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.clear();
      toast.success("Logged out");
      navigate("/login");
    }
  };

  const confirmDelete = () => {
    if (window.confirm("This will permanently delete your account. Proceed?")) {
      toast.success("Account deleted");
      navigate("/signup");
    }
  };

  const bg = theme === "dark" ? "#1a1a1a" : "#f9f9fb";
  const cardBg = theme === "dark" ? "#2a2a2a" : "#ffffff";
  const textColor = theme === "dark" ? "#ffffff" : "#1e1e1e";

  return (
    <div style={{ ...styles.container, backgroundColor: bg, color: textColor }}>
      {/* Header */}
      <motion.div
        style={styles.header}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.4 }}
      >
        <FaArrowLeft style={styles.icon} onClick={() => navigate(-1)} />
        <h2 style={{ margin: 0 }}>Settings</h2>
        <FaUserCircle
          style={styles.avatar}
          onClick={() => navigate("/profile")}
        />
      </motion.div>

      {/* Section 1: Account */}
      <Section title="Account" delay={0.1} bg={cardBg}>
        <Item label="✏️ Edit Profile" onClick={() => navigate("/profile")} />
        <Item label="🔐 Change Password" />
        <Item label="🧾 Manage Subscriptions" />
      </Section>

      {/* Section 2: Preferences */}
      <Section title="App Preferences" delay={0.2} bg={cardBg}>
        <ToggleItem
          label="🎨 Theme"
          value={theme === "dark"}
          onChange={(val) => handleToggle("theme", val ? "dark" : "light")}
        />
        <ToggleItem
          label="🔔 Notifications"
          value={notifications}
          onChange={(val) => handleToggle("notifications", val)}
        />
        <SelectItem
          label="🌐 Language"
          value={language}
          options={["en", "hi", "es"]}
          onChange={(e) => handleToggle("language", e.target.value)}
        />
        <SelectItem
          label="💬 AI Assistant Tone"
          value={aiTone}
          options={["Friendly", "Formal", "Minimalist"]}
          onChange={(e) => handleToggle("aiTone", e.target.value)}
        />
      </Section>

      {/* Section 3: Privacy */}
      <Section title="Privacy & Security" delay={0.3} bg={cardBg}>
        <Item label="📜 Terms of Use" />
        <Item label="🔏 Privacy Policy" />
        <Item
          label="🗑️ Delete My Account"
          danger
          onClick={confirmDelete}
        />
      </Section>

      {/* Section 4: About */}
      <Section title="About RecommRead" delay={0.4} bg={cardBg}>
        <Item label="📱 App Version: 1.0.0" />
        <Item label="⭐ Rate Us" />
        <Item label="✉️ Contact Support" />
      </Section>

      {/* Log Out */}
      <motion.button
        style={styles.logoutBtn}
        onClick={confirmLogout}
        whileTap={{ scale: 0.95 }}
      >
        🚪 Log Out
      </motion.button>
    </div>
  );
}

const Section = ({ title, children, delay, bg }) => (
  <motion.div
    style={{ ...styles.card, backgroundColor: bg }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <h4 style={styles.sectionTitle}>{title}</h4>
    {children}
  </motion.div>
);

const Item = ({ label, onClick, danger }) => (
  <motion.div
    style={{
      ...styles.item,
      color: danger ? "#e53935" : undefined,
      fontWeight: danger ? 600 : undefined,
    }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
  >
    {label}
  </motion.div>
);

const ToggleItem = ({ label, value, onChange }) => (
  <div style={styles.toggleItem}>
    <span>{label}</span>
    <motion.div
      style={{
        ...styles.switchTrack,
        backgroundColor: value ? "#4caf50" : "#ccc",
      }}
      onClick={() => onChange(!value)}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        style={styles.switchThumb}
        animate={{ x: value ? 22 : 2 }}
        transition={{ type: "spring", stiffness: 400 }}
      />
    </motion.div>
  </div>
);

const SelectItem = ({ label, value, options, onChange }) => (
  <div style={styles.selectItem}>
    <label>{label}</label>
    <select value={value} onChange={onChange} style={styles.select}>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const styles = {
  container: {
    padding: "1rem",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
  icon: {
    fontSize: "20px",
    cursor: "pointer",
  },
  avatar: {
    fontSize: "26px",
    cursor: "pointer",
  },
  card: {
    padding: "1rem",
    marginBottom: "1rem",
    borderRadius: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  sectionTitle: {
    marginBottom: "0.8rem",
    fontWeight: "600",
    fontSize: "16px",
  },
  item: {
    padding: "0.75rem 0",
    borderBottom: "1px solid #eee",
    cursor: "pointer",
    fontSize: "15px",
  },
  toggleItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem 0",
    borderBottom: "1px solid #eee",
    fontSize: "15px",
  },
  switchTrack: {
    width: "40px",
    height: "20px",
    borderRadius: "999px",
    position: "relative",
    cursor: "pointer",
  },
  switchThumb: {
    width: "16px",
    height: "16px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    position: "absolute",
    top: "2px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
  },
  selectItem: {
    margin: "0.75rem 0",
  },
  select: {
    width: "100%",
    padding: "0.6rem",
    fontSize: "15px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    marginTop: "6px",
  },
  logoutBtn: {
    width: "100%",
    padding: "1rem",
    backgroundColor: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    fontSize: "16px",
    marginTop: "2rem",
    fontWeight: 600,
  },
};

export default Settings;
