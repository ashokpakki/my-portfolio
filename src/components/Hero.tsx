import { motion } from "framer-motion";
import { SiLinkedin, SiGithub, SiLeetcode } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import { HiMapPin } from "react-icons/hi2";

const socials = [
    {
        icon: <SiGithub size={18} />,
        label: "GitHub",
        href: "https://github.com/ashokpakki",
    },
    {
        icon: <SiLinkedin size={18} />,
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/pakkiashok/",
    },
    {
        icon: <SiLeetcode size={18} />,
        label: "LeetCode",
        href: "https://www.leetcode.com/u/Nightout/",
    },
    {
        icon: <HiOutlineMail size={18} />,
        label: "Email",
        href: "mailto:pakkiashok18@gmail.com",
    },
];

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
};

export default function Hero() {
    return (
        <section
            id="hero"
            style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            {/* Content */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                style={{
                    position: "relative",
                    zIndex: 2,
                    textAlign: "center",
                    maxWidth: 800,
                    padding: "0 24px",
                }}
            >
                {/* Role badge */}
                <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
                    <span
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "8px 20px",
                            borderRadius: "var(--radius-full)",
                            border: "1px solid var(--border-hover)",
                            background: "var(--bg-card)",
                            fontSize: "0.85rem",
                            fontWeight: 500,
                            color: "var(--accent)",
                            letterSpacing: "0.03em",
                        }}
                    >
                        <span
                            className="status-dot"
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: "var(--accent)",
                                boxShadow: "0 0 12px var(--accent-glow-strong)",
                                animation: "pulse-glow 2s ease-in-out infinite",
                            }}
                        />
                        Available for Opportunities
                    </span>
                </motion.div>

                {/* Name with depth/shadow for dark mode */}
                <motion.h1
                    variants={fadeUp}
                    style={{
                        fontSize: "clamp(5rem, 20vw, 8rem)",
                        fontWeight: 900,
                        lineHeight: 1.05,
                        letterSpacing: "-0.03em",
                        marginBottom: 20,
                    }}
                >
                    <span style={{ color: "var(--text-primary)" }}>Ashok</span>{" "}
                    <span className="gradient-text-animated">Pakki</span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    variants={fadeUp}
                    style={{
                        fontSize: "clamp(1.05rem, 2.5vw, 1.3rem)",
                        lineHeight: 1.7,
                        color: "var(--text-secondary)",
                        maxWidth: 600,
                        margin: "0 auto 16px",
                    }}
                >
                    Software developer who builds clean, performant web applications.
                    Focused on crafting intuitive user experiences with React, Java, and
                    modern backend architectures.
                </motion.p>

                {/* Location */}
                <motion.div
                    variants={fadeUp}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        marginBottom: 32,
                        color: "var(--text-tertiary)",
                        fontSize: "0.9rem",
                    }}
                >
                    <HiMapPin size={16} style={{ color: "var(--accent)" }} />
                    Hyderabad, India
                </motion.div>

                {/* Social Links */}
                <motion.div
                    variants={fadeUp}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 12,
                        flexWrap: "wrap",
                    }}
                >
                    {socials.map((s) => (
                        <motion.a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.label}
                            whileHover={{ y: -3, boxShadow: "0 0 24px var(--accent-glow)" }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "10px 18px",
                                borderRadius: "var(--radius-full)",
                                border: "1px solid var(--border)",
                                background: "var(--bg-card)",
                                color: "var(--text-secondary)",
                                textDecoration: "none",
                                fontSize: "0.85rem",
                                fontWeight: 500,
                                transition: "color 0.3s ease, border-color 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = "var(--accent)";
                                e.currentTarget.style.borderColor = "var(--accent)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = "var(--text-secondary)";
                                e.currentTarget.style.borderColor = "var(--border)";
                            }}
                        >
                            {s.icon}
                            {s.label}
                        </motion.a>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll indicator — thin growing line */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                style={{
                    position: "absolute",
                    bottom: 40,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    color: "var(--text-tertiary)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                }}
            >
                <span>Scroll</span>
                <motion.div
                    style={{
                        width: 1,
                        height: 24,
                        background: "var(--accent)",
                        borderRadius: 1,
                        transformOrigin: "top",
                    }}
                    animate={{ scaleY: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            {/* Pulse glow keyframe — inlined since it's compact */}
            <style>{`
                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 8px var(--accent-glow); }
                    50% { box-shadow: 0 0 18px var(--accent-glow-strong); }
                }
            `}</style>
        </section>
    );
}
