import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  "Accessing chaotic memories...",
  "Detecting 18th Birthday... [SUCCESS]",
  "Loading monkey energy... 100/10",
  "Supabase trauma suppressed.",
  "BTech 1st Year modules loaded.",
  "System ready. Happy Birthday!",
];

const HeroSection = ({ onEnter }: { onEnter: () => void }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [bootComplete, setBootComplete] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (currentLine >= bootLines.length) {
      setTimeout(() => setBootComplete(true), 500);
      return;
    }

    const line = bootLines[currentLine];
    if (charIndex < line.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + line[charIndex]);
        setCharIndex(charIndex + 1);
      }, 30);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + "\n");
        setCurrentLine(currentLine + 1);
        setCharIndex(0);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentLine, charIndex]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline pointer-events-none z-10" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Boot sequence */}
      <div className="relative z-20 w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-sm md:text-base text-primary/80 mb-8 whitespace-pre-line min-h-[180px]"
        >
          {displayedText}
          {!bootComplete && (
            <span className="animate-blink text-primary">█</span>
          )}
        </motion.div>

        <AnimatePresence>
          {bootComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-2">
                <span className="text-glow-chaos text-chaos">Dhriti</span>
                <span className="text-muted-foreground text-2xl md:text-3xl lg:text-4xl block mt-1">
                  Chaos Simulator
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="font-mono text-lg md:text-xl text-primary text-glow mt-4 mb-2"
              >
                <span className="text-primary mr-2">{"//"}</span>
                v18.0
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="font-mono text-sm text-accent text-glow-chaos"
              >
                Energy Level: MONKEY_MODE
              </motion.p>


              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onEnter}
                className="neon-button mt-10"
              >
                {">"} Enter System_
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection;
