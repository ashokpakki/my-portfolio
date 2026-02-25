import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme, isTransitioning } = useTheme();
    const isDark = theme === "dark";

    return (
        <motion.button
            onClick={(e) => toggleTheme(e)}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            whileTap={{ scale: 0.85 }}
            disabled={isTransitioning}
            style={{
                position: "relative",
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                cursor: isTransitioning ? "wait" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-primary)",
                overflow: "hidden",
                transition: "border-color 0.3s ease, background 0.3s ease",
            }}
        >
            {/* Sun — warm golden glow */}
            <motion.svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{
                    scale: isDark ? 0 : 1,
                    rotate: isDark ? -90 : 0,
                    opacity: isDark ? 0 : 1,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "absolute", color: isDark ? "currentColor" : "#e8a040" }}
            >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </motion.svg>

            {/* Moon — cool cyan glow */}
            <motion.svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{
                    scale: isDark ? 1 : 0,
                    rotate: isDark ? 0 : 90,
                    opacity: isDark ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "absolute", color: isDark ? "#4ecdc4" : "currentColor" }}
            >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </motion.svg>
        </motion.button>
    );
}
