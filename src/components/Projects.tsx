import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

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
            "A full-featured blogging platform with a minimal, distraction-free writing experience. Users can create, edit, and publish posts with rich text formatting. Built with a focus on smooth content management and responsive design.",
        img: "/images/blogapp.png",
        link: "https://github.com/ashokpakki/Blog-app-main",
        tags: ["React", "Express", "MongoDB", "REST API"],
    },
    {
        title: "BlackJack Game",
        description:
            "A complete implementation of the classic card game in Java. Features realistic game logic including hit, stand, double-down mechanics, and dealer AI with strong object-oriented design patterns.",
        img: "/images/blackjack.png",
        link: "https://github.com/ashokpakki/Blackjack",
        tags: ["Java", "OOP", "Game Logic"],
    },
    {
        title: "Quote Generator",
        description:
            "A beautifully simple tool that surfaces curated inspirational quotes with a single click. Features smooth animations, a thoughtful color palette, and share-to-social functionality.",
        img: "/images/ran.png",
        link: "https://github.com/ashokpakki/ran",
        tags: ["JavaScript", "CSS Animations", "API"],
    },
];

const TOTAL_SEGS = projects.length + 1; // +1 for closing

/* ─── Left: crossfading text ──────────────────────────────── */
function ProjectText({
    project, index, progress,
}: {
    project: (typeof projects)[number]; index: number; progress: MotionValue<number>;
}) {
    const s = index / TOTAL_SEGS;
    const e = (index + 1) / TOTAL_SEGS;
    const fadeIn = s + 0.2 / TOTAL_SEGS;
    const fadeOut = e - 0.2 / TOTAL_SEGS;

    const opacity = useTransform(progress, [s, fadeIn, fadeOut, e], [0, 1, 1, 0]);
    const y = useTransform(progress, [s, fadeIn, fadeOut, e], [60, 0, 0, -60]);

    return (
        <motion.div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", opacity, y }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>
                {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <h3 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 16, color: "var(--text-primary)" }}>
                {project.title}
            </h3>
            <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--text-secondary)", marginBottom: 24, maxWidth: 480 }}>
                {project.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                {project.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: "0.75rem", fontWeight: 500, padding: "5px 14px", borderRadius: "var(--radius-full)", background: "var(--accent-glow)", color: "var(--accent)", letterSpacing: "0.03em" }}>
                        {tag}
                    </span>
                ))}
            </div>
            <a href={project.link} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)", textDecoration: "none", transition: "gap 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = "14px")}
                onMouseLeave={(e) => (e.currentTarget.style.gap = "8px")}
            >
                View Project
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
        </motion.div>
    );
}

/* ─── Right: 3D card — subtle tilt, fills folder ──────────── */
function ProjectCard({
    project, index, progress,
}: {
    project: (typeof projects)[number]; index: number; progress: MotionValue<number>;
}) {
    const s = index / TOTAL_SEGS;
    const e = (index + 1) / TOTAL_SEGS;
    const after = Math.min(e + 0.08, 1);

    // Subtle playing-card fan: slight rotation + small offset
    const stackRotateZ = index * -1.5;
    const stackOffsetX = index * -4;

    // Gentle tilt: -15° is subtle, not steep
    const rotateX = useTransform(progress, [s, e, after], [-15, 0, -1.5]);
    // Rise from below
    const cardY = useTransform(progress, [s, e], [180, 0]);
    const opacity = useTransform(progress, [Math.max(s - 0.01, 0), s + 0.04], [0, 1]);
    // Scale: start at 0.95, land at 1, stay at 1 when stacked (no shrinking!)
    const scale = useTransform(progress, [s, e], [0.95, 1]);
    // Fan rotation only after stacking
    const rotateZ = useTransform(progress, [s, e, after], [0, 0, stackRotateZ]);
    const x = useTransform(progress, [s, e, after], [0, 0, stackOffsetX]);

    return (
        <motion.div
            style={{
                position: "absolute",
                /* Cards fill 90% of folder, centered */
                top: "5%", left: "5%", width: "90%", height: "90%",
                rotateX, rotateZ, opacity, scale, y: cardY, x,
                zIndex: index,
                transformOrigin: "center bottom",
            }}
        >
            <div style={{ width: "100%", height: "100%", borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--border-hover)", boxShadow: "0 12px 40px rgba(0,0,0,0.25), 0 4px 12px rgba(0,0,0,0.15)", background: "var(--bg-secondary)" }}>
                <img src={project.img} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
        </motion.div>
    );
}

/* ─── Folder cover — horizontal, matches folder shape ─────── */
function FolderCover({ progress }: { progress: MotionValue<number> }) {
    const n = projects.length;
    const s = n / TOTAL_SEGS;
    const mid = s + (1 - s) * 0.5;

    const rotateX = useTransform(progress, [s, mid], [45, 0]);
    const coverY = useTransform(progress, [s, mid], [-150, 0]);
    const opacity = useTransform(progress, [s, s + 0.03], [0, 1]);

    return (
        <motion.div
            style={{
                position: "absolute",
                /* Match the folder exactly — full width, full height */
                inset: 0,
                rotateX, y: coverY, opacity,
                zIndex: n + 1,
                transformOrigin: "center top",
            }}
        >
            <div
                style={{
                    width: "100%", height: "100%",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--border-hover)",
                    background: "var(--bg-tertiary)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 16,
                }}
            >
                <span style={{ fontSize: "1.5rem", opacity: 0.3 }}>📁</span>
                <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-tertiary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {n} Projects
                </span>
            </div>
        </motion.div>
    );
}

