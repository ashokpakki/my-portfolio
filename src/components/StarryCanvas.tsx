import { useRef, useEffect, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";

/**
 * Global starry night canvas background (dark mode only).
 * 
 * - ~200 static stars + ~50 twinkling stars with sine-wave opacity
 * - Fixed position behind all content (z-index: 0)
 * - Canvas 2D — lightweight for simple dot rendering
 * - Respects prefers-reduced-motion — static dots only, no twinkle
 * - Proper cleanup of rAF and resize listener
 */
export default function StarryCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();
    const frameRef = useRef<number>(0);
    const starsRef = useRef<{
        static: { x: number; y: number; r: number; a: number }[];
        twinkling: { x: number; y: number; r: number; speed: number; phase: number }[];
    } | null>(null);

    const prefersReducedMotion = useRef(
        typeof window !== "undefined"
            ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
            : false
    );

    const generateStars = useCallback((w: number, h: number) => {
        // Seeded pseudo-random for consistency across redraws
        let seed = 42;
        const rand = () => {
            seed = (seed * 16807) % 2147483647;
            return (seed - 1) / 2147483646;
        };

        const isMobile = window.innerWidth < 768;
        const staticCount = isMobile ? 80 : 200;
        const twinkleCount = isMobile ? 15 : 50;

        const staticStars = [];
        for (let i = 0; i < staticCount; i++) {
            staticStars.push({
                x: rand() * w,
                y: rand() * h,
                r: rand() * 1.2 + 0.3,
                a: rand() * 0.35 + 0.08,
            });
        }

        const twinkling = [];
        for (let i = 0; i < twinkleCount; i++) {
            twinkling.push({
                x: rand() * w,
                y: rand() * h,
                r: rand() * 1.5 + 0.5,
                speed: rand() * 0.015 + 0.004,
                phase: rand() * Math.PI * 2,
            });
        }

        starsRef.current = { static: staticStars, twinkling };
    }, []);

    const startDrawing = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);

        generateStars(w, h);
        const stars = starsRef.current;
        if (!stars) return;

        // If reduced motion, draw once and stop
        if (prefersReducedMotion.current) {
            ctx.clearRect(0, 0, w, h);
            for (const s of stars.static) {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 220, 255, ${s.a})`;
                ctx.fill();
            }
            for (const t of stars.twinkling) {
                ctx.beginPath();
                ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 220, 255, 0.3)`;
                ctx.fill();
            }
            return;
        }

        let time = 0;
        const animate = () => {
            ctx.clearRect(0, 0, w, h);

            // Static stars — warm blue-white tint
            for (const s of stars.static) {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 220, 255, ${s.a})`;
                ctx.fill();
            }

            // Twinkling stars
            for (const t of stars.twinkling) {
                const alpha = 0.1 + 0.45 * (0.5 + 0.5 * Math.sin(time * t.speed * 60 + t.phase));
                ctx.beginPath();
                ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`;
                ctx.fill();
            }

            time++;
            frameRef.current = requestAnimationFrame(animate);
        };

        animate();
    }, [generateStars]);

    useEffect(() => {
        if (theme === "light") return;

        startDrawing();

        let resizeTimer: number;
        const handleResize = () => {
            cancelAnimationFrame(frameRef.current);
            clearTimeout(resizeTimer);
            // Debounce resize per GLOBAL_AI_RULES
            resizeTimer = window.setTimeout(() => {
                startDrawing();
            }, 150);
        };

        window.addEventListener("resize", handleResize, { passive: true });

        return () => {
            cancelAnimationFrame(frameRef.current);
            clearTimeout(resizeTimer);
            window.removeEventListener("resize", handleResize);
        };
    }, [theme, startDrawing]);

    if (theme === "light") return null;

    return (
        <canvas
            ref={canvasRef}
            className="global-starry-canvas"
            aria-hidden="true"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
