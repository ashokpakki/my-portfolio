import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

export default function Hero() {
    const { scrollY } = useScroll();
    const yTransform = useTransform(scrollY, [0, 800], [0, 300]);
    const opacityTransform = useTransform(scrollY, [0, 400], [1, 0]);

    // Magnetic cursor effect for the massive text block itself
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
    const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

    const rotateX = useTransform(smoothY, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-5deg", "5deg"]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const clientX = e.clientX - rect.left - width / 2;
            const clientY = e.clientY - rect.top - height / 2;
            
            mouseX.set(clientX / width);
            mouseY.set(clientY / height);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section
            id="hero"
            className="relative min-h-[110vh] flex flex-col items-center justify-center overflow-hidden"
            style={{ perspective: 1000 }}
        >
            <motion.div
                ref={containerRef}
                style={{
                    y: yTransform,
                    opacity: opacityTransform,
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                className="z-10 w-full flex flex-col items-center justify-center pointer-events-none"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, filter: "blur(20px)" }}
                    animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                >
                    {/* The massive dynamic gradient title */}
                    <h1 className="text-[clamp(5rem,22vw,18rem)] font-black leading-[0.8] tracking-[-0.04em] text-center mb-6">
                        <span className="text-gradient-animated block transform-gpu translate-z-10">ASHOK</span>
                        <span className="text-foreground block transform-gpu translate-z-[20px] drop-shadow-2xl">PAKKI</span>
                    </h1>

                    <div className="flex flex-col sm:flex-row items-center gap-6 mt-12 px-6 pointer-events-auto" style={{ transform: "translateZ(30px)" }}>
                        <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--color-1)] glass-super shadow-[0_0_30px_var(--color-1)] text-foreground font-semibold text-sm hover-glow-super cursor-default">
                            <span className="relative flex h-3 w-3 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-3)] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-3)]"></span>
                            </span>
                            Available for hire
                        </div>

                        <a 
                            href="#projects" 
                            className="px-8 py-3 rounded-full bg-foreground text-background font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform"
                        >
                            View Work
                        </a>
                    </div>
                </motion.div>
            </motion.div>

            {/* Awwwards style aesthetic marker */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-12 left-8 md:left-12 flex items-center gap-3 text-sm font-bold tracking-[0.2em] uppercase text-foreground z-20"
            >
                <div className="w-8 h-[2px] bg-[var(--color-2)] shadow-[0_0_10px_var(--color-2)]" />
                <span className="text-gradient-animated">Scroll Explorer</span>
            </motion.div>
            
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-12 right-8 md:right-12 hidden md:flex items-center gap-2 text-sm font-bold text-foreground z-20"
            >
                <MapPin size={16} className="text-[var(--color-1)] animate-bounce" />
                Hyderabad
            </motion.div>
        </section>
    );
}
