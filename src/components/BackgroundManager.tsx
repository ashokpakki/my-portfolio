import { useTheme } from "../context/ThemeContext";
import StarryCanvas from "./StarryCanvas";

/**
 * Empty placeholder for future light mode background (e.g. Stripe Mesh)
 */
function LightModeBackground() {
    return null;
}

/**
 * Safely manages background presentation between themes.
 * Prevents light mode / dark mode backgrounds from simultaneously rendering and bleeding.
 */
export default function BackgroundManager() {
    const { theme } = useTheme();

    return (
        <>
            {/* Global dark mode starry background */}
            {theme === "dark" && <StarryCanvas />}
            
            {/* Future pure-white or animated light mode background */}
            {theme === "light" && <LightModeBackground />}
        </>
    );
}
