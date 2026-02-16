import { useRef, useEffect, useCallback } from "react";
import {
    motion,
    useScroll,
    useTransform,
    type MotionValue,
} from "framer-motion";
import { useTheme } from "../context/ThemeContext";

/* ═══════════════════════════════════════════════════════════════
   PROJECT DATA
   ═══════════════════════════════════════════════════════════════ */
const projects = [
    {
        title: "Writer AI",
        description:
            "An intelligent content-generation platform powered by the Grok AI API. Generates summaries, creative ideas, blog drafts, and structured content from simple prompts.",
        img: "/images/writerai.png",
        link: "https://writer-ai-six.vercel.app/login",
        tags: ["React", "Node.js", "Grok API", "TailwindCSS"],
    },
    {
        title: "Blog App",
        description:
            "A full-featured blogging platform with a minimal, distraction-free writing experience. Users can create, edit, and publish posts with rich text formatting.",
        img: "/images/blogapp.png",
        link: "https://github.com/ashokpakki/Blog-app-main",
        tags: ["React", "Express", "MongoDB", "REST API"],
    },
    {
        title: "BlackJack Game",
        description:
            "A complete implementation of the classic card game in Java. Features realistic game logic including hit, stand, double-down mechanics, and dealer AI.",
        img: "/images/blackjack.png",
        link: "https://github.com/ashokpakki/Blackjack",
        tags: ["Java", "OOP", "Game Logic"],
    },
    {
        title: "Quote Generator",
        description:
            "A beautifully simple tool that surfaces curated inspirational quotes with a single click. Features smooth animations and share-to-social functionality.",
        img: "/images/ran.png",
        link: "https://github.com/ashokpakki/ran",
        tags: ["JavaScript", "CSS Animations", "API"],
    },
];

/* ═══════════════════════════════════════════════════════════════
   SCROLL SEGMENT MATH
   ═══════════════════════════════════════════════════════════════

   Total segments = projects.length + 3:
     Seg 0           → Folder bottom rises (back panel + active tab)
     Seg 1..N        → Each project card rises, rotates, stacks
                       Left text crossfades per segment
     Seg N+1         → Folder cover closes over stacked cards
     Seg N+2         → Entire folder zooms out + fades away

   scrollYProgress maps [0, 1] across all segments uniformly.
   Each segment occupies 1/TOTAL_SEGS of the progress range.
   ═══════════════════════════════════════════════════════════════ */
const N = projects.length;
const TOTAL_SEGS = N + 3; // folder-open + N cards + cover-close + zoom-out
const SEG = 1 / TOTAL_SEGS; // normalized width of one segment

/** Returns [start, end] of segment `i` in [0,1] range */
function seg(i: number): [number, number] {
    return [i * SEG, (i + 1) * SEG];
}

/* ═══════════════════════════════════════════════════════════════
   STARRY BACKGROUND (canvas, dark mode only)
   Lightweight: draws ~200 static dots + 40 twinkling dots.
   No particle library. No heavy animation loop.
   ═══════════════════════════════════════════════════════════════ */
function StarryBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();
    const frameRef = useRef<number>(0);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);

        // Static stars — seeded from dimensions for consistency
        const staticStars: { x: number; y: number; r: number; a: number }[] = [];
        const twinklers: { x: number; y: number; r: number; speed: number; phase: number }[] = [];

        // Pseudo-random from seed
        let seed = 42;
        const rand = () => {
            seed = (seed * 16807) % 2147483647;
            return (seed - 1) / 2147483646;
        };

        const isMobile = window.innerWidth < 768;
        const starCount = isMobile ? 60 : 180;
        const twinklerCount = isMobile ? 10 : 35;

        for (let i = 0; i < starCount; i++) {
            staticStars.push({
                x: rand() * w,
                y: rand() * h,
                r: rand() * 1.2 + 0.3,
                a: rand() * 0.4 + 0.1,
            });
        }
        for (let i = 0; i < twinklerCount; i++) {
            twinklers.push({
                x: rand() * w,
                y: rand() * h,
                r: rand() * 1.5 + 0.5,
                speed: rand() * 0.02 + 0.005,
                phase: rand() * Math.PI * 2,
            });
        }

        let time = 0;
        const animate = () => {
            ctx.clearRect(0, 0, w, h);
            // Static
            for (const s of staticStars) {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${s.a})`;
                ctx.fill();
            }
            // Twinklers
            for (const t of twinklers) {
                const alpha = 0.15 + 0.5 * (0.5 + 0.5 * Math.sin(time * t.speed * 60 + t.phase));
                ctx.beginPath();
                ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${alpha})`;
                ctx.fill();
            }
            time++;
            frameRef.current = requestAnimationFrame(animate);
        };
        animate();
    }, []);

    useEffect(() => {
        if (theme === "light") return;
        draw();
        const handleResize = () => {
            cancelAnimationFrame(frameRef.current);
            draw();
        };
        window.addEventListener("resize", handleResize);
        return () => {
            cancelAnimationFrame(frameRef.current);
            window.removeEventListener("resize", handleResize);
        };
    }, [theme, draw]);

    if (theme === "light") return null;

    return (
        <canvas
            ref={canvasRef}
            className="projects-starry-canvas"
            style={{ width: "100%", height: "100%" }}
        />
    );
}

