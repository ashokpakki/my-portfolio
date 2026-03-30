import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackgroundManager() {
    // Only render heavy framer motion blurs after hydration to avoid SSR mismatch if Next.js, 
    // but here we just ensure a smooth mount.
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-background transition-colors duration-700">
            {/* The underlying fluid blobs */}
            <motion.div
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -100, 50, 0],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full blob-1 mix-blend-multiply dark:mix-blend-screen opacity-60"
            />
            
            <motion.div
                animate={{
                    x: [0, -150, 100, 0],
                    y: [0, 150, -100, 0],
                    scale: [1, 1.2, 0.8, 1],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full blob-2 mix-blend-multiply dark:mix-blend-screen opacity-50"
            />

            <motion.div
                animate={{
                    x: [0, 100, -150, 0],
                    y: [0, 100, 100, 0],
                    scale: [1, 0.9, 1.1, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[10%] left-[30%] w-[50vw] h-[50vw] rounded-full blob-4 mix-blend-multiply dark:mix-blend-screen opacity-40"
            />

            {/* The crushing blur overlay that turns CSS blobs into a rich, living liquid glass */}
            <div className="absolute inset-0 blur-overlay z-0" />
            
            {/* Subtle noise grain for extreme premium texture */}
            <div 
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] z-10 pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
}
