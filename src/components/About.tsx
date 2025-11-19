import { motion } from "framer-motion";

export default function About() {
  const skills = [
    {
      label: "Java",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
          className="w-10 h-10"
        />
      ),
    },
    {
      label: "C++",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
          className="w-10 h-10"
        />
      ),
    },
    {
      label: "TypeScript",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
          className="w-10 h-10"
        />
      ),
    },
    {
      label: "MySQL",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
          className="w-10 h-10"
        />
      ),
    },
    {
      label: "MongoDB",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
          className="w-10 h-10"
        />
      ),
    },
    {
      label: "PostgreSQL",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
          className="w-10 h-10"
        />
      ),
    },
    {
      label: "React",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
          className="w-10 h-10"
        />
      ),
    },
    {
      label: "Node.js",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
          className="w-10 h-10"
        />
      ),
    },
    {
      label: "Express",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
          className="w-10 h-10 invert"
        />
      ),
    },
    {
      label: "Spring Boot",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg"
          className="w-10 h-10"
        />
      ),
    },
    {
      label: "TailwindCSS",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
          className="w-10 h-10"
        />
      ),
    },
    {
      label: "Git",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
          className="w-10 h-10"
        />
      ),
    },
    {
      label: "Postman",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg"
          className="w-10 h-10"
        />
      ),
    },
  ];

  return (
    <section
      id="about"
      className="h-screen w-full bg-black text-white flex flex-col items-center justify-center px-6"
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-7xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient cursor-hover"
      >
        About Me
      </motion.h2>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl">
        {/* LEFT SIDE — Work + Education */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8"
        >
          {/* Work Experience */}
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-cyan-400">
              Work Experience
            </h2>
            <ul className="space-y-3 text-white/80">
              <li>
                <p className="flex items-center gap-3 text-lg">
                  <img
                    src="/images/udaan.png"
                    className="w-15 h-15 rounded-sm"
                  />
                  Software Developer Intern
                </p>
                <br />
                <p className="text-sm text-white/60">
                  Worked with Internal warehouse application and data
                  operations.
                </p>
              </li>
            </ul>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-cyan-400">
              Education
            </h2>
            <ul className="space-y-3 text-white/80">
              <li>
                <p className="flex items-center gap-3 text-lg">
                  <img
                    src="/images/mnnit.png"
                    className="w-15 h-15 rounded-sm"
                  />
                  Motilal Nehru National Institute of Technology Allahabad
                </p>
                <br />
                <p className="text-sm text-white/60">Bachelor's Degree</p>
              </li>
              <br />
              <li>
                <p className="flex items-center gap-3 text-lg">
                  <img
                    src="/images/aprjc.png"
                    className="w-15 h-15 rounded-sm"
                  />
                  AP Residential Jr College Venkatagiri
                </p>
                <br />
                <p className="text-sm text-white/60">Class XII</p>
              </li>
              {/* <li>
                <p className="flex items-center gap-3 text-lg">
                  <img
                    src="/logos/mnnit.png"
                    className="w-15 h-15 rounded-sm"
                  />
                  St. Joseph's High School Vizianagaram
                </p>
                <p className="text-sm text-white/60">Class X</p>
              </li> */}
            </ul>
          </div>
        </motion.div>

        {/* RIGHT SIDE — Skills */}

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <h2 className="text-2xl font-semibold mb-3 text-cyan-400">
            Tech Skills
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-8 place-items-center">
            {skills.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="text-4xl text-cyan-400">{s.icon}</div>
                <p className="text-sm text-white/70">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
