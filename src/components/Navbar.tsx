import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
    { label: "Home", href: "hero" },
    { label: "About", href: "about" },
    { label: "Skills", href: "skills" },
    { label: "Projects", href: "projects" },
    { label: "Contact", href: "contact" },
];

/* ─── Dock magnification item ──────────────────────────────── */
function DockItem({
    label,
    isActive,
    mouseX,
    onClick,
}: {
    label: string;
    isActive: boolean;
    mouseX: number | null;
    onClick: () => void;
}) {
    const ref = useRef<HTMLButtonElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        if (mouseX === null || !ref.current) {
            setScale(1);
            return;
        }
        const rect = ref.current.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const dist = Math.abs(mouseX - center);
        const maxDist = 120;

        if (dist < maxDist) {
            const proximity = 1 - dist / maxDist;
            // Ease out — smooth falloff, max 1.25× scale
            const eased = proximity * proximity;
            setScale(1 + eased * 0.25);
        } else {
            setScale(1);
        }
    }, [mouseX]);

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            animate={{ scale }}
            transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
            style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.9rem",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                padding: "8px 16px",
                borderRadius: "var(--radius-md)",
                transition: "color 0.2s, background 0.2s",
                transformOrigin: "center bottom",
                position: "relative",
                letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text-primary)";
                e.currentTarget.style.background = "var(--bg-card-hover)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.color = isActive
                    ? "var(--text-primary)"
                    : "var(--text-secondary)";
                e.currentTarget.style.background = "none";
            }}
        >
            {label}
            {/* Active indicator dot */}
            <AnimatePresence>
                {isActive && (
                    <motion.span
                        layoutId="nav-active-dot"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        style={{
                            position: "absolute",
                            bottom: 1,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            background: "var(--accent)",
                        }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                )}
            </AnimatePresence>
        </motion.button>
    );
}

export default function Navbar() {
    const [active, setActive] = useState("hero");
    const [mouseX, setMouseX] = useState<number | null>(null);
    const navAreaRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
    const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.08]);

    // Throttled mouse tracking to prevent jitter
    const lastMouseUpdate = useRef(0);
    const handleNavMouseMove = useCallback((e: React.MouseEvent) => {
        const now = Date.now();
        if (now - lastMouseUpdate.current > 16) {
            // ~60fps cap
            setMouseX(e.clientX);
            lastMouseUpdate.current = now;
        }
    }, []);

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
                    padding: "18px 28px",
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
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.02em",
                    }}
                >
                    AP
                    <span style={{ color: "var(--accent)" }}>.</span>
                </motion.button>

                {/* Nav Links with dock magnification — hide on small screens */}
                <div
                    ref={navAreaRef}
                    onMouseMove={handleNavMouseMove}
                    onMouseLeave={() => setMouseX(null)}
                    style={{
                        display: "flex",
                        alignItems: "end",
                        gap: 2,
                        padding: "6px 8px",
                        borderRadius: "var(--radius-lg)",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-hover)",
                        boxShadow: "0 1px 8px rgba(0,0,0,0.15)",
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

                {/* Right side */}
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <ThemeToggle />
                    <a
                        href="https://flowcv.com/resume/c75adcr9ji"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-accent hidden sm:inline-flex"
                        style={{ padding: "10px 22px", fontSize: "0.85rem" }}
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
