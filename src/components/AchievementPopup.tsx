import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import { playAchievementSound } from "@/lib/audio";

interface AchievementPopupProps {
  show: boolean;
  title: string;
  description: string;
  onClose: () => void;
}

const AchievementPopup = ({ show, title, description, onClose }: AchievementPopupProps) => {
  useEffect(() => {
    if (show) playAchievementSound();
  }, [show]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: "spring", damping: 15 }}
          className="fixed bottom-8 right-8 z-50 max-w-sm"
        >
          <div className="game-card border-gold/50 flex items-center gap-4" style={{ boxShadow: "0 0 30px hsl(45 90% 55% / 0.3)" }}>
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
              <Trophy className="w-6 h-6 text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-mono text-xs text-gold text-glow-gold uppercase tracking-wider">{title}</p>
              <p className="font-display text-sm font-semibold text-foreground mt-1">{description}</p>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-sm ml-2">✕</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementPopup;
