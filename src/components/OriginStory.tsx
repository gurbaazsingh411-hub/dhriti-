import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import AchievementPopup from "./AchievementPopup";

const storyParts = [
  { text: "It started after the college fest...", delay: 0 },
  { text: "We went out to eat, exhausted but happy.", delay: 0.5 },
  { text: "Then we walked towards the metro station...", delay: 1 },
  { text: "Talking, laughing, and just being in the moment.", delay: 1.5 },
  { text: "And then, we both started swearing at Supabase.", delay: 2 },
  { text: "'Supabase is so complicated!' we yelled into the night air.", delay: 2.5 },
  { text: "Walking along, bonding over backend trauma and chaos energy.", delay: 3 },
  { text: "A friendship forged in the fires of broken deployments and metro walks.", delay: 3.5 },
];

const OriginStory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAchievement, setShowAchievement] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= storyParts.length) {
          clearInterval(timer);
          setTimeout(() => setShowAchievement(true), 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-mono text-sm text-electric text-glow-electric mb-2"
        >
          {"// ORIGIN_STORY.log"}
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-display font-bold text-foreground mb-10"
        >
          The Supabase Incident
        </motion.h3>

        <div className="space-y-4 font-mono">
          {storyParts.map((part, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={i < visibleLines ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex gap-3"
            >
              <span className="text-primary/50 text-sm mt-1 select-none">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-foreground/90 text-sm md:text-base leading-relaxed">
                {part.text}
              </p>
            </motion.div>
          ))}
          {visibleLines < storyParts.length && isInView && (
            <span className="text-primary animate-blink ml-8">█</span>
          )}
        </div>
      </div>

      <AchievementPopup
        show={showAchievement}
        title="Achievement Unlocked!"
        description="Bonded Over Backend Pain"
        onClose={() => setShowAchievement(false)}
      />
    </section>
  );
};

export default OriginStory;
