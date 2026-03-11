import { useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

/**
 * Premium Grok-style Starry Background
 * - High-speed parallax stars with simulated Earth curvature movement
 * - Occasional high-speed comets
 * - Smoothly fades out upon user interaction (click, scroll, type) to preserve focus
 * - Hardware-accelerated Canvas 2D rendering
 */
export default function StarryCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    const prefersReducedMotion = useRef(
        typeof window !== "undefined"
            ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
            : false
    );

    useEffect(() => {
        if (theme === "light") return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let lastTime = performance.now();

        // Negative initialize so it starts fully opaque
        let lastInteractionTime = -10000;
        let globalOpacity = 1;

        // Fades out stars for 2.5 seconds after any interaction to reduce noise
        const handleInteraction = () => {
            lastInteractionTime = performance.now();
        };

        window.addEventListener("pointerdown", handleInteraction, { passive: true });
        window.addEventListener("keydown", handleInteraction, { passive: true });
        window.addEventListener("wheel", handleInteraction, { passive: true });
        window.addEventListener("touchstart", handleInteraction, { passive: true });

        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        };
        resize();
        window.addEventListener("resize", resize);

        const isMobile = window.innerWidth < 768;
        const starCount = isMobile ? 90 : 200;

        // Initialize parallax stars
        const stars = Array.from({ length: starCount }, () => ({
            x: Math.random() * width * 1.5 - width * 0.25,
            baseY: Math.random() * height * 1.5 - height * 0.25, // Height variation
            z: Math.random() * 0.8 + 0.2, // Depth for parallax and size
            opacity: Math.random() * 0.5 + 0.3, // Brightness
        }));

        interface Comet {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
        }
        const comets: Comet[] = [];

        const render = (time: number) => {
            const dt = Math.min(time - lastTime, 50); // Cap delta-time to avoid huge jumps
            lastTime = time;

            ctx.clearRect(0, 0, width, height);

            // Interaction fade logic
            const timeSinceInteraction = time - lastInteractionTime;
            const isInteracting = timeSinceInteraction < 2500;
            const targetOpacity = isInteracting ? 0 : 1;

            // Smoothly ease opacity (fast fade out, gentle fade in)
            const fadeSpeed = targetOpacity === 0 ? 0.005 : 0.0015;
            if (globalOpacity < targetOpacity) {
                globalOpacity = Math.min(globalOpacity + dt * fadeSpeed, targetOpacity);
            } else if (globalOpacity > targetOpacity) {
                globalOpacity = Math.max(globalOpacity - dt * fadeSpeed, targetOpacity);
            }

            // Pause entire rendering loop visually if perfectly hidden to save GPU
            if (globalOpacity <= 0.001) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            // The larger the curveStrength, the steeper the "Earth curvature" appears
            const curveStrength = isMobile ? 0.0005 : 0.00020;
            const cx = width / 2;

            // Draw Stars
            for (const s of stars) {
                if (!prefersReducedMotion.current) {
                    s.x += s.z * dt * 0.06; // Move left to right, depth-based parallax

                    // Wrap around with procedural randomized heights to keep it organic
                    if (s.x > width + 50) {
                        s.x = -50;
                        s.baseY = Math.random() * height * 1.5 - height * 0.25;
                    }
                }

                // Parabolic curve to simulate looking at the horizon from orbit
                const curve = Math.pow(s.x - cx, 2) * curveStrength * s.z;
                const y = s.baseY + curve;

                // Only draw if within bounds vertically to save fill-rate
                if (y > -10 && y < height + 10) {
                    ctx.beginPath();
                    ctx.arc(s.x, y, s.z * 1.5, 0, Math.PI * 2); // Size scales with depth
                    ctx.fillStyle = `rgba(200, 230, 255, ${s.opacity * globalOpacity})`;
                    ctx.fill();
                }
            }

            // Comets rendering and logic
            if (!prefersReducedMotion.current) {
                // Occasional comet spawns (~1 every 7 seconds on average at 60fps)
                if (Math.random() < 0.00015 * dt) {
                    comets.push({
                        x: -100,
                        y: Math.random() * height * 0.8, // Anywhere on screen
                        vx: Math.random() * 0.8 + 1.2, // High speed
                        vy: Math.random() * 0.3 - 0.1, // Slight drift
                        size: Math.random() * 1.5 + 1
                    });
                }

                for (let i = comets.length - 1; i >= 0; i--) {
                    const c = comets[i];
                    c.x += c.vx * dt;
                    c.y += c.vy * dt;

                    const tailLength = c.vx * 120;
                    const angle = Math.atan2(c.vy, c.vx);

                    const endX = c.x - Math.cos(angle) * tailLength;
                    const endY = c.y - Math.sin(angle) * tailLength;

                    const grad = ctx.createLinearGradient(c.x, c.y, endX, endY);
                    // Sharp bright head fading into dark tail
                    grad.addColorStop(0, `rgba(220, 240, 255, ${globalOpacity})`);
                    grad.addColorStop(1, `rgba(220, 240, 255, 0)`);

                    ctx.beginPath();
                    ctx.lineCap = "round";
                    ctx.lineWidth = c.size * 2;
                    ctx.moveTo(c.x, c.y);
                    ctx.lineTo(endX, endY);
                    ctx.strokeStyle = grad;
                    ctx.stroke();

                    // Remove comets that are far off screen
                    if (c.x > width + tailLength + 50) {
                        comets.splice(i, 1);
                    }
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("pointerdown", handleInteraction);
            window.removeEventListener("keydown", handleInteraction);
            window.removeEventListener("wheel", handleInteraction);
            window.removeEventListener("touchstart", handleInteraction);
            window.removeEventListener("resize", resize);
        };
    }, [theme]);

    if (theme === "light") return null;

    return (
        <canvas
            ref={canvasRef}
            className="global-starry-canvas fixed inset-0 pointer-events-none"
            style={{ width: "100%", height: "100%", zIndex: 0 }}
            aria-hidden="true"
        />
    );
}
