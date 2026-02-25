import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Check once at module level — stable across renders */
const prefersReducedMotion =
    typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

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
    // If reduced motion, render immediately without animation
    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    const dirMap = {
        up: { y: 50, x: 0 },
        left: { y: 0, x: -50 },
        right: { y: 0, x: 50 },
    };

    const { x, y } = dirMap[direction];

    return (
        <motion.div
            initial={{ opacity: 0, y, x }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
                duration: 0.6,
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
    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

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
    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 25 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.45,
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
