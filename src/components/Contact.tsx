import { useState } from "react";
import { motion } from "framer-motion";
import { SiLinkedin, SiGithub, SiLeetcode } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import SectionReveal from "./SectionReveal";

const contactLinks = [
    {
        icon: <HiOutlineMail size={20} />,
        label: "pakkiashok18@gmail.com",
        href: "mailto:pakkiashok18@gmail.com",
    },
    {
        icon: <SiLinkedin size={18} />,
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/pakkiashok/",
    },
    {
        icon: <SiGithub size={18} />,
        label: "GitHub",
        href: "https://github.com/ashokpakki",
    },
    {
        icon: <SiLeetcode size={18} />,
        label: "LeetCode",
        href: "https://www.leetcode.com/u/Nightout/",
    },
];

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <section id="contact" className="section-padding" style={{ position: "relative" }}>
            <div className="mesh-gradient two" style={{ opacity: 0.08 }} />

            <div className="section-container">
                {/* Header */}
                <SectionReveal>
                    <div style={{ textAlign: "center", marginBottom: 64 }}>
                        <p
                            style={{
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                color: "var(--accent)",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                marginBottom: 12,
                            }}
                        >
                            Get in Touch
                        </p>
                        <h2
                            className="gradient-text"
                            style={{
                                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                                fontWeight: 800,
                                letterSpacing: "-0.02em",
                                lineHeight: 1.15,
                                marginBottom: 20,
                            }}
                        >
                            Let's build something together
                        </h2>
                        <p
                            style={{
                                fontSize: "1.05rem",
                                lineHeight: 1.8,
                                color: "var(--text-secondary)",
                                maxWidth: 600,
                                margin: "0 auto",
                            }}
                        >
                            Whether you have a project idea, want to collaborate, or just want
                            to say hello — my inbox is always open. I'll get back to you as
                            soon as possible.
                        </p>
                    </div>
                </SectionReveal>

                {/* Split layout */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
                        gap: 48,
                        alignItems: "start",
                    }}
                >
                    {/* Left — Contact info */}
                    <SectionReveal direction="left" delay={0.1}>
                        <div>
                            <h3
                                style={{
                                    fontSize: "1.2rem",
                                    fontWeight: 700,
                                    marginBottom: 16,
                                }}
                            >
                                Reach me directly
                            </h3>
                            <p
                                style={{
                                    fontSize: "0.95rem",
                                    lineHeight: 1.7,
                                    color: "var(--text-secondary)",
                                    marginBottom: 32,
                                }}
                            >
                                Currently based in Hyderabad, India. Open to full-time roles, freelance
                                projects, and interesting conversations about technology and engineering.
                            </p>

                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {contactLinks.map((link) => (
                                    <motion.a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{
                                            x: 4,
                                            boxShadow: "0 0 20px var(--accent-glow)",
                                        }}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 14,
                                            padding: "14px 20px",
                                            borderRadius: "var(--radius-md)",
                                            border: "1px solid var(--border)",
                                            background: "var(--bg-card)",
                                            color: "var(--text-secondary)",
                                            textDecoration: "none",
                                            fontSize: "0.9rem",
                                            fontWeight: 500,
                                            transition: "color 0.3s, border-color 0.3s",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = "var(--text-primary)";
                                            e.currentTarget.style.borderColor = "var(--accent)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = "var(--text-secondary)";
                                            e.currentTarget.style.borderColor = "var(--border)";
                                        }}
                                    >
                                        <span style={{ color: "var(--accent)" }}>{link.icon}</span>
                                        {link.label}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </SectionReveal>

                    {/* Right — Form */}
                    <SectionReveal direction="right" delay={0.2}>
                        <motion.div
                            className="card-gradient-border"
                            style={{ padding: 32 }}
                        >
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{
                                        textAlign: "center",
                                        padding: "40px 20px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: "50%",
                                            background: "var(--accent-glow)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            margin: "0 auto 16px",
                                        }}
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="var(--accent)"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                    </div>
                                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8 }}>
                                        Message sent!
                                    </h3>
                                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                                        Thanks for reaching out. I'll get back to you soon.
                                    </p>
                                </motion.div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 16,
                                    }}
                                >
                                    <div>
                                        <label
                                            style={{
                                                display: "block",
                                                fontSize: "0.8rem",
                                                fontWeight: 600,
                                                color: "var(--text-secondary)",
                                                marginBottom: 6,
                                                letterSpacing: "0.04em",
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Your name"
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            style={{
                                                display: "block",
                                                fontSize: "0.8rem",
                                                fontWeight: 600,
                                                color: "var(--text-secondary)",
                                                marginBottom: 6,
                                                letterSpacing: "0.04em",
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="you@example.com"
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            style={{
                                                display: "block",
                                                fontSize: "0.8rem",
                                                fontWeight: 600,
                                                color: "var(--text-secondary)",
                                                marginBottom: 6,
                                                letterSpacing: "0.04em",
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            placeholder="Tell me about your project or idea..."
                                            rows={5}
                                            className="form-input"
                                            style={{ resize: "vertical", minHeight: 120 }}
                                            required
                                        />
                                    </div>
                                    <motion.button
                                        type="submit"
                                        className="btn-accent"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        style={{
                                            width: "100%",
                                            justifyContent: "center",
                                            padding: "14px 28px",
                                            marginTop: 8,
                                            fontSize: "0.95rem",
                                        }}
                                    >
                                        Send Message
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line x1="22" y1="2" x2="11" y2="13" />
                                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                        </svg>
                                    </motion.button>
                                </form>
                            )}
                        </motion.div>
                    </SectionReveal>
                </div>
            </div>
        </section>
    );
}
