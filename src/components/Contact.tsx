import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, Mail, Send } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import SectionReveal from "./SectionReveal";

const contactLinks = [
    {
        icon: <Mail size={24} strokeWidth={2} />,
        label: "Email",
        href: "mailto:pakkiashok18@gmail.com",
        color: "var(--color-1)"
    },
    {
        icon: <SiLinkedin size={22} />,
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/pakkiashok/",
        color: "var(--color-2)"
    },
    {
        icon: <SiGithub size={22} />,
        label: "GitHub",
        href: "https://github.com/ashokpakki",
        color: "var(--color-3)"
    },
    {
        icon: <Code2 size={24} strokeWidth={2} />,
        label: "LeetCode",
        href: "https://www.leetcode.com/u/Nightout/",
        color: "var(--color-4)"
    },
];

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    
    // Tiny tilt on the form purely for fun
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const smoothX = useSpring(x, { damping: 50, stiffness: 400 });
    const smoothY = useSpring(y, { damping: 50, stiffness: 400 });
    const rotateX = useTransform(smoothY, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <section id="contact" className="section-padding relative overflow-hidden bg-transparent">
            {/* Massive background text */}
            <div className="absolute top-[20%] right-[-10vw] flex flex-col pointer-events-none opacity-[0.03] select-none text-[20vw] font-black leading-none uppercase z-0">
                <span>CONNECT</span>
                <span>COLLAB</span>
            </div>

            <div className="container-main mx-auto relative z-10">
                <SectionReveal>
                    <div className="text-center md:text-left mb-20 max-w-4xl">
                        <p className="text-[var(--color-3)] font-black tracking-[0.2em] uppercase text-sm mb-4">
                            Let's Build It
                        </p>
                        <h2 className="text-[clamp(4rem,9vw,7rem)] font-black tracking-tighter uppercase mb-6 drop-shadow-lg leading-none">
                            Drop a <br />
                            <span className="text-gradient-animated italic">Line</span>
                        </h2>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start pb-[10vh]">
                    <SectionReveal direction="left" delay={0.1}>
                        <div className="flex flex-col gap-8">
                            <p className="text-xl md:text-2xl font-bold tracking-tight text-foreground leading-relaxed">
                                Always open to full-time roles, freelance, or deep conversations about web architecture. Based in Hyderabad. 
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {contactLinks.map((link) => (
                                    <motion.a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05, y: -4 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex flex-col items-center justify-center gap-4 aspect-square rounded-[2rem] border border-[var(--border)] glass-super transition-all duration-300"
                                        style={{ boxShadow: `0 10px 30px ${link.color}15` }}
                                        onHoverStart={(e) => {
                                            const el = e.currentTarget as HTMLElement;
                                            el.style.backgroundColor = link.color;
                                            el.style.color = "#000";
                                            el.style.boxShadow = `0 0 40px ${link.color}80`;
                                            // Optional invert to black icons if possible, handled mostly by text color inherit
                                        }}
                                        onHoverEnd={(e) => {
                                            const el = e.currentTarget as HTMLElement;
                                            el.style.backgroundColor = "";
                                            el.style.color = "";
                                            el.style.boxShadow = `0 10px 30px ${link.color}15`;
                                        }}
                                    >
                                        <div className="mb-2">{link.icon}</div>
                                        <span className="font-extrabold uppercase tracking-wider text-sm">{link.label}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </SectionReveal>

                    <SectionReveal direction="right" delay={0.2}>
                        <motion.div 
                            style={{ rotateX, rotateY, perspective: 1000 }}
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                x.set((e.clientX - rect.left) / rect.width - 0.5);
                                y.set((e.clientY - rect.top) / rect.height - 0.5);
                            }}
                            onMouseLeave={() => {
                                x.set(0); y.set(0);
                            }}
                            className="p-8 md:p-12 rounded-[2rem] border-2 border-[var(--color-1)] bg-card shadow-[0_20px_50px_var(--color-1)] backdrop-blur-3xl transition-shadow"
                        >
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-16 text-center"
                                >
                                    <div className="w-20 h-20 mx-auto rounded-full bg-[var(--color-1)] flex items-center justify-center mb-8 text-black shadow-[0_0_30px_var(--color-1)] animate-bounce">
                                        <Send size={32} />
                                    </div>
                                    <h3 className="text-4xl font-black text-foreground mb-4 uppercase tracking-tighter">Transmission Sent</h3>
                                    <p className="text-xl font-medium text-muted-foreground">Thanks for reaching out. I'll get back to you soon.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                    <div className="space-y-3 relative group">
                                        <div className="absolute inset-0 bg-[var(--color-2)] -inset-1 rounded-xl blur opacity-0 group-focus-within:opacity-30 transition-opacity" />
                                        <input
                                            type="text"
                                            placeholder="Who are you?"
                                            className="relative w-full bg-background border border-border rounded-xl px-6 py-4 text-lg font-semibold text-foreground placeholder-muted-foreground focus:outline-none focus:border-[var(--color-2)] transition-all uppercase tracking-wide"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3 relative group">
                                        <div className="absolute inset-0 bg-[var(--color-3)] -inset-1 rounded-xl blur opacity-0 group-focus-within:opacity-30 transition-opacity" />
                                        <input
                                            type="email"
                                            placeholder="Where can I reach you?"
                                            className="relative w-full bg-background border border-border rounded-xl px-6 py-4 text-lg font-semibold text-foreground placeholder-muted-foreground focus:outline-none focus:border-[var(--color-3)] transition-all uppercase tracking-wide"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3 relative group">
                                        <div className="absolute inset-0 bg-[var(--color-4)] -inset-1 rounded-xl blur opacity-0 group-focus-within:opacity-30 transition-opacity" />
                                        <textarea
                                            placeholder="What's the mission?"
                                            rows={5}
                                            className="relative w-full bg-background border border-border rounded-xl px-6 py-4 text-lg font-semibold text-foreground placeholder-muted-foreground focus:outline-none focus:border-[var(--color-4)] transition-all uppercase tracking-wide resize-y min-h-[160px]"
                                            required
                                        />
                                    </div>
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full flex items-center justify-center gap-4 bg-foreground text-background font-black text-lg uppercase tracking-widest py-5 rounded-xl mt-6 hover:shadow-[0_0_30px_var(--color-1)] transition-all hover:bg-[var(--color-1)] hover:text-black border-2 border-transparent"
                                    >
                                        Initiate
                                        <Send size={20} strokeWidth={3} />
                                    </motion.button>
                                </form>
                            )}
                        </motion.div>
                    </SectionReveal>
                </div>
            </div>
        </section>
    );
}
