import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "left" | "right";
}

export default function SectionReveal({
    children,
    className = "",
    delay = 0,
    direction = "up",
}: SectionRevealProps) {
    const dirMap = {
        up: { y: 60, x: 0 },
        left: { y: 0, x: -60 },
        right: { y: 0, x: 60 },
    };

    const { x, y } = dirMap[direction];

    return (
        <motion.div
            initial={{ opacity: 0, y, x, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
                duration: 0.7,
                delay,
                ease: [0.22, 1, 0.36, 1] as const,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* Stagger container for lists/grids */
export function StaggerContainer({
    children,
    className = "",
    staggerDelay = 0.08,
}: {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1] as const,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