/* ═══════════════════════════════════════════════════════════════
   LEFT SIDE — Project text with dramatic crossfade
   Each project text occupies seg 1..N (offset by 1 because seg 0
   is the folder-open animation). Text appears as its card enters.
   ═══════════════════════════════════════════════════════════════ */
function ProjectText({
    project,
    index,
    progress,
}: {
    project: (typeof projects)[number];
    index: number;
    progress: MotionValue<number>;
}) {
    // This text corresponds to card segment (index + 1)
    const [s, e] = seg(index + 1);
    // Dramatic: fast opacity drop + vertical shift
    const entryDur = SEG * 0.20; // 20% of segment for entry
    const exitDur = SEG * 0.15;  // 15% of segment for exit — snappy

    const opacity = useTransform(
        progress,
        [s, s + entryDur, e - exitDur, e],
        [0, 1, 1, 0]
    );
    const y = useTransform(
        progress,
        [s, s + entryDur, e - exitDur, e],
        [60, 0, 0, -60]
    );

    return (
        <motion.div
            className="project-text-container"
            style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                opacity,
                y,
                willChange: "opacity, transform",
            }}
        >
            {/* Project number */}
            <span
                style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--accent)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 20,
                }}
            >
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(N).padStart(2, "0")}
            </span>

            {/* Title */}
            <h3
                style={{
                    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    marginBottom: 16,
                    color: "var(--text-primary)",
                }}
            >
                {project.title}
            </h3>

            {/* Description */}
            <p
                style={{
                    fontSize: "1rem",
                    lineHeight: 1.75,
                    color: "var(--text-secondary)",
                    marginBottom: 24,
                    maxWidth: 480,
                }}
            >
                {project.description}
            </p>

            {/* Stack tags */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 28,
                }}
            >
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        style={{
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            padding: "5px 14px",
                            borderRadius: "var(--radius-full)",
                            background: "var(--accent-glow)",
                            color: "var(--accent)",
                            letterSpacing: "0.03em",
                        }}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* CTA link */}
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-cta"
            >
                View Project
                <svg
                    width="18"
                    height="18"
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
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   PROJECT CARD — rises from bottom, rotates from -30° to 0°,
   stacks inside folder. No shrinking. No disappearing.
   Each card occupies Seg (index + 1).
   ═══════════════════════════════════════════════════════════════ */
