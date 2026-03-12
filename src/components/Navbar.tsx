import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, type MotionValue } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
    { label: "Home", href: "hero" },
    { label: "About", href: "about" },
    { label: "Skills", href: "skills" },
    { label: "Projects", href: "projects" },
    { label: "Contact", href: "contact" },
];

function DockItem({
    label,
    isActive,
    mouseX,
    onClick,
}: {
    label: string;
    isActive: boolean;
    mouseX: MotionValue<number>;
    onClick: () => void;
}) {
    const ref = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Optimized distance calculation via Framer Motion's motion values instead of React state.
    // This gives butter-smooth 120fps animations without causing parent renders on every pixel moved.
    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // Create the signature dock bulge and lift effect
    const scaleSync = useTransform(distance, [-120, 0, 120], [1, 1.35, 1]);
    const ySync = useTransform(distance, [-120, 0, 120], [0, -8, 0]);

    const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 350, damping: 20 });
    const y = useSpring(ySync, { mass: 0.1, stiffness: 350, damping: 20 });

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                scale,
                y,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.95rem",
                fontWeight: isActive ? 600 : 500,
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                padding: "10px 18px",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transformOrigin: "center bottom",
                outline: "none",
                transition: "color 0.2s ease",
            }}
        >
            <span style={{ position: "relative", zIndex: 2, textShadow: isHovered || isActive ? "0 2px 10px rgba(0,0,0,0.3)" : "none" }}>{label}</span>

            {/* Creative Hover Highlight pill */}
            <AnimatePresence>
                {isHovered && !isActive && (
                    <motion.div
                        layoutId="nav-hover-pill"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "var(--bg-card-hover)",
                            borderRadius: "var(--radius-lg)",
                            zIndex: 0,
                            border: "1px solid var(--border)",
                            boxShadow: "var(--shadow-sm)",
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Active Line indicator attached cleanly to the bottom */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        layoutId="nav-active-indicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{
                            position: "absolute",
                            bottom: "-2px",
                            width: "50%",
                            height: "3px",
                            borderRadius: "var(--radius-full)",
                            background: "var(--accent)",
                            boxShadow: "0 0 12px var(--accent)",
                            zIndex: 1,
                        }}
                    />
                )}
            </AnimatePresence>
        </motion.button>
    );
}

export default function Navbar() {
    const [active, setActive] = useState("hero");
    const { scrollY } = useScroll();

    // Using motion value instead of React state for extreme performance
    const mouseX = useMotionValue(Infinity);
    const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);

    // Active section tracking via IntersectionObserver
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
        <nav
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
            }}
        >
            {/* End-to-end full width dynamic background */}
            <motion.div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "var(--nav-bg)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    opacity: bgOpacity,
                    borderBottom: "1px solid var(--border)",
                    boxShadow: "var(--shadow-sm)",
                }}
            />

            <div
                style={{
                    position: "relative",
                    width: "100%", // Full width from edge to edge
                    padding: "20px 40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* Logo Area */}
                <motion.button
                    onClick={() => scrollTo("hero")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "1.4rem",
                        fontWeight: 800,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.04em",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    AP<span style={{ color: "var(--accent)" }}>.</span>
                </motion.button>

                {/* Highly optimized centered mac style Dock */}
                <div
                    onMouseMove={(e) => mouseX.set(e.pageX)}
                    onMouseLeave={() => mouseX.set(Infinity)}
                    style={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: 8,
                        padding: "8px 12px",
                        borderRadius: "100px", // Pill shape
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        boxShadow: "var(--shadow-md)",
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                    }}
                    className="hidden md:flex"
                >
                    {navLinks.map(({ label, href }) => (
                        <DockItem
                            key={href}
                            label={label}
                            isActive={active === href}
                            mouseX={mouseX}
                            onClick={() => scrollTo(href)}
                        />
                    ))}
                </div>

                {/* Right side actions */}
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <ThemeToggle />
                    <a
                        href="https://flowcv.com/resume/c75adcr9ji"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-accent hidden sm:inline-flex"
                        style={{ padding: "10px 24px", fontSize: "0.95rem", boxShadow: "var(--shadow-md)" }}
                    >
                        Resume
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17l9.2-9.2M17 17V7H7" />
                        </svg>
                    </a>
                </div>
            </div>
        </nav>
    );
}
