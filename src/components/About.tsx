import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue, useSpring } from "framer-motion";

const slices = [
    {
        title: "PRECISION",
        text: "Every pixel calculated.",
        subtext: "I build software that makes an impact. It's not just code; it's a visceral experience.",
        color: "text-[var(--color-1)]"
    },
    {
        title: "UDAAN",
        text: "Warehouse optimization.",
        subtext: "Re-engineered data operations and massively scaled queries in agile sprints.",
        color: "text-[var(--color-2)]"
    },
    {
        title: "NIT ALD",
        text: "B.Tech Computer Science",
        subtext: "Deep diving into algorithms, highly scalable architectures, and intense hackathons.",
        color: "text-[var(--color-3)]"
    },
    {
        title: "ARSENAL",
        text: "TypeScript • React • Node.js",
        subtext: "Framer Motion • PostgreSQL • Go • Docker • AWS",
        color: "text-[var(--color-4)]"
    }
];

function SpatialSlice({
    slice,
    index,
    progress,
    total
}: {
    slice: typeof slices[0];
    index: number;
    progress: MotionValue<number>;
    total: number;
}) {
    // Math for a spatial scroll:
    // When progress hits (index / total), this card should be perfectly at scale 1, opacity 1, blur 0.
    // When progress is earlier, card is scaled down (far away), blurred.
    // When progress is later, card scales up radically (zooms past camera), fades out rapidly.

    const targetPos = index / total;
    const window = 1 / total; // How much scroll scroll this takes
    const startPos = targetPos - window;
    const endPos = targetPos + window * 0.8;

    const scale = useTransform(
        progress,
        [Math.max(0, startPos), targetPos, endPos],
        [0.2, 1, 6] // Zooms in from tiny, rests, then explodes past screen
    );

    const opacity = useTransform(
        progress,
        [Math.max(0, startPos), startPos + window * 0.5, targetPos, endPos - window * 0.3, endPos],
        [0, 1, 1, 0, 0]
    );

    const blur = useTransform(
        progress,
        [Math.max(0, startPos), targetPos, endPos],
        ["blur(20px)", "blur(0px)", "blur(30px)"]
    );

    return (
        <motion.div
            style={{
                scale,
                opacity,
                filter: blur,
                zIndex: total - index
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
        >
            <h2 className={`text-[clamp(4rem,12vw,10rem)] font-black tracking-tighter leading-none mb-4 drop-shadow-2xl ${slice.color}`}>
                {slice.title}
            </h2>
            <p className="text-3xl md:text-5xl font-black text-foreground mb-6 uppercase tracking-widest drop-shadow-lg max-w-4xl">
                {slice.text}
            </p>
            <p className="text-xl md:text-2xl text-foreground/80 font-medium max-w-2xl mx-auto drop-shadow-md">
                {slice.subtext}
            </p>
        </motion.div>
    );
}

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Smooth the scroll heavily so the spatial zoom feels incredibly cinematic, like flying
    const rawProgress = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    }).scrollYProgress;
    
    const scrollYProgress = useSpring(rawProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <section id="about" className="relative bg-transparent h-auto">
            {/* Massive scrolling container: 500vh to give a ton of scrolling runway */}
            <div ref={containerRef} className="relative w-full" style={{ height: "500vh" }}>
                
                {/* The "Camera Lens" sticky view */}
                <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                    
                    {/* Dark gradient overlay at edges to vignette the tunnel */}
                    <div className="absolute inset-0 pointer-events-none z-50 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_100%)] opacity-80" />

                    {slices.map((slice, i) => (
                        <SpatialSlice 
                            key={i} 
                            slice={slice} 
                            index={i} 
                            progress={scrollYProgress} 
                            total={slices.length} 
                        />
                    ))}
                    
                    {/* Fixed progress text */}
                    <div className="absolute top-10 right-10 z-50 mix-blend-difference">
                        <motion.div className="text-foreground text-4xl font-black">
                            <motion.span>{useTransform(scrollYProgress, v => Math.floor(v * 100))}</motion.span>%
                        </motion.div>
                        <div className="text-[var(--color-1)] text-xs tracking-[0.3em] font-bold mt-1 text-right uppercase">Depth</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
