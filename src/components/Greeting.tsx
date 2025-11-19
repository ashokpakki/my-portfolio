import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type GreetingProps = { text: string };

const Greeting = ({ text }: GreetingProps) => {
  const letters = Array.from(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.05 * i },
    }),
  };

  const child: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.h1
      className="text-6xl md:text-8xl font-extrabold flex justify-center"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          className="mx-0.5 text-transparent text-white"
          whileHover={{ scale: 1.2, textShadow: "0px 0px 20px #00ffffff" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default Greeting;
