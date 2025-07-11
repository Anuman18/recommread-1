import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaPenNib,
  FaTrophy,
  FaGift,
  FaUser,
} from "react-icons/fa";

const navItems = [
  { path: "/", label: "Home", icon: <FaHome /> },
  { path: "/write", label: "Write", icon: <FaPenNib /> },
  { path: "/contests", label: "Contests", icon: <FaTrophy /> },
  { path: "/rewards", label: "Rewards", icon: <FaGift /> },
  { path: "/profile", label: "Profile", icon: <FaUser /> },
];

const Navbar = ({ theme = "light" }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const backgroundColor =
    theme === "dark" ? "rgba(26,26,26,0.9)" : "rgba(255,255,255,0.8)";
  const textColor = theme === "dark" ? "#ffffff" : "#1e1e1e";
  const activeColor = theme === "dark" ? "#e0d4fc" : "#5247e8";

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        bottom: "12px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        maxWidth: "400px",
        background: backgroundColor,
        backdropFilter: "blur(10px)",
        borderRadius: "24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        padding: "8px 12px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      {navItems.map((item, index) => {
        const active = isActive(item.path);
        return (
          <motion.div
            key={index}
            onClick={() => navigate(item.path)}
            whileTap={{ scale: 0.9 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: active ? activeColor : textColor,
              fontSize: "12px",
              cursor: "pointer",
              position: "relative",
              padding: "6px",
              minWidth: "48px",
            }}
          >
            <motion.div
              animate={active ? { scale: 1.2 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{
                fontSize: "20px",
                marginBottom: "2px",
              }}
            >
              {item.icon}
            </motion.div>
            <div>{item.label}</div>
            {active && (
              <motion.div
                layoutId="navbar-active-dot"
                style={{
                  position: "absolute",
                  bottom: 2,
                  height: "6px",
                  width: "6px",
                  borderRadius: "50%",
                  background: activeColor,
                }}
              />
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default Navbar;
