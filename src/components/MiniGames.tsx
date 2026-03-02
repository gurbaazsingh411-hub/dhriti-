import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Rocket, Gift, Video, BookOpen } from "lucide-react";

interface MiniGamesProps {
  onGameComplete: () => void;
  completedGames: number;
}

const MiniGames = ({ onGameComplete, completedGames }: MiniGamesProps) => {
  return (
    <section className="min-h-screen px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-mono text-sm text-primary text-glow mb-2"
        >
          {"// TRAINING_GROUNDS.exe"}
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4"
        >
          Birthday Training
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-mono text-xs text-muted-foreground mb-10"
        >
          Experience the chaos in full 2D!
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group overflow-hidden rounded-3xl border border-primary/20 bg-black/40 p-8 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold/5" />
            <div className="relative z-10">
              <div className="flex justify-center gap-4 mb-4">
                <Gift className="text-gold animate-bounce" size={32} />
                <Rocket className="text-primary animate-pulse" size={32} />
              </div>
              <h4 className="text-xl font-display font-bold mb-2">Monkey Birthday Blast</h4>
              <p className="text-muted-foreground font-mono text-[10px] mb-6">Avoid Errors, Collect 18 Cakes.</p>
              <Link to="/game" className="neon-button text-xs py-3 px-6">LAUNCH GAME_</Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative group overflow-hidden rounded-3xl border border-destructive/20 bg-black/40 p-8 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 via-transparent to-primary/5" />
            <div className="relative z-10">
              <div className="flex justify-center gap-4 mb-4">
                <Video className="text-primary animate-pulse" size={32} />
                <BookOpen className="text-destructive animate-bounce" size={32} />
              </div>
              <h4 className="text-xl font-display font-bold mb-2">Class Skipper Dash</h4>
              <p className="text-muted-foreground font-mono text-[10px] mb-6">Skip 4 days of class, film that ass reel.</p>
              <Link to="/skipper" className="neon-button border-destructive text-destructive text-xs py-3 px-6">RECORD REEL_</Link>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 flex justify-center gap-6 opacity-40">
          <h3 className="font-display text-xl font-bold">Activity Hub</h3>
          <span className="text-xs font-mono">v18.0</span>
          <span className="text-xs font-mono">ENGINE: DUAL_GAME_SYNC</span>
          <span className="text-xs font-mono">ENERGY: PEAK</span>
        </div>
      </div>
    </section>
  );
};

export default MiniGames;
