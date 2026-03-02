import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Heart, Shield, MessageCircle, Ban, Flame } from "lucide-react";

const stats = [
  { label: "Monkey Energy", value: 100, max: 10, display: "100/10", color: "bg-chaos" },
  { label: "Loyalty", value: 100, max: 100, display: "∞", color: "bg-gold" },
  { label: "Height", value: 5, max: 100, display: "Pocket Sized", color: "bg-primary" },
  { label: "Academic Status", value: 100, max: 100, display: "BTech 1st Year", color: "bg-electric" },
];

const badges = [
  { icon: Flame, label: "Energy Level: MONKEY_MODE", color: "text-primary" },
  { icon: Ban, label: "18 Years of Pure Chaos", color: "text-chaos" },
  { icon: Zap, label: "Short but Deadly", color: "text-electric" },
  { icon: MessageCircle, label: "2 AM Crisis Handler", color: "text-gold" },
  { icon: Ban, label: "17 Years of Pure Chaos", color: "text-chaos" },
];

const CharacterProfile = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-3xl w-full">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-mono text-sm text-chaos text-glow-chaos mb-2"
        >
          {"// CHARACTER_STATS.json"}
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-display font-bold text-foreground mb-10"
        >
          Player Profile
        </motion.h3>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="game-card"
          >
            <h4 className="font-mono text-sm text-primary mb-6 uppercase tracking-wider">Stats</h4>
            <div className="space-y-5">
              {stats.map((stat, i) => (
                <div key={stat.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-mono text-xs text-muted-foreground">{stat.label}</span>
                    <span className="font-mono text-xs text-foreground">{stat.display}</span>
                  </div>
                  <div className="stat-bar">
                    <motion.div
                      className={`stat-bar-fill ${stat.color}`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${Math.min((stat.value / stat.max) * 100, 100)}%` } : {}}
                      transition={{ duration: 1.5, delay: 0.5 + i * 0.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="game-card"
          >
            <h4 className="font-mono text-sm text-primary mb-6 uppercase tracking-wider">Skill Badges</h4>
            <div className="space-y-4">
              {badges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.15 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 group cursor-default"
                >
                  <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                    <badge.icon className={`w-4 h-4 ${badge.color}`} />
                  </div>
                  <span className="font-mono text-xs text-foreground/80 whitespace-pre-line">{badge.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CharacterProfile;
