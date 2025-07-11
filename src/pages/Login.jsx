import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 * i, duration: 0.6 },
    }),
  };

  return (
    <div style={styles.container}>
      {/* Background Gradient */}
      <div style={styles.gradient} />

      {/* Animated Wrapper */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        style={styles.wrapper}
      >
        {/* Logo */}
        <motion.h1 variants={fadeIn} custom={1} style={styles.logo}>
          📖 RecommRead
        </motion.h1>

        {/* Tagline */}
        <motion.p variants={fadeIn} custom={2} style={styles.tagline}>
          Read. Write. Inspire.
        </motion.p>

        {/* Form Card */}
        <motion.div variants={fadeIn} custom={3} style={styles.card}>
          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            variants={fadeIn}
            custom={4}
          />
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            variants={fadeIn}
            custom={5}
          />

          <motion.div
            variants={fadeIn}
            custom={6}
            style={styles.forgotRow}
          >
            <a href="#" style={styles.forgot}>
              Forgot Password?
            </a>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            variants={fadeIn}
            custom={7}
            style={styles.loginBtn}
          >
            Login
          </motion.button>

          <motion.div variants={fadeIn} custom={8} style={styles.divider}>
            <span style={styles.dividerLine} />
            <span style={styles.dividerText}>OR</span>
            <span style={styles.dividerLine} />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            variants={fadeIn}
            custom={9}
            style={styles.googleBtn}
          >
            <FaGoogle style={{ marginRight: 10 }} />
            Login with Google
          </motion.button>
        </motion.div>

        {/* Sign Up CTA */}
        <motion.p
          variants={fadeIn}
          custom={10}
          style={styles.signup}
        >
          Don’t have an account? <a href="#">Sign up</a>
        </motion.p>
      </motion.div>
    </div>
  );
}

// 🎨 Inline Styles
const styles = {
  container: {
    height: "100vh",
    width: "100%",
    fontFamily: `'Inter', 'Google Sans', 'SF Pro', sans-serif`,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    padding: "1rem",
    background: "#f5f7fa",
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, #ffe9e9, #e0f7fa, #fff0f5)",
    zIndex: -1,
    filter: "blur(30px)",
  },
  wrapper: {
    width: "100%",
    maxWidth: 400,
    textAlign: "center",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "0.3rem",
  },
  tagline: {
    fontSize: "15px",
    color: "#777",
    marginBottom: "1.5rem",
  },
  card: {
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(12px)",
    borderRadius: "20px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    padding: "2rem 1.2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    border: "1px solid #ccc",
    borderRadius: "12px",
    padding: "0.8rem 1rem",
    fontSize: "15px",
    outline: "none",
    background: "#fff",
  },
  forgotRow: {
    textAlign: "right",
    width: "100%",
  },
  forgot: {
    fontSize: "13px",
    color: "#444",
    textDecoration: "none",
  },
  loginBtn: {
    padding: "0.8rem",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: 500,
    cursor: "pointer",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "1rem 0",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "#ccc",
  },
  dividerText: {
    fontSize: "12px",
    color: "#777",
  },
  googleBtn: {
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "12px",
    padding: "0.7rem 1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: 500,
    cursor: "pointer",
  },
  signup: {
    marginTop: "1.2rem",
    fontSize: "14px",
    color: "#555",
  },
};

export default Login;
