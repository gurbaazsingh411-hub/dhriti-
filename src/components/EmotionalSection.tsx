import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const EmotionalSection = ({ unlocked }: { unlocked: boolean }) => {
  if (!unlocked) {
    return (
      <section className="min-h-[50vh] flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center game-card max-w-md"
        >
          <p className="font-mono text-sm text-muted-foreground">🔒 Section Locked</p>
          <p className="font-mono text-xs text-muted-foreground/70 mt-2">
            Complete at least 2 mini games to unlock this section.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 10, delay: 0.3 }}
          className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-8"
        >
          <Heart className="w-8 h-8 text-gold" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="font-mono text-sm text-gold text-glow-gold mb-2"
        >
          {"// BEHIND_THE_CHAOS.md"}
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="text-3xl md:text-4xl font-display font-bold text-foreground mb-10"
        >
          Behind The Chaos
        </motion.h3>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          className="space-y-6 text-foreground/80 font-body text-base md:text-lg leading-relaxed"
        >
          <p>
            Okay, real talk.
          </p>
          <p>
            Behind all the chaos, the unfiltered thoughts, and the 2 AM energy —
            there's someone who genuinely cares. Thank you for being so supportive through everything.
          </p>
          <p>
            You think being the youngest makes you less. But here's the truth:{" "}
            <span className="text-gold text-glow-gold font-semibold">
              you carry more strength than people twice your age.
            </span>
          </p>
          <p>
            I mean, who else can say they <span className="text-chaos text-glow-chaos font-bold">literally made 2 girls lesbian for them</span>? That's peak main character energy.
          </p>
          <p>
            Your loyalty isn't loud. It's consistent. Your support isn't performative. It's real.
            You don't just listen — you understand.
          </p>
          <p>
            The world throws bugs, deadlines, and breakdowns at you — and you face them
            with the same energy you bring to everything else:{" "}
            <span className="text-chaos text-glow-chaos font-semibold">unapologetically full-on.</span>
          </p>
          <p className="text-muted-foreground text-sm font-mono mt-8">
            — from someone who's glad the backend broke (and the reels were ass).
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EmotionalSection;
