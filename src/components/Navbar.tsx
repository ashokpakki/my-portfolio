import { Dock, DockIcon } from "./Dock";
import {
  SiHomebridge,
  SiAboutdotme,
  SiBookstack,
  SiMaildotru,
} from "react-icons/si";
import { FaRegFilePdf } from "react-icons/fa";

export default function Navbar() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <Dock>
        <DockIcon onClick={() => scrollTo("hero")}>
          <SiHomebridge className="text-white text-3xl" />
        </DockIcon>

        <DockIcon onClick={() => scrollTo("about")}>
          <SiAboutdotme className="text-white text-3xl" />
        </DockIcon>

        <DockIcon onClick={() => scrollTo("projects")}>
          <SiBookstack className="text-white text-3xl" />
        </DockIcon>

        <DockIcon onClick={() => scrollTo("contact")}>
          <SiMaildotru className="text-white text-3xl" />
        </DockIcon>
        <DockIcon>
          <a
            href="https://flowcv.com/resume/c75adcr9ji"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Resume"
          >
            <FaRegFilePdf className="text-white text-3xl" />
          </a>
        </DockIcon>
      </Dock>
    </nav>
  );
}
