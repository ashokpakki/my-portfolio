import { ThemeProvider } from "./context/ThemeContext";
import CursorGlow from "./components/CursorGlow";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
    return (
        <ThemeProvider>
            {/* Global cursor spotlight */}
            <CursorGlow />

            {/* Fixed navigation */}
            <Navbar />

            {/* Main content */}
            <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
            </main>

            <Footer />
        </ThemeProvider>
    );
}
