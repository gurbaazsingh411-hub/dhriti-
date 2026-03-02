import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import OriginStory from "@/components/OriginStory";
import ReelStory from "@/components/ReelStory";
import CharacterProfile from "@/components/CharacterProfile";
import MiniGames from "@/components/MiniGames";
import EmotionalSection from "@/components/EmotionalSection";
import SecretSection from "@/components/SecretSection";
import MusicToggle from "@/components/MusicToggle";

const Index = () => {
  const [entered, setEntered] = useState(false);
  const [completedGames, setCompletedGames] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    setEntered(true);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleGameComplete = useCallback(() => {
    setCompletedGames((prev) => Math.min(prev + 1, 3));
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <MusicToggle />
      <HeroSection onEnter={handleEnter} />

      {entered && (
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-3xl mx-auto px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>

          <OriginStory />

          <div className="w-full max-w-3xl mx-auto px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-destructive/30 to-transparent" />
          </div>

          <ReelStory />

          <div className="w-full max-w-3xl mx-auto px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-chaos/30 to-transparent" />
          </div>

          <CharacterProfile />

          <div className="w-full max-w-3xl mx-auto px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>

          <MiniGames onGameComplete={handleGameComplete} completedGames={completedGames} />

          <div className="w-full max-w-3xl mx-auto px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          </div>

          <EmotionalSection unlocked={true} />

          <div className="w-full max-w-3xl mx-auto px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-electric/30 to-transparent" />
          </div>

          <SecretSection />

          {/* Footer */}
          <div className="text-center py-12">
            <p className="font-mono text-xs text-muted-foreground">
              Built with chaos, caffeine, and 18 years of energy 🎂
            </p>
            <p className="font-mono text-[10px] text-muted-foreground/50 mt-1">
              Dhriti's 18th Birthday Edition v18.0
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Index;
