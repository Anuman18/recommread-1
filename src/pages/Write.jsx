import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaImage } from "react-icons/fa";

const genres = ["#Drama", "#Romance", "#Sci-Fi", "#Fantasy", "#Thriller", "#Mystery"];

function Write() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("Saved ✓");
  const [lastSaved, setLastSaved] = useState(Date.now());

  const charCount = body.length;
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;

  // Auto-save logic every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastSaved > 2000) autoSave();
    }, 2500);
    return () => clearInterval(interval);
  }, [title, genre, body]);

  const autoSave = () => {
    if (title || body) {
      localStorage.setItem("recommread-draft", JSON.stringify({ title, genre, body }));
      setStatus("Saved ✓");
      setLastSaved(Date.now());
    }
  };

  const validate = () => {
    const errors = {};
    if (!title.trim()) errors.title = "Title is required";
    if (!genre) errors.genre = "Select a genre";
    if (body.length < 300) errors.body = "Minimum 300 characters";
    return errors;
  };

  const saveDraft = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) return alert(Object.values(errors).join("\n"));
    setStatus("Saving...");
    try {
      await fetch("/api/save-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, genre, body }),
      });
      setStatus("Saved ✓");
    } catch {
      setStatus("Save failed");
    }
  };

  const publish = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) return alert(Object.values(errors).join("\n"));
    setStatus("Publishing...");
    try {
      await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, genre, body }),
      });
      setStatus("Published 🎉");
      setTitle("");
      setGenre("");
      setBody("");
    } catch {
      setStatus("Publish failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.bgBlur} />

      {/* Top Bar */}
      <motion.div
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={styles.topBar}
      >
        <button style={styles.iconBtn}><FaArrowLeft /></button>
        <h2 style={styles.pageTitle}>New Story</h2>
        <span style={styles.status}>{status}</span>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={styles.editor}
      >
        <input
          type="text"
          placeholder="Enter story title..."
          maxLength={80}
          style={styles.titleInput}
          value={title}
          onChange={(e) => { setTitle(e.target.value); setStatus("Saving..."); }}
        />

        <div style={styles.genreRow}>
          {genres.map((g, i) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              key={i}
              onClick={() => { setGenre(g); setStatus("Saving..."); }}
              style={{
                ...styles.genreBtn,
                background: genre === g ? "#111" : "#eee",
                color: genre === g ? "#fff" : "#333",
              }}
            >
              {g}
            </motion.button>
          ))}
        </div>

        <textarea
          rows={10}
          style={styles.body}
          placeholder="Once upon a time..."
          value={body}
          onChange={(e) => { setBody(e.target.value); setStatus("Saving..."); }}
        />
        <div style={styles.counter}>{charCount} chars • {wordCount} words</div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        style={styles.footer}
      >
        <button onClick={saveDraft} style={styles.actionBtn}>Save Draft</button>
        <button onClick={publish} style={styles.actionBtn}>Publish</button>
        <button style={styles.iconBtn}><FaImage /></button>
      </motion.div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Inter', sans-serif",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fce4ec, #ede7f6)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    paddingBottom: "5rem",
    color: "#111",
  },
  bgBlur: {
    position: "absolute",
    inset: 0,
    zIndex: -1,
    backdropFilter: "blur(20px)",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(10px)",
    position: "sticky",
    top: 0,
    zIndex: 20,
    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
  },
  iconBtn: {
    border: "none",
    background: "#eee",
    borderRadius: "12px",
    padding: "0.6rem 0.8rem",
    fontSize: "16px",
    cursor: "pointer",
  },
  pageTitle: {
    fontSize: "18px",
    fontWeight: "600",
  },
  status: {
    fontSize: "13px",
    color: "#555",
  },
  editor: {
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  titleInput: {
    fontSize: "22px",
    fontWeight: "600",
    padding: "0.8rem 1rem",
    borderRadius: "20px",
    border: "none",
    outline: "none",
    background: "#fff",
    color: "#111",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  },
  genreRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  genreBtn: {
    fontSize: "14px",
    padding: "0.4rem 1rem",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    transition: "0.2s ease",
  },
  body: {
    fontSize: "16px",
    lineHeight: "1.8",
    padding: "1rem",
    borderRadius: "20px",
    border: "none",
    outline: "none",
    resize: "none",
    background: "#fff",
    color: "#111",
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
  },
  counter: {
    fontSize: "13px",
    textAlign: "right",
    color: "#555",
    marginTop: "-0.5rem",
  },
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    background: "#fff",
    padding: "0.8rem 1.2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
  },
  actionBtn: {
    background: "#111",
    color: "#fff",
    padding: "0.7rem 1.2rem",
    borderRadius: "14px",
    border: "none",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
  },
};

export default Write;
