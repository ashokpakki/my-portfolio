import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: (e?: React.MouseEvent) => void;
    isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("theme") as Theme | null;
            if (stored) return stored;
            return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
        }
        return "dark";
    });

    const [isTransitioning, setIsTransitioning] = useState(false);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const timeoutRef = useRef<number>(0);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);

        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute("content", theme === "dark" ? "#05060f" : "#faf9f7");
        }
    }, [theme]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    const toggleTheme = useCallback((e?: React.MouseEvent) => {
        if (isTransitioning) return;

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReduced) {
            // Instant swap — no animation
            setTheme((prev) => (prev === "dark" ? "light" : "dark"));
            return;
        }

        // Get click position for clip-path origin
        let tx = "50%";
        let ty = "5%";
        if (e) {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            tx = `${rect.left + rect.width / 2}px`;
            ty = `${rect.top + rect.height / 2}px`;
        }

        setIsTransitioning(true);

        // Create and animate overlay
        const overlay = document.createElement("div");
        overlay.className = `theme-transition-overlay ${theme === "dark" ? "to-light" : "to-dark"}`;
        overlay.style.setProperty("--tx", tx);
        overlay.style.setProperty("--ty", ty);
        document.body.appendChild(overlay);
        overlayRef.current = overlay;

        // Force reflow then activate
        void overlay.offsetHeight;
        overlay.classList.add("active");

        // Swap theme at midpoint of animation
        timeoutRef.current = window.setTimeout(() => {
            setTheme((prev) => (prev === "dark" ? "light" : "dark"));
        }, 400);

        // Remove overlay after animation
        const cleanupTimeout = window.setTimeout(() => {
            overlay.classList.remove("active");
            overlay.style.opacity = "0";
            overlay.style.transition = "opacity 0.3s ease";

            const removeTimeout = window.setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
                overlayRef.current = null;
                setIsTransitioning(false);
            }, 300);

            // Store for cleanup
            timeoutRef.current = removeTimeout;
        }, 800);

        timeoutRef.current = cleanupTimeout;
    }, [isTransitioning, theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
    return ctx;
}
