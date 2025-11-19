import { motion } from "framer-motion";
export default function Projects() {
  const projects = [
    {
      title: "BlackJack Game",
      description:
        "This Java program implements a simple version of the popular card game, Blackjack",
      img: "/images/blackjack.png",
      link: "https://github.com/ashokpakki/Blackjack",
    },
    {
      title: "Writer AI",
      description:
        "A simple content-generation app powered by the Grok AI API. Creates summaries, ideas, and drafts instantly.",
      img: "/images/writerai.png",
      link: "https://writer-ai-six.vercel.app/login",
    },
    {
      title: "Quote Gen",
      description:
        "A simple tool that displays a new inspirational quote every time you click the button. Great for getting quick motivation or refreshing your mind.",
      img: "/images/ran.png",
      link: "https://github.com/ashokpakki/ran",
    },
    {
      title: "Blog App",
      description:
        "A minimal blogging platform where users can create, edit, and publish posts with ease. Built for smooth writing and organized content management.",
      img: "/images/blogapp.png",
      link: "https://github.com/ashokpakki/Blog-app-main",
    },
    /*{ title: "Project 5", description: "Small description", img: "" },
    { title: "Project 6", description: "Small description", img: "" },
    { title: "Project 7", description: "Small description", img: "" },
    { title: "Project 8", description: "Small description", img: "" },
     */
  ];

  return (
    <section
      id="projects"
      className="min-h-screen w-full bg-black text-white flex flex-col px-6 py-10"
    >
      <br />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-7xl md:text-8xl font-extrabold mb-6 leading-relaxed text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient cursor-hover"
      >
        Projects
      </motion.h1>
      <div className=" flex-1 overflow-x-auto overflow-y-hidden">
        {/* HORIZONTAL 2-ROW AUTO-FLOW GRID */}
        <div
          className="
        grid 
        grid-cols-1
        md:auto-cols-[550px] 
        md:grid-flow-col 
        md:grid-cols-none
        gap-8 
        px-8 py-6
      "
        >
          {projects.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white/10 border border-white/20 rounded-2xl p-6 w-full h-[350px] md:w-[500px] md:h-[400px] flex flex-col justify-between backdrop-blur-md"
            >
              <div className="h-60 bg-white/20 rounded-md flex items-center justify-center text-white/50">
                <img
                  src={p.img}
                  alt="project"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="text-sm text-white/60">{p.description}</p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg text-sm transition"
                >
                  Visit
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
