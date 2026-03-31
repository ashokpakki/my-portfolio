import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveUpRight, Folder, LayoutGrid, Server, Gamepad2, FileText } from "lucide-react";

// Categorized projects
const projects = [
    {
        id: "writer-ai",
        title: "Writer AI",
        description: "Grok API powered generative AI content creation platform. High-quality essays and code.",
        img: "/images/writerai.png",
        link: "https://writer-ai-six.vercel.app/login",
        tags: ["React", "Node.js", "AI"],
        category: "Full Stack"
    },
    {
        id: "blog-system",
        title: "Blog System",
        description: "Scaleable minimal blogging platform with rich text formatting and a highly optimized DB.",
        img: "/images/blogapp.png",
        link: "https://github.com/ashokpakki/Blog-app-main",
        tags: ["TypeScript", "Next.js", "PostgreSQL"],
        category: "Full Stack"
    },
    {
        id: "blackjack",
        title: "Blackjack",
        description: "Classic dealer AI and casino game logic in Java. Features full probability tracking.",
        img: "/images/blackjack.png",
        link: "https://github.com/ashokpakki/Blackjack",
        tags: ["Java", "OOP", "Algorithms"],
        category: "Software"
    },
    {
        id: "quotes",
        title: "Quotes",
        description: "A beautifully animated daily inspiration tool serving cached random quotes via edge.",
        img: "/images/ran.png",
        link: "https://github.com/ashokpakki/ran",
        tags: ["Framer Motion", "Redis"],
        category: "Frontend"
    },
];

const categories = [
    { name: "All Projects", icon: <LayoutGrid size={16} /> },
    { name: "Full Stack", icon: <Server size={16} /> },
    { name: "Frontend", icon: <Folder size={16} /> },
    { name: "Software", icon: <Gamepad2 size={16} /> },
];

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState("All Projects");

    const filteredProjects = projects.filter(p => 
        activeFilter === "All Projects" || p.category === activeFilter
    );

    return (
        <section id="projects" className="section-padding relative">
            {/* Soft gradient background for this section just to give the window a nice surface to blur */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-light)] to-transparent opacity-30 pointer-events-none" />

            <div className="container-main px-6 mx-auto relative z-10">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <div className="max-w-2xl">
                        <p className="text-[var(--accent)] font-bold tracking-wider uppercase text-sm mb-3">
                            Portfolio
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--heading)] mb-6">
                            Selected Projects
                        </h2>
                        <p className="text-xl text-[var(--foreground)] font-medium">
                            A showcase of recent engineering work, ranging from full-stack SaaS applications to core algorithmic logic.
                        </p>
                    </div>
                </div>

                {/* --- Mac Finder Window UI --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mac-window w-full flex flex-col"
                >
                    {/* Title Bar */}
                    <div className="h-12 bg-[var(--glass-sidebar)] border-b border-[var(--border-muted)] flex items-center px-4 relative">
                        {/* Traffic Lights */}
                        <div className="flex gap-2 z-10">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                            <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                        </div>
                        {/* Title */}
                        <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-[var(--foreground)] tracking-wide pointer-events-none">
                            Developer — Finder
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row min-h-[500px] h-auto md:max-h-[700px]">
                        {/* Sidebar */}
                        <div className="mac-sidebar w-full md:w-64 p-4 flex flex-col gap-1 shrink-0">
                            <div className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider mb-2 ml-2 mt-2">
                                Favorites
                            </div>
                            
                            {categories.map((cat) => (
                                <button
                                    key={cat.name}
                                    onClick={() => setActiveFilter(cat.name)}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors outline-none text-left ${
                                        activeFilter === cat.name 
                                            ? "bg-[var(--accent)] text-white shadow-sm" 
                                            : "text-[var(--foreground)] hover:bg-[var(--border-muted)] hover:text-[var(--heading)]"
                                    }`}
                                >
                                    <span className={`${activeFilter === cat.name ? "text-white" : "text-[var(--accent)]"}`}>
                                        {cat.icon}
                                    </span>
                                    {cat.name}
                                </button>
                            ))}

                            <div className="mt-8 mb-2 ml-2 text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                                External
                            </div>
                            <a 
                                href="https://github.com/ashokpakki"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors outline-none text-left text-[var(--foreground)] hover:bg-[var(--border-muted)] hover:text-[var(--heading)] group"
                            >
                                <span className="text-[var(--foreground)] group-hover:text-[var(--heading)] transition-colors">
                                    <MoveUpRight size={16} />
                                </span>
                                Github Archive
                            </a>
                        </div>

                        {/* Main Content Area (Files) */}
                        <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-[var(--background)]/30">
                            <motion.div 
                                layout 
                                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6"
                            >
                                <AnimatePresence mode="popLayout">
                                    {filteredProjects.map((project) => (
                                        <motion.div
                                            key={project.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.25, type: "spring", bounce: 0 }}
                                            className="group flex flex-col bg-[var(--card)] rounded-xl border border-[var(--border-muted)] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            {/* File Preview Thumbnail */}
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block relative aspect-[16/10] overflow-hidden bg-[var(--border-muted)]"
                                            >
                                                <img
                                                    src={project.img}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] pointer-events-none" />
                                            </a>

                                            {/* File Metadata */}
                                            <div className="p-5 flex flex-col flex-1">
                                                <div className="flex items-center gap-2 mb-3 flex-wrap">
                                                    <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-[var(--foreground)] bg-[var(--border-muted)] px-2 py-0.5 rounded">
                                                        <FileText size={10} />
                                                        {project.category}
                                                    </span>
                                                </div>
                                                
                                                <h3 className="text-lg font-bold text-[var(--heading)] mb-1 flex items-center justify-between group-hover:text-[var(--accent)] transition-colors">
                                                    {project.title}
                                                </h3>
                                                
                                                <p className="text-[var(--foreground)] text-sm leading-relaxed mb-4">
                                                    {project.description}
                                                </p>

                                                <div className="mt-auto flex gap-2 flex-wrap">
                                                    {project.tags.map(tag => (
                                                        <span key={tag} className="text-xs font-semibold text-[var(--accent)] bg-[var(--accent-light)] px-2 py-1 rounded-md">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
