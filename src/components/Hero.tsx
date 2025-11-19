import { motion } from "framer-motion";
import { SiLinkedin, SiGithub, SiLeetcode, SiGmail } from "react-icons/si";
import { ImLocation } from "react-icons/im";
import Greeting from "./Greeting";

export default function Hero() {
  return (
    <section
      id="hero"
      className="h-screen w-full flex flex-col items-center justify-center bg-black text-white px-6 select-none"
    >
      {/* Main container for fade-in */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        {/* BIG Animated Gradient Text */}
        <h1>
          <Greeting text="Hello !" />
        </h1>
        <motion.h1
          whileHover={{ scale: 1.1, textShadow: "0px 0px 20px #ff00ffff" }}
          className="text-7xl md:text-8xl font-extrabold mb-6 bg-gradient-to-r from-pink-400 via-red-500 to-purple-500 bg-clip-text text-transparent animate-gradient cursor-hover"
        >
          I'm Ashok Pakki
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-lg md:text-2xl text-white/80"
        >
          A developer passionate about building simple, functional web apps.
          Focused on web development, backend architecture, and clean code.
        </motion.p>
        <motion.div
          className="flex items-center justify-center space-x-2 mt-2 text-white/70"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <ImLocation className="h-10 w-5 text-orange-500  " />
          <span className="text-xl md:text-2xl font-semibold text-white-500">
            Hyderabad ,
          </span>
          <span className="text-xl md:text-2xl font-semibold text-green-500">
            India
          </span>
        </motion.div>
      </motion.div>

      <div className="flex justify-center space-x-8 mt-6">
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/pakkiashok/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white transition-colors"
          aria-label="LinkedIn"
        >
          <SiLinkedin className="text-gray-300 hover:text-white h-6 w-6" />
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/ashokpakki"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white transition-colors"
          aria-label="GitHub"
        >
          <SiGithub className="text-gray-300 hover:text-white h-6 w-6" />
        </a>

        {/* Twitter / X */}
        <a
          href="https://www.leetcode.com/u/Nightout/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white transition-colors"
          aria-label="Leetcode"
        >
          <SiLeetcode className="h-6 w-6 text-gray-300 hover:text-white transition-colors" />
        </a>

        {/* Email */}
        <a
          href="mailto:pakkiashok18@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white transition-colors"
          aria-label="Email"
        >
          <SiGmail className="text-gray-300 hover:text-white h-6 w-6" />
        </a>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 text-white/70 text-sm"
      >
        ↓ scroll
      </motion.div>
    </section>
  );
}
