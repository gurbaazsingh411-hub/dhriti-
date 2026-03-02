import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { startLofiMusic, stopLofiMusic } from "@/lib/audio";

const MusicToggle = () => {
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (playing) {
      stopLofiMusic();
    } else {
      startLofiMusic();
    }
    setPlaying(!playing);
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2 }}
      onClick={toggle}
      className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/50 transition-colors group"
      title={playing ? "Mute lo-fi beats" : "Play lo-fi beats"}
    >
      {playing ? (
        <Volume2 className="w-4 h-4 text-primary group-hover:text-primary animate-pulse-glow" />
      ) : (
        <VolumeX className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
      )}
    </motion.button>
  );
};

export default MusicToggle;
