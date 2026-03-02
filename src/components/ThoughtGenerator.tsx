import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const thoughts = [
  "Why do bugs only appear at 2 AM?",
  "I'll sleep early today. *opens laptop at midnight*",
  "Filter? What filter?",
  "I'm not chaotic, I'm just... efficient in my own way.",
  "Assignment due tomorrow? Cool cool cool cool cool.",
  "I don't need a therapist, I need a working database.",
  "Supabase betrayed us. Never forget.",
  "I'm the youngest, not the weakest. Remember that.",
  "Let me overthink this overthinking about overthinking.",
  "One does not simply close VS Code.",
  "I have the emotional range of a React component — lots of states.",
  "My code works and I have no idea why.",
  "My code doesn't work and I have no idea why.",
  "Coffee is just a debugging fluid.",
  "I'm not procrastinating. I'm strategically delaying.",
  "Error 500? More like Error 500 reasons to cry.",
  "Backend? More like back-pain.",
  "I run on caffeine and unresolved promises.",
  "If I was a function, I'd be async — always running late.",
  "The real bug was the stress we made along the way.",
];

const ThoughtGenerator = () => {
  const [currentThought, setCurrentThought] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  const generate = () => {
    let newThought: string;
    do {
      newThought = thoughts[Math.floor(Math.random() * thoughts.length)];
    } while (newThought === currentThought && thoughts.length > 1);
    setCurrentThought(newThought);
    setKey((prev) => prev + 1);
  };

  return (
    <div className="game-card text-center">
      <h4 className="font-mono text-sm text-electric text-glow-electric mb-1">Game 3</h4>
      <h3 className="font-display text-xl font-bold text-foreground mb-6">
        Unfiltered Thought Generator
      </h3>

      <div className="min-h-[80px] flex items-center justify-center mb-6">
        <AnimatePresence mode="wait">
          {currentThought && (
            <motion.p
              key={key}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="font-mono text-sm md:text-base text-foreground/90 italic max-w-md"
            >
              "{currentThought}"
            </motion.p>
          )}
          {!currentThought && (
            <motion.p
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="font-mono text-sm text-muted-foreground"
            >
              Press the button... if you dare.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={generate}
        className="neon-button border-chaos text-chaos hover:bg-chaos/10"
        style={{
          borderColor: "hsl(var(--chaos))",
          color: "hsl(var(--chaos))",
        }}
      >
        Generate Random Dhriti Thought
      </motion.button>
    </div>
  );
};

export default ThoughtGenerator;
