import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEye, FaHeart, FaComment, FaBook } from "react-icons/fa";

const Analytics = () => {
  const [stats, setStats] = useState({
    views: 0,
    likes: 0,
    comments: 0,
    stories: 0,
  });
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light"); // or 'dark'

  useEffect(() => {
    // Mock API fetch
    setTimeout(() => {
      setStats({
        views: 872,
        likes: 431,
        comments: 128,
        stories: 12,
      });
      setLoading(false);
    }, 1000);
  }, []);

  const bg = theme === "dark" ? "#1a1a1a" : "#f9f9fb";
  const text = theme === "dark" ? "#ffffff" : "#1e1e1e";
  const cardBg = theme === "dark" ? "#2a2a2a" : "#ffffff";

  const statCards = [
    { label: "Total Views", icon: <FaEye />, value: stats.views, color: "#d0f4de" },
    { label: "Total Likes", icon: <FaHeart />, value: stats.likes, color: "#ffd6c2" },
    { label: "Comments", icon: <FaComment />, value: stats.comments, color: "#e0d4fc" },
    { label: "Stories", icon: <FaBook />, value: stats.stories, color: "#d0e1ff" },
  ];

  return (
    <div
      style={{
        backgroundColor: bg,
        color: text,
        minHeight: "100vh",
        padding: "24px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ fontSize: "24px", marginBottom: "12px", fontWeight: 600 }}
      >
        Your Story Dashboard
      </motion.h2>

      {loading ? (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Loading analytics...
        </motion.p>
      ) : (
        <motion.div
          className="stat-cards"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "24px",
          }}
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {statCards.map((card, index) => (
            <motion.div
              key={index}
              style={{
                backgroundColor: cardBg,
                borderRadius: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                background: card.color,
              }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>{card.icon}</div>
              <div style={{ fontWeight: "bold", fontSize: "20px" }}>{card.value}</div>
              <div style={{ fontSize: "14px", opacity: 0.7 }}>{card.label}</div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>Writing Streak</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "10px",
            marginBottom: "32px",
          }}
        >
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                style={{
                  height: "20px",
                  width: "20px",
                  borderRadius: "6px",
                  backgroundColor: i < 4 ? "#5247e8" : "#ccc",
                  opacity: i < 4 ? 1 : 0.5,
                }}
              ></div>
            ))}
        </div>

        <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>Reader Insights</h3>
        <ul style={{ fontSize: "15px", lineHeight: "1.8" }}>
          <li>Top Genres: Romance, Thriller</li>
          <li>Top Devices: Mobile (80%), Desktop (20%)</li>
          <li>Avg. Read Time: 3m 42s</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Analytics;