function ProjectCard({
    project,
    index,
    progress,
}: {
    project: (typeof projects)[number];
    index: number;
    progress: MotionValue<number>;
}) {
    const [s, e] = seg(index + 1);
    const mid = s + (e - s) * 0.65; // 65% through segment: card lands flat

    // Subtle fan offset per stacked card (playing-card illusion)
    const fanRotateZ = index * -1.8;  // slight rotation per card
    const fanOffsetX = index * -5;    // slight horizontal offset
    const fanOffsetY = index * -3;    // slight vertical offset

    // Entry: rise from 350px below at -30° tilt, rotate to 0° (used in finalRotateX below)
    const cardY = useTransform(progress, [s, mid], [350, 0]);
    const opacity = useTransform(progress, [s, s + SEG * 0.15], [0, 1]);
    const scale = useTransform(progress, [s, mid], [0.92, 1]);

    // After landing: apply fan offset for stacking illusion
    const afterSettle = Math.min(e, 1);
    const rotateZ = useTransform(
        progress,
        [s, mid, afterSettle],
        [0, 0, fanRotateZ]
    );
    const x = useTransform(
        progress,
        [s, mid, afterSettle],
        [0, 0, fanOffsetX]
    );
    const yOffset = useTransform(
        progress,
        [s, mid, afterSettle],
        [0, 0, fanOffsetY]
    );

    // After card settles, slight residual tilt for realism
    const finalRotateX = useTransform(
        progress,
        [s, mid, afterSettle],
        [-30, 0, -1]
    );

    return (
        <motion.div
            style={{
                position: "absolute",
                /* Card fills ~90% of folder, centered */
                top: "5%",
                left: "5%",
                width: "90%",
                height: "90%",
                rotateX: finalRotateX,
                rotateZ,
                opacity,
                scale,
                y: cardY,
                x,
                translateY: yOffset,
                zIndex: index + 1,
                transformOrigin: "center bottom",
                willChange: "transform, opacity",
            }}
        >
            <div className="project-card-image">
                <img
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                />
            </div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   FOLDER COVER — closes over stacked cards (Seg N+1)
   Rises from bottom, rotates -30° → -10° → 0°
   ═══════════════════════════════════════════════════════════════ */
function FolderCoverCard({
    progress,
}: {
    progress: MotionValue<number>;
}) {
    const [s, e] = seg(N + 1);
    const mid = s + (e - s) * 0.6;

    // Rise from below, rotate closed
    const rotateX = useTransform(progress, [s, mid, e], [-30, -10, 0]);
    const coverY = useTransform(progress, [s, mid], [300, 0]);
    const opacity = useTransform(progress, [s, s + SEG * 0.15], [0, 1]);

    return (
        <motion.div
            style={{
                position: "absolute",
                inset: 0,
                rotateX,
                y: coverY,
                opacity,
                zIndex: N + 2,
                transformOrigin: "center bottom",
                willChange: "transform, opacity",
            }}
        >
            <div className="folder-cover">
                <span style={{ fontSize: "1.5rem", opacity: 0.3 }}>📁</span>
                <span
                    style={{
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "var(--text-tertiary)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                    }}
                >
                    {N} Projects
                </span>
            </div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   ACTIVE FOLDER TAB — updates per active project
   Shows current project name, clickable → opens link
   ═══════════════════════════════════════════════════════════════ */
function ActiveFolderTab({
    progress,
}: {
    progress: MotionValue<number>;
}) {
    return (
        <>
            {projects.map((p, i) => (
                <ActiveTabItem
                    key={i}
                    project={p}
                    index={i}
                    progress={progress}
                />
            ))}
        </>
    );
}

function ActiveTabItem({
    project,
    index,
    progress,
}: {
    project: (typeof projects)[number];
    index: number;
    progress: MotionValue<number>;
}) {
    const [s] = seg(index + 1);
    const [, e] = seg(index + 1);

    // Show this tab only during its card's segment
    const opacity = useTransform(
        progress,
        [s - SEG * 0.05, s + SEG * 0.1, e - SEG * 0.1, e + SEG * 0.05],
        [0, 1, 1, 0]
    );
    const tabY = useTransform(
        progress,
        [s - SEG * 0.05, s + SEG * 0.1],
        [10, 0]
    );

    return (
        <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="folder-tab"
            title={`Open ${project.title}`}
            style={{
                position: "absolute",
                left: 0,
                /*
                 * Tab height is ~40px (10px padding-top + content + 10px padding-bottom + 2px border-top).
                 * We position it so its bottom edge overlaps the folder body's 2px top border,
                 * creating the seamless Windows Explorer folder look.
                 */
                bottom: "100%",
                marginBottom: -2,
                opacity,
                y: tabY,
                pointerEvents: "auto",
                zIndex: 3,
            }}
        >
            <span style={{ opacity: 0.5, fontSize: "0.65rem" }}>
                {String(index + 1).padStart(2, "0")}
            </span>
            {project.title}
            <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: 0.4 }}
            >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
        </motion.a>
    );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PROJECTS SECTION
   ═══════════════════════════════════════════════════════════════ */
export default function Projects() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end end"],
    });

    /* ── Zoom-out phase: Seg N+2 ──────────────────────────────── */
    const [zoomStart] = seg(N + 2);
    const folderScale = useTransform(
        scrollYProgress,
        [zoomStart, 1],
        [1, 0.6]
    );
    const folderOpacity = useTransform(
        scrollYProgress,
        [zoomStart, zoomStart + SEG * 0.7],
        [1, 0]
    );
    // Slight diagonal movement during zoom-out
    const folderX = useTransform(
        scrollYProgress,
        [zoomStart, 1],
        [0, -40]
    );
    const folderZoomY = useTransform(
        scrollYProgress,
        [zoomStart, 1],
        [0, -60]
    );

    /* ── Folder bottom visibility: appears in seg 0, stays until zoom-out ── */
    const [folderAppearStart] = seg(0);
    const folderBottomOpacity = useTransform(
        scrollYProgress,
        [folderAppearStart, folderAppearStart + SEG * 0.3],
        [0, 1]
    );
    const folderBottomY = useTransform(
        scrollYProgress,
        [folderAppearStart, folderAppearStart + SEG],
        [400, 0]
    );
    const folderBottomRotateX = useTransform(
        scrollYProgress,
        [folderAppearStart, folderAppearStart + SEG],
        [-20, 0]
    );

    return (
        <section
            id="projects"
            style={{ position: "relative" }}
        >
            {/*
              Scroll-tracked area.
              Height = (TOTAL_SEGS + 1) * 100vh to give enough scroll runway.
              The +1 ensures the last segment fully completes before leaving.
            */}
            <div
                ref={scrollRef}
                style={{
                    height: `${(TOTAL_SEGS + 1) * 100}vh`,
                    position: "relative",
                }}
            >
                {/* Sticky viewport — stays in view while scrolling */}
                <div
                    style={{
                        position: "sticky",
                        top: 0,
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        overflow: "hidden",
                    }}
                >
                    {/* Starry background (dark mode) */}
                    <StarryBackground />
                    {/* Light mode soft gradient overlay */}
                    <div className="projects-light-gradient" />

                    {/* Zoom/fade wrapper for the entire folder + content */}
                    <motion.div
                        style={{
                            maxWidth: 1280,
                            margin: "0 auto",
                            padding: "0 40px",
                            width: "100%",
                            scale: folderScale,
                            opacity: folderOpacity,
                            x: folderX,
                            y: folderZoomY,
                            position: "relative",
                            zIndex: 1,
                        }}
                    >
                        {/* Section header — always visible inside sticky */}
                        <div style={{ textAlign: "center", marginBottom: 40 }}>
                            <p
                                style={{
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    color: "var(--accent)",
                                    letterSpacing: "0.15em",
                                    textTransform: "uppercase",
                                    marginBottom: 8,
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
                                }}
                            >
                                Projects I've built
                            </h2>
                        </div>

                        {/* Split layout: 40% text | 60% folder */}
                        <div className="projects-grid">
                            {/* ── Left: crossfading project text ── */}
                            <div style={{ position: "relative", minHeight: 380 }}>
                                {projects.map((p, i) => (
                                    <ProjectText
                                        key={i}
                                        project={p}
                                        index={i}
                                        progress={scrollYProgress}
                                    />
                                ))}
                            </div>

                            {/* ── Right: 3D folder with cards ── */}
                            <motion.div
                                style={{
                                    opacity: folderBottomOpacity,
                                    y: folderBottomY,
                                    rotateX: folderBottomRotateX,
                                    transformOrigin: "center bottom",
                                    perspective: 1200,
                                }}
                            >
                                {/*
                                  FolderWrapper (position: relative)
                                  ├── ActiveFolderTab (absolute, elevated above via negative top)
                                  └── FolderBody (3D perspective container)

                                  The tab is inside the same wrapper as the body,
                                  eliminating the visual gap from the previous sibling layout.
                                  paddingTop reserves space for the elevated tab.
                                */}
                                <div
                                    style={{
                                        position: "relative",
                                    }}
                                >
                                    {/* Active project tabs — absolutely positioned above folder body */}
                                    <ActiveFolderTab progress={scrollYProgress} />

                                    {/* Folder body — contains cards + cover */}
                                    <div
                                        className="folder-body"
                                        style={{ perspective: 1200 }}
                                    >
                                        {/* Project cards — stack inside */}
                                        {projects.map((p, i) => (
                                            <ProjectCard
                                                key={i}
                                                project={p}
                                                index={i}
                                                progress={scrollYProgress}
                                            />
                                        ))}

                                        {/* Folder cover — closes last */}
                                        <FolderCoverCard
                                            progress={scrollYProgress}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
