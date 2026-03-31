import { SiGithub, SiLinkedin } from "react-icons/si";

export default function Footer() {
    return (
        <footer className="border-t border-[var(--border-muted)] bg-[var(--background)] py-12 px-6">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                
                <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-[var(--heading)]">
                    AP<span className="text-[var(--accent)]">.</span>
                </div>

                <p className="text-sm text-[var(--foreground)] font-medium text-center md:text-left">
                    Designed & built by Ashok Pakki &copy; {new Date().getFullYear()}
                </p>

                <div className="flex gap-4">
                    <a
                        href="https://github.com/ashokpakki"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--foreground)] hover:text-[var(--heading)] transition-colors p-2 rounded-full hover:bg-[var(--border-muted)]"
                    >
                        <SiGithub size={20} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/pakkiashok/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--foreground)] hover:text-[var(--heading)] transition-colors p-2 rounded-full hover:bg-[var(--border-muted)]"
                    >
                        <SiLinkedin size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
