import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
    { label: "Home", href: "hero" },
    { label: "About", href: "about" },
    { label: "Skills", href: "skills" },
    { label: "Projects", href: "projects" },
    { label: "Contact", href: "contact" },
];

export default function Navbar() {
    const [active, setActive] = useState("hero");
    const { scrollY } = useScroll();
    const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
    const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.08]);

    // Track active section based on scroll position
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id);
                    }
                });
            },
            { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
        );

        navLinks.forEach(({ href }) => {
            const el = document.getElementById(href);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.nav
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
            }}
        >
            {/* Dynamic background */}
            <motion.div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "var(--nav-bg)",
                    opacity: bgOpacity,
                    borderBottom: "1px solid",
                    borderColor: useTransform(borderOpacity, (v) => `rgba(255,255,255,${v})`),
                }}
            />

            <div
                style={{
                    position: "relative",
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "16px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* Logo / Name */}
                <motion.button
                    onClick={() => scrollTo("hero")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.02em",
                    }}
                >
                    AP
                    <span style={{ color: "var(--accent)" }}>.</span>
                </motion.button>

                {/* Nav Links — hide on small screens */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 32,
                    }}
                    className="hidden md:flex"
                >
                    {navLinks.map(({ label, href }) => (
                        <button
                            key={href}
                            onClick={() => scrollTo(href)}
                            className={`nav-link ${active === href ? "active" : ""}`}
                            style={{ background: "none", border: "none" }}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Right side */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <ThemeToggle />
                    <a
                        href="https://flowcv.com/resume/c75adcr9ji"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-accent hidden sm:inline-flex"
                        style={{ padding: "8px 20px", fontSize: "0.8rem" }}
                    >
                        Resume
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17l9.2-9.2M17 17V7H7" />
                        </svg>
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}
