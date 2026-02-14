import SectionReveal, { StaggerContainer, StaggerItem } from "./SectionReveal";

const skillGroups = [
    {
        category: "Languages",
        skills: [
            { label: "Java", icon: "java/java-original" },
            { label: "C++", icon: "cplusplus/cplusplus-original" },
            { label: "TypeScript", icon: "typescript/typescript-original" },
            { label: "JavaScript", icon: "javascript/javascript-original" },
        ],
    },
    {
        category: "Frameworks & Libraries",
        skills: [
            { label: "React", icon: "react/react-original" },
            { label: "Node.js", icon: "nodejs/nodejs-original" },
            { label: "Express", icon: "express/express-original", invert: true },
            { label: "Spring Boot", icon: "spring/spring-original" },
            { label: "TailwindCSS", icon: "tailwindcss/tailwindcss-original" },
        ],
    },
    {
        category: "Databases",
        skills: [
            { label: "MySQL", icon: "mysql/mysql-original" },
            { label: "MongoDB", icon: "mongodb/mongodb-original" },
            { label: "PostgreSQL", icon: "postgresql/postgresql-original" },
        ],
    },
    {
        category: "Tools & Platforms",
        skills: [
            { label: "Git", icon: "git/git-original" },
            { label: "Postman", icon: "postman/postman-original" },
            { label: "VS Code", icon: "vscode/vscode-original" },
            { label: "Linux", icon: "linux/linux-original" },
        ],
    },
];

export default function Skills() {
    return (
        <section id="skills" className="section-padding" style={{ position: "relative" }}>
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
                            Tech Stack
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
                            Technologies I work with
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
                            From architecting robust backend systems in Java and Spring Boot to
                            building reactive frontends with React and TypeScript — I choose the
                            right tool for each problem.
                        </p>
                    </div>
                </SectionReveal>

                {/* Skill Groups */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                        gap: 48,
                    }}
                >
                    {skillGroups.map((group, gi) => (
                        <SectionReveal key={gi} delay={gi * 0.1}>
                            <h3
                                style={{
                                    fontSize: "0.95rem",
                                    fontWeight: 600,
                                    color: "var(--text-primary)",
                                    marginBottom: 20,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                }}
                            >
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: 18,
                                        height: 2,
                                        background: "var(--accent)",
                                        borderRadius: 1,
                                    }}
                                />
                                {group.category}
                            </h3>
                            <StaggerContainer
                                staggerDelay={0.06}
                                className=""
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 10,
                                    }}
                                >
                                    {group.skills.map((s, si) => (
                                        <StaggerItem key={si}>
                                            <div
                                                className="skill-pill"
                                                style={s.invert ? {} : {}}
                                            >
                                                <img
                                                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${s.icon}.svg`}
                                                    alt={s.label}
                                                    style={{
                                                        filter: s.invert ? "var(--icon-invert, none)" : "none",
                                                    }}
                                                />
                                                {s.label}
                                            </div>
                                        </StaggerItem>
                                    ))}
                                </div>
                            </StaggerContainer>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
