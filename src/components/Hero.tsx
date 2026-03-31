import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden"
        >
            {/* Stripe-like Animated Gradient Mesh */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="mesh-blob bg-[var(--accent)] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] top-[-20%] left-[-10%]" style={{ animationDelay: '0s', animationDuration: '25s' }} />
                <div className="mesh-blob bg-[var(--secondary)] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] top-[10%] right-[-10%]" style={{ animationDelay: '-7s', animationDuration: '30s' }} />
                <div className="mesh-blob bg-[var(--tertiary)] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bottom-[-30%] left-[10%]" style={{ animationDelay: '-15s', animationDuration: '35s' }} />
            </div>

            <div className="container-main px-6 mx-auto w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Column: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col items-start text-left max-w-2xl"
                    >
                        {/* Status pill */}
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-light)] text-[var(--accent)] font-semibold text-sm mb-8 border border-[var(--accent)]/10">
                            <span className="relative flex h-2 w-2 mr-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
                            </span>
                            Available for hire
                        </div>

                        {/* Massive Typography */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[var(--heading)] leading-[1.05] mb-6">
                            Ashok Pakki. <br />
                            <span className="text-[var(--foreground)] font-medium">Full Stack <br/> Developer.</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-[var(--foreground)] mb-10 max-w-lg leading-relaxed font-medium">
                            I build scalable, high-performance web applications and systems with a focus on modern architecture and clean design.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <a 
                                href="#projects" 
                                className="group btn-primary flex items-center gap-2 w-full sm:w-auto justify-center text-base"
                            >
                                View Work
                                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </a>
                            <a 
                                href="#contact" 
                                className="group flex items-center gap-2 px-6 py-2.5 rounded-lg text-[var(--heading)] font-semibold border border-[var(--border)] hover:bg-[var(--border-muted)] transition-colors w-full sm:w-auto justify-center text-base"
                            >
                                Contact Me
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Column: Subtle abstract element or strictly whitespace? 
                        Stripe usually has beautiful graphics here. We'll use a clean, sophisticated 
                        abstract tech-related structural element using CSS/Framer Motion */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden lg:flex justify-end relative"
                    >
                        <div className="relative w-full max-w-md aspect-square">
                            {/* Abstract layered plates resembling modern server racks or structural code blocks */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--border-muted)] to-transparent rounded-3xl transform rotate-3" />
                            <div className="absolute inset-4 bg-[var(--card)] border border-[var(--border)] shadow-xl rounded-2xl flex flex-col p-8 gap-4 overflow-hidden">
                                {/* Code/Structure representation */}
                                <div className="h-4 w-1/3 bg-[var(--border)] rounded-full animate-pulse opacity-50" />
                                <div className="h-4 w-3/4 bg-[var(--border)] rounded-full animate-pulse opacity-40 delay-75" />
                                <div className="h-4 w-1/2 bg-[var(--border)] rounded-full animate-pulse opacity-60 delay-150" />
                                
                                <div className="mt-auto flex justify-between items-center text-[var(--foreground)] text-sm font-medium border-t border-[var(--border)] pt-4">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-[var(--accent)]" />
                                        Hyderabad, India
                                    </div>
                                    <div className="text-[var(--accent)] font-mono text-xs bg-[var(--accent-light)] px-2 py-1 rounded">
                                        SYS.ONLINE
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
