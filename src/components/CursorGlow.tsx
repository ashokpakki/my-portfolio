import { useEffect, useRef } from "react";

export default function CursorGlow() {
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = glowRef.current;
        if (!el) return;

        // Hide on touch devices
        if ("ontouchstart" in window) {
            el.style.display = "none";
            return;
        }

        let rafId: number;
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        const handleMove = (e: MouseEvent) => {
            targetX = e.clientX;
            targetY = e.clientY;
        };

        const animate = () => {
            // Smooth lerp
            currentX += (targetX - currentX) * 0.08;
            currentY += (targetY - currentY) * 0.08;
            el.style.transform = `translate(${currentX - 300}px, ${currentY - 300}px)`;
            rafId = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMove);
        animate();

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("mousemove", handleMove);
        };
    }, []);

    return (
        <div
            ref={glowRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: 600,
                height: 600,
                borderRadius: "50%",
                background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
                pointerEvents: "none",
                zIndex: 1,
                opacity: 0.5,
                willChange: "transform",
            }}
        />
    );
}
