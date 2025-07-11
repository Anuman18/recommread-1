import { motion } from "framer-motion";
import { useState } from "react";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const fade = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 * i },
    }),
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.match(/^[\w.-]+@[\w.-]+\.[a-z]{2,}$/)) errs.email = "Invalid email";
    if (form.password.length < 6) errs.password = "Minimum 6 characters";
    if (form.password !== form.confirm) errs.confirm = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("https://api.recommread.in/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Signup successful! Redirecting...");
        setTimeout(() => (window.location.href = "/"), 2000);
      } else {
        setErrors({ general: data.message || "Signup failed" });
      }
    } catch (err) {
      setErrors({ general: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.gradient} />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fade}
        custom={0}
        style={styles.wrapper}
      >
        <motion.h1 variants={fade} custom={1} style={styles.heading}>
          Join RecommRead
        </motion.h1>
        <motion.p variants={fade} custom={2} style={styles.subheading}>
          Start writing your story today!
        </motion.p>

        <motion.div variants={fade} custom={3} style={styles.card}>
          {errors.general && <p style={styles.error}>{errors.general}</p>}
          {success && <p style={styles.success}>{success}</p>}

          <motion.input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            variants={fade}
            custom={4}
          />
          {errors.name && <p style={styles.error}>{errors.name}</p>}

          <motion.input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            variants={fade}
            custom={5}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}

          <motion.input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            variants={fade}
            custom={6}
          />
          {errors.password && <p style={styles.error}>{errors.password}</p>}

          <motion.input
            name="confirm"
            type="password"
            placeholder="Confirm Password"
            value={form.confirm}
            onChange={handleChange}
            style={styles.input}
            variants={fade}
            custom={7}
          />
          {errors.confirm && <p style={styles.error}>{errors.confirm}</p>}

          <motion.button
            style={styles.button}
            onClick={handleSubmit}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            variants={fade}
            custom={8}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </motion.button>

          <motion.p variants={fade} custom={9} style={styles.footer}>
            Already have an account? <a href="/login">Login</a>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}

// 💅 Inline Styles
const styles = {
  container: {
    height: "100vh",
    width: "100%",
    position: "relative",
    fontFamily: "'Inter', 'Google Sans', 'SF Pro', sans-serif",
    backgroundColor: "#fefefe",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5rem",
  },
  gradient: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, #ffe4ec, #e0f7fa, #ede7f6)",
    zIndex: -1,
    filter: "blur(40px)",
  },
  wrapper: {
    width: "100%",
    maxWidth: 400,
    textAlign: "center",
  },
  heading: {
    fontSize: "26px",
    fontWeight: 700,
    marginBottom: "0.3rem",
    color: "#333",
  },
  subheading: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "1.5rem",
  },
  card: {
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    padding: "2rem 1.2rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.7rem",
  },
  input: {
    padding: "0.8rem 1rem",
    borderRadius: "14px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "15px",
    color: "#111",
    background: "#fff",
  },
  button: {
    marginTop: "0.5rem",
    padding: "0.8rem",
    fontSize: "15px",
    fontWeight: "bold",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
  },
  footer: {
    fontSize: "14px",
    marginTop: "1rem",
    color: "#555",
  },
  error: {
    fontSize: "13px",
    color: "#d33",
    textAlign: "left",
    marginTop: "-0.5rem",
  },
  success: {
    fontSize: "13px",
    color: "#157347",
    textAlign: "center",
    marginBottom: "0.5rem",
  },
};

export default Signup;
