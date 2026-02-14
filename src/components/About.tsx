import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import SectionReveal, { StaggerContainer, StaggerItem } from "./SectionReveal";

/* ─── Animated counter ────────────────────────────────────── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView || !ref.current) return;
        let start = 0;
        const duration = 1500;
        const startTime = performance.now();

        const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            start = Math.round(eased * target);
            if (ref.current) ref.current.textContent = start + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [inView, target, suffix]);

    return <span ref={ref}>0{suffix}</span>;
}

/* ─── Timeline data ───────────────────────────────────────── */
const experience = [
    {
        logo: "/images/udaan.png",
        title: "Software Developer Intern",
        org: "Udaan",
        period: "2024",
        bullets: [
            "Worked with the internal warehouse management application, building features for inventory tracking and order processing pipelines.",
            "Collaborated with backend teams on data operations, optimizing query performance and improving data integrity across services.",
            "Contributed to CI/CD workflows and participated in agile sprints with cross-functional engineering teams.",
        ],
    },
];

const education = [
    {
        logo: "/images/mnnit.png",
        title: "Bachelor's Degree in Engineering",
        org: "Motilal Nehru National Institute of Technology, Allahabad",
        period: "2021 – 2025",
        bullets: [
            "Pursuing B.Tech with a focus on computer science fundamentals, data structures, algorithms, and systems programming.",
            "Active participant in coding clubs and hackathons, building full-stack applications and competitive programming skills.",
        ],
    },
    {
        logo: "/images/aprjc.png",
        title: "Class XII — Intermediate",
        org: "AP Residential Jr College, Venkatagiri",
        period: "2019 – 2021",
        bullets: [
            "Completed intermediate education with a focus on Mathematics, Physics, and Chemistry.",
            "Developed strong analytical and problem-solving foundations that led to engineering pursuits.",
        ],
    },
];

const stats = [
    { value: 1, suffix: "+", label: "Year Experience" },
    { value: 4, suffix: "+", label: "Projects Built" },
    { value: 13, suffix: "+", label: "Technologies" },
    { value: 1, suffix: "", label: "Internship" },
];

export default function About() {
    return (
        <section id="about" className="section-padding" style={{ position: "relative" }}>
            <div className="mesh-gradient three" />

            <div className="section-container">
                {/* Section Header */}
                <SectionReveal>
                    <div style={{ textAlign: "center", marginBottom: 80 }}>
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
                            About Me
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
                            Building software that matters
                        </h2>
                        <p
                            style={{
                                fontSize: "1.05rem",
                                lineHeight: 1.8,
                                color: "var(--text-secondary)",
                                maxWidth: 700,
                                margin: "0 auto",
                            }}
                        >
                            I'm a final-year engineering student at NIT Allahabad with a deep passion for
                            full-stack development. I believe great software comes from the intersection of
                            clean architecture, thoughtful user experience, and relentless iteration. My
                            approach combines hands-on backend engineering with a keen eye for frontend polish —
                            because details define the difference between good and exceptional.
                        </p>
                    </div>
                </SectionReveal>

                {/* Stats */}
                <SectionReveal delay={0.1}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                            gap: 24,
                            marginBottom: 80,
                        }}
                    >
                        {stats.map((s, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -4, boxShadow: "var(--shadow-glow)" }}
                                className="card-gradient-border"
                                style={{
                                    padding: "28px 20px",
                                    textAlign: "center",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "2.5rem",
                                        fontWeight: 900,
                                        color: "var(--accent)",
                                        lineHeight: 1,
                                        marginBottom: 8,
                                    }}
                                >
                                    <Counter target={s.value} suffix={s.suffix} />
                                </div>
                                <div
                                    style={{
                                        fontSize: "0.8rem",
                                        color: "var(--text-tertiary)",
                                        fontWeight: 500,
                                        letterSpacing: "0.04em",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {s.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </SectionReveal>

                {/* Experience & Education in two-column */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 450px), 1fr))",
                        gap: 60,
                    }}
                >
                    {/* Work Experience */}
                    <SectionReveal direction="left">
                        <h3
                            style={{
                                fontSize: "1.3rem",
                                fontWeight: 700,
                                marginBottom: 32,
                                color: "var(--text-primary)",
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                            }}
                        >
                            <span
                                style={{
                                    display: "inline-block",
                                    width: 24,
                                    height: 2,
                                    background: "var(--accent)",
                                    borderRadius: 1,
                                }}
                            />
                            Work Experience
                        </h3>
                        <div className="timeline">
                            <StaggerContainer>
                                {experience.map((item, i) => (
                                    <StaggerItem key={i}>
                                        <div className="timeline-item">
                                            <TimelineCard {...item} />
                                        </div>
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        </div>
                    </SectionReveal>

                    {/* Education */}
                    <SectionReveal direction="right">
                        <h3
                            style={{
                                fontSize: "1.3rem",
                                fontWeight: 700,
                                marginBottom: 32,
                                color: "var(--text-primary)",
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                            }}
                        >
                            <span
                                style={{
                                    display: "inline-block",
                                    width: 24,
                                    height: 2,
                                    background: "var(--accent)",
                                    borderRadius: 1,
                                }}
                            />
                            Education
                        </h3>
                        <div className="timeline">
                            <StaggerContainer>
                                {education.map((item, i) => (
                                    <StaggerItem key={i}>
                                        <div className="timeline-item">
                                            <TimelineCard {...item} />
                                        </div>
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        </div>
                    </SectionReveal>
                </div>
            </div>
        </section>
    );
}

/* ─── Timeline card sub-component ─────────────────────────── */
function TimelineCard({
    logo,
    title,
    org,
    period,
    bullets,
}: {
    logo: string;
    title: string;
    org: string;
    period: string;
    bullets: string[];
}) {
    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="card-gradient-border"
            style={{ padding: 24 }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 14,
                }}
            >
                <img
                    src={logo}
                    alt={org}
                    style={{
                        width: 44,
                        height: 44,
                        borderRadius: "var(--radius-sm)",
                        objectFit: "contain",
                        background: "var(--bg-card-hover)",
                        padding: 4,
                    }}
                />
                <div>
                    <h4 style={{ fontSize: "1rem", fontWeight: 600, lineHeight: 1.3 }}>{title}</h4>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>{org}</p>
                </div>
            </div>
            <p
                style={{
                    fontSize: "0.75rem",
                    color: "var(--accent)",
                    fontWeight: 600,
                    marginBottom: 12,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                }}
            >
                {period}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {bullets.map((b, i) => (
                    <li
                        key={i}
                        style={{
                            fontSize: "0.88rem",
                            lineHeight: 1.7,
                            color: "var(--text-secondary)",
                            marginBottom: 8,
                            paddingLeft: 16,
                            position: "relative",
                        }}
                    >
                        <span
                            style={{
                                position: "absolute",
                                left: 0,
                                top: "0.5em",
                                width: 5,
                                height: 5,
                                borderRadius: "50%",
                                background: "var(--accent-glow-strong)",
                            }}
                        />
                        {b}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}
