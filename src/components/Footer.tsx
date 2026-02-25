import { SiGithub, SiLinkedin } from "react-icons/si";

export default function Footer() {
    return (
        <footer
            style={{
                padding: "40px 24px",
                textAlign: "center",
            }}
        >
            {/* Animated gradient top border */}
            <div className="footer-border" />

            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    paddingTop: 40,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                }}
            >
                {/* Social row */}
                <div style={{ display: "flex", gap: 16 }}>
                    <a
                        href="https://github.com/ashokpakki"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        style={{ color: "var(--text-tertiary)", transition: "color 0.3s ease" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-tertiary)")}
                    >
                        <SiGithub size={18} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/pakkiashok/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        style={{ color: "var(--text-tertiary)", transition: "color 0.3s ease" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-tertiary)")}
                    >
                        <SiLinkedin size={18} />
                    </a>
                </div>

                <p
                    style={{
                        fontSize: "0.8rem",
                        color: "var(--text-tertiary)",
                        fontWeight: 400,
                    }}
                >
                    Designed & built by Ashok Pakki &middot; {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    );
}
