import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="h-screen w-full flex items-center justify-center bg-black text-white px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-xl w-full"
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-cyan-400">
          Contact Me
        </h2>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message submitted! (You can wire actual backend later)");
          }}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <textarea
            placeholder="Your Message"
            rows={4}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <button
            type="submit"
            className="bg-cyan-600 hover:bg-purple-700 transition rounded-lg py-3 font-semibold"
          >
            Send
          </button>
        </form>
      </motion.div>
    </section>
  );
}
