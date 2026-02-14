import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import SectionReveal, { StaggerContainer, StaggerItem } from "./SectionReveal";
import VanillaTilt from "vanilla-tilt";

const projects = [
    {
        title: "Writer AI",
        description:
            "An intelligent content-generation platform powered by the Grok AI API. Generates summaries, creative ideas, blog drafts, and structured content from simple prompts. Features user authentication, history tracking, and a clean, intuitive writing interface designed for speed and focus.",
        img: "/images/writerai.png",
        link: "https://writer-ai-six.vercel.app/login",
        tags: ["React", "Node.js", "Grok API", "TailwindCSS"],
    },
    {
        title: "Blog App",
        description:
            "A full-featured blogging platform with a minimal, distraction-free writing experience. Users can create, edit, and publish posts with rich text formatting. Built with a focus on smooth content management, organized categories, and responsive design across all devices.",
        img: "/images/blogapp.png",
        link: "https://github.com/ashokpakki/Blog-app-main",
        tags: ["React", "Express", "MongoDB", "REST API"],
    },
    {
        title: "BlackJack Game",
        description:
            "A complete implementation of the classic card game in Java. Features realistic game logic including hit, stand, double-down mechanics, and dealer AI. Demonstrates strong object-oriented design patterns, clean code architecture, and comprehensive game state management.",
        img: "/images/blackjack.png",
        link: "https://github.com/ashokpakki/Blackjack",
        tags: ["Java", "OOP", "Game Logic"],
    },
    {
        title: "Quote Generator",
        description:
            "A beautifully simple tool that surfaces curated inspirational quotes with a single click. Features smooth animations, a thoughtful color palette that changes with each quote, and share-to-social functionality. Built as an exercise in micro-interactions and delightful UX.",
        img: "/images/ran.png",
        link: "https://github.com/ashokpakki/ran",
        tags: ["JavaScript", "CSS Animations", "API"],
    },
];

function TiltCard({ children }: { children: React.ReactNode }) {
    const tiltRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = tiltRef.current;
        if (!el) return;

        // Only tilt on desktop
        if (window.innerWidth < 768) return;

        VanillaTilt.init(el, {
            max: 8,
            speed: 300,
            glare: true,
            "max-glare": 0.15,
            perspective: 1000,
        });

        return () => {
            (el as any)?.vanillaTilt?.destroy();
        };
    }, []);

    return (
        <div ref={tiltRef} className="tilt-card" style={{ transformStyle: "preserve-3d" }}>
            {children}
        </div>
    );
}

export default function Projects() {
    return (
        <section id="projects" className="section-padding" style={{ position: "relative" }}>
            <div className="mesh-gradient one" style={{ opacity: 0.1 }} />

            <div className="section-container">
                {/* Section Header */}
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
                            Featured Work
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
                            Projects I've built
                        </h2>
                        <p
                            style={{
                                fontSize: "1.05rem",
                                lineHeight: 1.8,
                                color: "var(--text-secondary)",
                                maxWidth: 650,
                                margin: "0 auto",
                            }}
                        >
                            Each project represents a problem I wanted to solve. From AI-powered
                            writing tools to classic game implementations — every line of code is
                            written with intention and care.
                        </p>
                    </div>
                </SectionReveal>

                {/* Project Grid */}
                <StaggerContainer
                    staggerDelay={0.12}
                    className=""
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 500px), 1fr))",
                            gap: 32,
                        }}
                    >
                        {projects.map((p, i) => (
                            <StaggerItem key={i}>
                                <TiltCard>
                                    <motion.div
                                        className="card-gradient-border"
                                        whileHover={{ y: -4 }}
                                        transition={{ duration: 0.3 }}
                                        style={{
                                            overflow: "hidden",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => window.open(p.link, "_blank")}
                                    >
                                        {/* Image container */}
                                        <div
                                            style={{
                                                position: "relative",
                                                overflow: "hidden",
                                                height: 240,
                                            }}
                                        >
                                            <motion.img
                                                src={p.img}
                                                alt={p.title}
                                                whileHover={{ scale: 1.08 }}
                                                transition={{ duration: 0.5 }}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    display: "block",
                                                }}
                                            />
                                            {/* Gradient overlay */}
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    background:
                                                        "linear-gradient(to top, var(--bg-primary) 0%, transparent 50%)",
                                                    pointerEvents: "none",
                                                }}
                                            />
                                        </div>

                                        {/* Content */}
                                        <div style={{ padding: "24px 28px 28px", transform: "translateZ(30px)" }}>
                                            <h3
                                                style={{
                                                    fontSize: "1.2rem",
                                                    fontWeight: 700,
                                                    marginBottom: 10,
                                                    letterSpacing: "-0.01em",
                                                }}
                                            >
                                                {p.title}
                                            </h3>
                                            <p
                                                style={{
                                                    fontSize: "0.88rem",
                                                    lineHeight: 1.7,
                                                    color: "var(--text-secondary)",
                                                    marginBottom: 16,
                                                }}
                                            >
                                                {p.description}
                                            </p>

                                            {/* Tags */}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    gap: 8,
                                                    marginBottom: 16,
                                                }}
                                            >
                                                {p.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        style={{
                                                            fontSize: "0.72rem",
                                                            fontWeight: 500,
                                                            padding: "4px 12px",
                                                            borderRadius: "var(--radius-full)",
                                                            background: "var(--accent-glow)",
                                                            color: "var(--accent-light)",
                                                            letterSpacing: "0.03em",
                                                        }}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Link */}
                                            <a
                                                href={p.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: 6,
                                                    fontSize: "0.85rem",
                                                    fontWeight: 600,
                                                    color: "var(--accent-light)",
                                                    textDecoration: "none",
                                                    transition: "gap 0.3s",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.gap = "10px";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.gap = "6px";
                                                }}
                                            >
                                                View Project
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </a>
                                        </div>
                                    </motion.div>
                                </TiltCard>
                            </StaggerItem>
                        ))}
                    </div>
                </StaggerContainer>
            </div>
        </section>
    );
}
