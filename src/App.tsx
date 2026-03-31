import { ThemeProvider } from "./context/ThemeContext";

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
            {/* Fixed navigation */}
            <Navbar />

            {/* Main content */}
            <main className="relative w-full">
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
