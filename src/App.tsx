import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="bg-black text-white">
      <Navbar />

      {/* SCROLL SNAP CONTAINER */}
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
        {/* EACH SECTION HAS SNAP */}
        <section className="snap-start">
          <Hero />
        </section>

        <section className="snap-start">
          <About />
        </section>

        <section className="snap-start">
          <Projects />
        </section>

        <section className="snap-start">
          <Contact />
        </section>
      </div>
    </div>
  );
}
