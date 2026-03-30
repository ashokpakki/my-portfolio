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
    const bgOpacity = useTransform(scrollY, [0, 50], [0.5, 0.85]);

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
            <motion.div
                style={{ opacity: bgOpacity }}
                className="absolute inset-x-4 max-w-5xl mx-auto h-full rounded-full bg-background/60 backdrop-blur-xl border border-border shadow-lg pointer-events-auto"
            />

            <div className="relative w-full max-w-5xl px-6 py-3 flex items-center justify-between pointer-events-auto">
                <button
                    onClick={() => scrollTo("hero")}
                    className="text-xl font-black tracking-tighter text-foreground hover:opacity-70 transition-opacity"
                >
                    AP<span className="text-primary">.</span>
                </button>

                <div className="hidden md:flex items-center gap-1 bg-muted/50 p-1 rounded-full border border-border/50">
                    {navLinks.map(({ label, href }) => (
                        <button
                            key={href}
                            onClick={() => scrollTo(href)}
                            className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors outline-none z-10 ${
                                active === href ? "text-background" : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {active === href && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-foreground rounded-full -z-10"
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
                        className="hidden sm:flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-full text-sm font-semibold hover:scale-105 active:scale-95 transition-transform"
                    >
                        Resume
                        <MoveUpRight size={16} strokeWidth={2.5} />
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}
