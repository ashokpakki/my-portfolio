import { motion } from "framer-motion";

const skillGroups = [
    {
        category: "Languages",
        description: "Primary programming languages used for application logic.",
        skills: ["Java", "C++", "TypeScript", "JavaScript"],
    },
    {
        category: "Frameworks & Libs",
        description: "Core technologies used to build interfaces and backends.",
        skills: ["React", "Next.js", "Node.js", "Express", "Spring Boot", "TailwindCSS"],
    },
    {
        category: "Databases",
        description: "Relational and NoSQL robust datastores for scalable systems.",
        skills: ["MySQL", "MongoDB", "PostgreSQL"],
    },
    {
        category: "Platforms & Tools",
        description: "DevOps and deployment systems for CI/CD.",
        skills: ["Git", "Docker", "AWS", "Postman", "Linux"],
    },
];

export default function Skills() {
    return (
        <section id="skills" className="section-padding bg-[var(--background)] border-y border-[var(--border-muted)] relative overflow-hidden">
            
            {/* Subtle background abstract element */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--accent)] opacity-[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="container-main px-6 mx-auto relative z-10">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <p className="text-[var(--accent)] font-bold tracking-wider uppercase text-sm mb-3">
                        Arsenal
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--heading)] mb-6">
                        Technical Stack
                    </h2>
                    <p className="text-lg text-[var(--foreground)] font-medium">
                        The tools, languages, and frameworks I use to bring ideas to production rapidly and reliably.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skillGroups.map((group, gi) => (
                        <motion.div
                            key={gi}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: gi * 0.1 }}
                            className="stripe-card p-8 hover:-translate-y-1 transition-transform"
                        >
                            <h3 className="text-xl font-bold text-[var(--heading)] mb-2 flex items-center gap-3 border-b border-[var(--border-muted)] pb-4">
                                {group.category}
                            </h3>
                            <p className="text-[var(--foreground)] text-sm mb-6 mt-4">
                                {group.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-2">
                                {group.skills.map((skill, si) => (
                                    <div
                                        key={si}
                                        className="px-4 py-2 bg-[var(--card)] border border-[var(--border)] rounded-full text-sm font-semibold text-[var(--heading)] shadow-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-default"
                                    >
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
