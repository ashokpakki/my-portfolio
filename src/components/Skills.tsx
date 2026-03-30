import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";

// Hardcoded vibrant hexes for individual pills
const skillGroups = [
    {
        category: "Languages",
        hex: "#ff3366",
        skills: ["Java", "C++", "TypeScript", "JavaScript"],
    },
    {
        category: "Frameworks & Libs",
        hex: "#ff9933",
        skills: ["React", "Next.js", "Node.js", "Express", "Spring Boot", "TailwindCSS"],
    },
    {
        category: "Databases",
        hex: "#00ccff",
        skills: ["MySQL", "MongoDB", "PostgreSQL"],
    },
    {
        category: "Platforms & Tools",
        hex: "#7b2cbf",
        skills: ["Git", "Docker", "AWS", "Postman", "Linux"],
    },
];

export default function Skills() {
    return (
        <section id="skills" className="relative section-padding bg-background w-full overflow-hidden">
            <div className="container-main mx-auto">
                <SectionReveal delay={0}>
                    <div className="flex flex-col items-center md:items-start text-center md:text-left mb-24">
                        <p className="text-[var(--color-1)] font-bold tracking-[0.2em] uppercase text-sm mb-4">
                            The Arsenal
                        </p>
                        <h2 className="text-[clamp(3.5rem,8vw,6rem)] font-black leading-none tracking-[-0.03em] uppercase mb-8">
                            Built with <br />
                            <span className="text-gradient-animated">Power</span>
                        </h2>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                    {skillGroups.map((group, gi) => (
                        <SectionReveal key={gi} delay={gi * 0.1}>
                            <div className="flex flex-col gap-6">
                                <h3 
                                    className="text-2xl font-black uppercase tracking-tight flex items-center gap-4"
                                    style={{ color: group.hex }}
                                >
                                    <span className="w-12 h-1 block rounded-full" style={{ background: group.hex }} />
                                    {group.category}
                                </h3>
                                
                                <div className="flex flex-wrap gap-3">
                                    {group.skills.map((skill, si) => (
                                        <motion.div
                                            key={si}
                                            whileHover={{ scale: 1.05, y: -4 }}
                                            className="relative px-6 py-3 rounded-[2rem] font-bold text-sm tracking-wide uppercase transition-colors duration-300"
                                            style={{
                                                backgroundColor: `${group.hex}15`,
                                                color: group.hex,
                                                border: `2px solid ${group.hex}40`
                                            }}
                                            onHoverStart={(e) => {
                                                const el = e.target as HTMLElement;
                                                el.style.backgroundColor = group.hex;
                                                el.style.color = "#000";
                                                el.style.boxShadow = `0 0 20px ${group.hex}80`;
                                            }}
                                            onHoverEnd={(e) => {
                                                const el = e.target as HTMLElement;
                                                el.style.backgroundColor = `${group.hex}15`;
                                                el.style.color = group.hex;
                                                el.style.boxShadow = "none";
                                            }}
                                        >
                                            {skill}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