/* ─── Folder tabs ─────────────────────────────────────────── */
function FolderTabs({ progress }: { progress: MotionValue<number> }) {
    return (
        <div style={{ display: "flex", gap: 0, marginBottom: -1, position: "relative", zIndex: 2, paddingLeft: 12 }}>
            {projects.map((p, i) => (
                <FolderTab key={i} label={p.title} index={i} progress={progress} />
            ))}
        </div>
    );
}

function FolderTab({ label, index, progress }: { label: string; index: number; progress: MotionValue<number> }) {
    const s = index / TOTAL_SEGS;
    const mid = s + 0.1 / TOTAL_SEGS;
    const opacity = useTransform(progress, [Math.max(s - 0.02, 0), mid], [0.35, 1]);
    const bg = useTransform(progress, [Math.max(s - 0.02, 0), mid], ["transparent", "var(--bg-card-hover)"]);

    return (
        <motion.div
            style={{
                padding: "8px 16px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.04em",
                color: "var(--text-secondary)", opacity, background: bg,
                borderRadius: "var(--radius-sm) var(--radius-sm) 0 0",
                border: "1px solid var(--border)", borderBottom: "none", whiteSpace: "nowrap",
            }}
        >
            <span style={{ opacity: 0.6 }}>{String(index + 1).padStart(2, "0")}</span> {label}
        </motion.div>
    );
}

/* ─── Main section ────────────────────────────────────────── */
export default function Projects() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const n = projects.length;

    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end end"],
    });

    // Closing: folder zooms + fades after cover lands
    const closeStart = n / TOTAL_SEGS;
    const closeMid = closeStart + (1 - closeStart) * 0.5;
    const folderScale = useTransform(scrollYProgress, [closeMid, 1], [1, 1.3]);
    const folderOpacity = useTransform(scrollYProgress, [closeMid, 1], [1, 0]);

    return (
        <section id="projects" style={{ position: "relative" }}>
            {/* The entire scroll-tracked area — header is INSIDE sticky so it never leaves */}
            <div ref={scrollRef} style={{ height: `${(TOTAL_SEGS + 1) * 100}vh`, position: "relative" }}>
                <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
                    <motion.div
                        style={{
                            maxWidth: 1200, margin: "0 auto", padding: "0 40px", width: "100%",
                            scale: folderScale, opacity: folderOpacity,
                        }}
                    >
                        {/* Section header — always visible inside sticky */}
                        <div style={{ textAlign: "center", marginBottom: 40 }}>
                            <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Featured Work</p>
                            <h2 className="gradient-text" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                                Projects I've built
                            </h2>
                        </div>

                        {/* Split layout */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48, alignItems: "center" }}>
                            {/* Left: text */}
                            <div style={{ position: "relative", minHeight: 350 }}>
                                {projects.map((p, i) => (
                                    <ProjectText key={i} project={p} index={i} progress={scrollYProgress} />
                                ))}
                            </div>

                            {/* Right: folder + cards */}
                            <div>
                                <FolderTabs progress={scrollYProgress} />
                                <div
                                    style={{
                                        position: "relative", aspectRatio: "4 / 3",
                                        border: "1px solid var(--border-hover)",
                                        borderRadius: "0 var(--radius-lg) var(--radius-lg) var(--radius-lg)",
                                        background: "var(--bg-card)", perspective: 1200,
                                        overflow: "hidden",
                                    }}
                                >
                                    {projects.map((p, i) => (
                                        <ProjectCard key={i} project={p} index={i} progress={scrollYProgress} />
                                    ))}
                                    <FolderCover progress={scrollYProgress} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
