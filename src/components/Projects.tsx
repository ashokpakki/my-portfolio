import { useRef } from "react";
import { motion, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";
import { MoveUpRight } from "lucide-react";

const projects = [
    {
        title: "WRITER AI",
        description: "Grok API powered generative AI content creation platform.",
        img: "/images/writerai.png",
        link: "https://writer-ai-six.vercel.app/login",
        color: "var(--color-1)",
        hex: "#ff3366" // Fallback reference
    },
    {
        title: "BLOG SYSTEM",
        description: "Scaleable minimal blogging platform with rich text.",
        img: "/images/blogapp.png",
        link: "https://github.com/ashokpakki/Blog-app-main",
        color: "var(--color-2)",
        hex: "#ff9933"
    },
    {
        title: "BLACKJACK",
        description: "Classic dealer AI and casino game logic in Java.",
        img: "/images/blackjack.png",
        link: "https://github.com/ashokpakki/Blackjack",
        color: "var(--color-3)",
        hex: "#00ccff"
    },
    {
        title: "QUOTES",
        description: "A beautifully animated daily inspiration tool.",
        img: "/images/ran.png",
        link: "https://github.com/ashokpakki/ran",
        color: "var(--color-4)",
        hex: "#7b2cbf"
    },
];

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Map the horizontal scroll to the vertical scroll of a massive container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scrollYProgressSpring = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

    // The magical velocity calculation that drives the 3D bend
    const scrollVelocity = useVelocity(scrollYProgress);
    const velocityScale = useTransform(scrollVelocity, [-0.5, 0, 0.5], [-1, 0, 1]);
    const smoothVelocity = useSpring(velocityScale, { damping: 50, stiffness: 400 });

    // When scrolling fast, cards lean back deeply into the screen
    const skewX = useTransform(smoothVelocity, [-1, 1], ["-12deg", "12deg"]);
    const rotateY = useTransform(smoothVelocity, [-1, 1], ["-15deg", "15deg"]);
    const scale = useTransform(smoothVelocity, [-1, 0, 1], [0.95, 1, 0.95]);

    // Translate the cards horizontally
    // 4 projects -> 3 stops -> -300vw max shift approx
    // We adjust exact % to get a nice stop at the end.
    const x = useTransform(scrollYProgressSpring, [0, 1], ["10%", "-100%"]);

    return (
        <section id="projects" className="relative h-[400vh] bg-transparent" ref={containerRef}>
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                
                {/* Massive Background Title */}
                <div className="absolute top-[10%] left-0 w-full overflow-hidden whitespace-nowrap opacity-10 pointer-events-none select-none">
                    <motion.h2 
                        className="text-[20vw] font-black italic tracking-tighter text-foreground uppercase"
                        style={{ x: useTransform(scrollYProgressSpring, [0, 1], ["0%", "-50%"]) }}
                    >
                        SELECTED PROJECTS ARCHIVE
                    </motion.h2>
                </div>

                <motion.div 
                    style={{ x }} 
                    className="relative flex items-center gap-[10vw] px-[15vw] pt-20"
                >
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            style={{ 
                                skewX, 
                                rotateY, 
                                scale,
                                perspective: 1200,
                                transformStyle: "preserve-3d" 
                            }}
                            className="relative flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-[40vw] max-w-[500px] group"
                        >
                            <a 
                                href={project.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="block relative aspect-[4/5] rounded-3xl overflow-hidden glass-super hover-glow-super"
                                style={{
                                    border: `2px solid ${project.color}`,
                                    boxShadow: `0 0 30px ${project.color}30`
                                }}
                            >
                                {/* Solid poppy color block that sweeps out on hover */}
                                <div 
                                    className="absolute inset-0 z-10 origin-bottom transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-y-0"
                                    style={{ background: project.color }}
                                >
                                    <div className="h-full flex flex-col justify-end p-8 md:p-12">
                                        <p className="font-extrabold text-[4vw] sm:text-[2vw] text-black tracking-tighter uppercase blur-none leading-[0.9]">
                                            {project.title}
                                        </p>
                                    </div>
                                </div>

                                {/* Actual image revealed underneath */}
                                <div className="absolute inset-0 z-0 bg-background overflow-hidden">
                                    <motion.img 
                                        style={{
                                            // Counter parallax on the physical image based on scroll
                                            x: useTransform(scrollYProgressSpring, [0, 1], ["-10%", "10%"]),
                                            scale: 1.15
                                        }}
                                        src={project.img} 
                                        alt={project.title} 
                                        className="w-[120%] h-full object-cover object-center group-hover:brightness-110 transition-all duration-700" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                </div>

                                {/* Persistent overlay data */}
                                <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-12 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                    <div className="self-end w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
                                        <MoveUpRight size={24} strokeWidth={3} />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-white italic tracking-tighter mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-white/80 font-medium">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Fixed Scroll Tracker Line */}
                <div className="absolute bottom-12 w-[60vw] max-w-lg h-1 bg-border rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full rounded-full" 
                        style={{ 
                            background: "linear-gradient(90deg, var(--color-1), var(--color-3))",
                            scaleX: scrollYProgressSpring,
                            transformOrigin: "left"
                        }} 
                    />
                </div>
            </div>
        </section>
    );
}
