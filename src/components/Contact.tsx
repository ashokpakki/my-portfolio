import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Mail, Send } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";

const contactLinks = [
    {
        icon: <Mail size={20} strokeWidth={2} />,
        label: "Email",
        href: "mailto:pakkiashok18@gmail.com",
    },
    {
        icon: <SiLinkedin size={18} />,
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/pakkiashok/",
    },
    {
        icon: <SiGithub size={18} />,
        label: "GitHub",
        href: "https://github.com/ashokpakki",
    },
    {
        icon: <Code2 size={20} strokeWidth={2} />,
        label: "LeetCode",
        href: "https://www.leetcode.com/u/Nightout/",
    },
];

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <section id="contact" className="section-padding bg-[var(--background)]">
            <div className="container-main px-6 mx-auto relative z-10">
                
                <div className="text-center md:text-left mb-16 max-w-2xl">
                    <p className="text-[var(--accent)] font-bold tracking-wider uppercase text-sm mb-3">
                        Connect
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--heading)] mb-6">
                        Start a conversation.
                    </h2>
                    <p className="text-lg text-[var(--foreground)] font-medium">
                        Always open to discussing full-time roles, freelance opportunities, or general web architecture concepts.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start pb-[5vh]">
                    
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col gap-8"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {contactLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-[0_2px_4px_rgba(50,50,93,0.05)] hover:border-[var(--accent)] hover:shadow-[0_4px_12px_rgba(50,50,93,0.1)] transition-all duration-300"
                                >
                                    <div className="text-[var(--heading)] bg-[var(--background)] p-3 rounded-lg border border-[var(--border-muted)]">
                                        {link.icon}
                                    </div>
                                    <span className="font-semibold text-sm text-[var(--heading)]">{link.label}</span>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="stripe-card-lg p-8 sm:p-10"
                    >
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-12 text-center flex flex-col items-center justify-center min-h-[300px]"
                            >
                                <div className="w-16 h-16 rounded-full bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center mb-6">
                                    <Send size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-[var(--heading)] mb-3">Transmission Sent</h3>
                                <p className="text-[var(--foreground)]">Thanks for reaching out. I'll review and respond shortly.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-[var(--heading)]">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Jane Doe"
                                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm font-medium text-[var(--heading)] placeholder-[var(--foreground)] opacity-80 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-[var(--heading)]">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="jane@example.com"
                                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm font-medium text-[var(--heading)] placeholder-[var(--foreground)] opacity-80 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-[var(--heading)]">Message</label>
                                    <textarea
                                        placeholder="How can we help you?"
                                        rows={4}
                                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm font-medium text-[var(--heading)] placeholder-[var(--foreground)] opacity-80 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all resize-y min-h-[120px]"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn-primary mt-2 flex items-center justify-center gap-2"
                                >
                                    Send Message
                                    <Send size={16} />
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
