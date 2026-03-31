import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Code2, Database } from "lucide-react";

const experienceItems = [
    {
        title: "UDAAN",
        role: "Warehouse Optimization Engineer",
        description: "Re-engineered data operations and massively scaled queries in agile sprints. Focused on optimizing warehouse logistics through highly performant dashboards and automated workflows.",
        icon: <Briefcase size={20} />,
        date: "Experience"
    },
    {
        title: "NIT ALD",
        role: "B.Tech Computer Science",
        description: "Deep diving into algorithms, highly scalable architectures, and intense hackathons. Built a strong foundational understanding of computer science principles and software engineering.",
        icon: <GraduationCap size={20} />,
        date: "Education"
    }
];

export default function About() {
    return (
        <section id="about" className="section-padding bg-[var(--background)]">
            <div className="container-main px-6 mx-auto">
                <div className="max-w-3xl mb-16">
                    <p className="text-[var(--accent)] font-bold tracking-wider uppercase text-sm mb-3">
                        Background
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--heading)] mb-6">
                        Engineering with precision.
                    </h2>
                    <p className="text-xl text-[var(--foreground)] leading-relaxed font-medium">
                        I build software that makes an impact. Focusing on robust architectural patterns, automated scaling, and delivering seamless user experiences from the database layer up to the browser.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Experience Cards */}
                    {experienceItems.map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="stripe-card p-8 flex flex-col h-full"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <span className="text-sm font-semibold text-[var(--foreground)] bg-[var(--border-muted)] px-3 py-1 rounded-full">
                                    {item.date}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-[var(--heading)] mb-2">
                                {item.title}
                            </h3>
                            <div className="text-[var(--accent)] font-medium mb-4">
                                {item.role}
                            </div>
                            <p className="text-[var(--foreground)] leading-relaxed mt-auto">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
                
                {/* Secondary subtle info block */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-8 stripe-card-lg p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 bg-gradient-to-br from-[var(--card)] to-[var(--border-muted)]"
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[var(--heading)] font-bold mb-1">
                            <Code2 size={18} className="text-[var(--accent)]"/> Philosophy
                        </div>
                        <span className="text-[var(--foreground)] text-sm leading-relaxed">
                            Clean code. Strongly typed interfaces. Comprehensive testing. I treat infrastructure as code and deployments as mundane, repeatable events.
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[var(--heading)] font-bold mb-1">
                            <Database size={18} className="text-[var(--accent)]"/> Scale
                        </div>
                        <span className="text-[var(--foreground)] text-sm leading-relaxed">
                            Comfortable with designing schema, writing complex SQL, setting up replication, and managing distributed data stores across AWS.
                        </span>
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                         <div className="text-3xl font-bold text-[var(--heading)]">100%</div>
                         <div className="text-sm text-[var(--foreground)] font-medium">Dedication to every pixel calculated and every query optimized.</div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
