import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MoveUpRight } from "lucide-react";
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

    const headerY = useTransform(scrollY, [0, 50], [0, -10]);
    const headerScale = useTransform(scrollY, [0, 50], [1, 0.98]);
    const bgOpacity = useTransform(scrollY, [0, 50], [0.8, 0.95]);

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
            style={{ y: headerY, scale: headerScale }}
            className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none"
        >
            {/* The glassy floating shell */}
            <motion.div
                style={{ opacity: bgOpacity }}
                className="absolute inset-x-4 max-w-5xl mx-auto h-full rounded-2xl bg-[var(--card)]/90 backdrop-blur-md border border-[var(--border)] shadow-[var(--shadow-sm)] pointer-events-auto"
            />

            <div className="relative w-full max-w-5xl px-6 py-3 flex items-center justify-between pointer-events-auto">
                {/* Logo */}
                <button
                    onClick={() => scrollTo("hero")}
                    className="text-xl font-bold tracking-tight text-[var(--heading)] hover:text-[var(--accent)] transition-colors"
                >
                    AP<span className="text-[var(--accent)]">.</span>
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-1 bg-[var(--background)] p-1 rounded-xl border border-[var(--border-muted)]">
                    {navLinks.map(({ label, href }) => (
                        <button
                            key={href}
                            onClick={() => scrollTo(href)}
                            className={`relative px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors outline-none z-10 ${
                                active === href ? "text-white" : "text-[var(--foreground)] hover:text-[var(--heading)]"
                            }`}
                        >
                            {active === href && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-[var(--heading)] rounded-lg -z-10 shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            {label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <a
                        href="https://flowcv.com/resume/c75adcr9ji"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex items-center gap-2 btn-primary !py-2 !px-4 !text-sm"
                    >
                        Resume
                        <MoveUpRight size={14} strokeWidth={2.5} />
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}
