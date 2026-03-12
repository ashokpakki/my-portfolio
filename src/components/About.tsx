import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

/* ─── Shared Data (Scalable) ──────────────────────────────── */
const timelineData = [
    {
        type: "intro",
        title: "The Philosophy",
        color: "#FF3366", // Vibrant Neon Pink
        rotation: -3,
        content: (
            <div style={{ fontSize: "1.2rem", lineHeight: 1.8, fontWeight: 500 }}>
                <p>
                    I believe great software doesn't just work—it makes you <em>feel</em> something.
                </p>
                <p style={{ marginTop: 16 }}>
                    As a final-year engineering student at NIT Allahabad, I approach application architecture with the precision of a structural engineer and the creative defiance of a designer.
                </p>
                <p style={{ marginTop: 16 }}>
                    Every pixel is calculated. Every query is optimized. The standard is excellence.
                </p>
            </div>
        )
    },
    {
        type: "experience",
        title: "Udaan — SWE Intern",
        color: "#00E676", // Acid Green
        rotation: 2,
        period: "2024",
        content: (
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                <li style={{ marginBottom: 12, position: "relative", paddingLeft: 20 }}>
                    <span style={{ position: "absolute", left: 0, top: 8, width: 8, height: 8, background: "currentColor", borderRadius: "50%" }} />
                    Optimized internal warehouse management applications and critical inventory tracking pipelines.
                </li>
                <li style={{ marginBottom: 12, position: "relative", paddingLeft: 20 }}>
                    <span style={{ position: "absolute", left: 0, top: 8, width: 8, height: 8, background: "currentColor", borderRadius: "50%" }} />
                    Collaborated closely with backend teams on data operations, massively improving query performance.
                </li>
                <li style={{ position: "relative", paddingLeft: 20 }}>
                    <span style={{ position: "absolute", left: 0, top: 8, width: 8, height: 8, background: "currentColor", borderRadius: "50%" }} />
                    Contributed directly to CI/CD workflows and agile sprints with cross-functional teams.
                </li>
            </ul>
        )
    },
    {
        type: "education",
        title: "NIT Allahabad",
        color: "#FFEA00", // Canary Yellow
        rotation: -2,
        period: "B.Tech CS • 2021 – 2025",
        content: (
            <p style={{ fontSize: "1.05rem", lineHeight: 1.6 }}>
                Deep-diving into computer science fundamentals, data structures, algorithms, and systems programming.
                <br/><br/>
                Active builder in coding clubs and participant in high-stakes hackathons, focusing on highly scalable full-stack applications.
            </p>
        )
    },
    {
        type: "tools",
        title: "The Arsenal",
        color: "#D500F9", // Electric Purple
        rotation: 4,
        content: (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Framer Motion", "Go", "Docker", "AWS"].map(tech => (
                    <span key={tech} style={{
                        padding: "8px 16px",
                        border: "2px solid currentColor",
                        fontWeight: 700,
                        fontSize: "0.9rem"
                    }}>
                        {tech}
                    </span>
                ))}
            </div>
        )
    }
];

/* ─── Parallax Node Component ─────────────────────────────── */
function ParallaxNode({ 
    data, 
    index, 
    isLight 
}: { 
    data: typeof timelineData[0], 
    index: number, 
    isLight: boolean 
}) {
    const isEven = index % 2 === 0;
    const alignClass = isEven ? "left" : "right";
    
    // In Dark Mode, it's a pure white HUD pane (no rotation, no crazy colors).
    // In Light Mode, it's a vibrant, rotated paper-cutout.
    const rotation = isLight ? data.rotation : 0;
    const shadowColor = isLight ? data.color : "rgba(0,0,0,0)";
    
    const style: React.CSSProperties = {
        alignSelf: isEven ? "flex-start" : "flex-end",
        transform: `rotate(${rotation}deg)`,
        boxShadow: isLight ? `12px 12px 0px ${shadowColor}` : undefined,
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 100, rotate: rotation - (isEven ? -10 : 10) }}
            whileInView={{ opacity: 1, y: 0, rotate: rotation }}
            viewport={{ once: true, margin: "-150px" }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className={`parallax-node ${alignClass}`}
            style={style}
        >
            <div className="tether-branch" />
            
            <div style={{ paddingBottom: 24, marginBottom: 24, borderBottom: `2px solid ${isLight ? data.color : "rgba(255,255,255,0.2)"}` }}>
                <h3 style={{ fontSize: "2rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em" }}>
                    {data.title}
                </h3>
                {data.period && (
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, opacity: 0.8, marginTop: 8 }}>
                        {data.period}
                    </div>
                )}
            </div>
            
            <div style={{ color: isLight ? "#333" : "rgba(255,255,255,0.85)" }}>
                {data.content}
            </div>
        </motion.div>
    );
}

/* ─── Main Section ────────────────────────────────────────── */
export default function About() {
    const { theme } = useTheme();
    const isLightMode = theme === "light";
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Animate the tether extending down as you scroll
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="about" className="section-padding" style={{ position: "relative", minHeight: "150vh" }}>
            <div className="section-container" style={{ position: "relative", maxWidth: 1000, margin: "0 auto" }}>
                
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="parallax-center-node"
                    style={{ marginBottom: 120 }}
                >
                    <p style={{
                        fontSize: "0.85rem", fontWeight: 800, color: isLightMode ? "#1a1a2e" : "#ffffff",
                        letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16
                    }}>
                        Chapter 01
                    </p>
                    <h2 style={{
                        fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 900,
                        letterSpacing: "-0.04em", lineHeight: 1,
                        textTransform: "uppercase"
                    }}>
                        The Journey
                    </h2>
                </motion.div>

                {/* Vertical Timeline Container */}
                <div ref={containerRef} style={{ position: "relative", display: "flex", flexDirection: "column", padding: "0 20px" }}>
                    
                    {/* The Central Tether */}
                    <motion.div 
                        className="parallax-tether" 
                        style={{ scaleY, transformOrigin: "top center" }} 
                    />

                    {/* Timeline Nodes */}
                    {timelineData.map((data, idx) => (
                        <ParallaxNode 
                            key={idx} 
                            data={data} 
                            index={idx} 
                            isLight={isLightMode} 
                        />
                    ))}

                </div>

            </div>
        </section>
    );
}
