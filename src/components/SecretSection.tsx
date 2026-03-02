import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock } from "lucide-react";
import { playUnlockSound, playCrashSound } from "@/lib/audio";

const SECRET_PASSWORD = "supabase";

const SecretSection = () => {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const tryUnlock = () => {
    if (password.toLowerCase().trim() === SECRET_PASSWORD) {
      setUnlocked(true);
      setError(false);
      playUnlockSound();
    } else {
      setError(true);
      playCrashSound();
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full">
        <AnimatePresence mode="wait">
          {!unlocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="game-card text-center"
            >
              <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Secret Vault
              </h3>
              <p className="font-mono text-xs text-muted-foreground mb-6">
                Hint: The thing that started it all. (lowercase)
              </p>

              <div className="flex gap-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && tryUnlock()}
                  placeholder="Enter password..."
                  className="flex-1 bg-background border border-border rounded-md px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button onClick={tryUnlock} className="neon-button text-sm py-2 px-4">
                  Unlock
                </button>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-mono text-xs text-destructive mt-3"
                >
                  Access denied. Try again.
                </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="game-card text-center border-gold/30"
              style={{ boxShadow: "0 0 40px hsl(45 90% 55% / 0.15)" }}
            >
              <Unlock className="w-8 h-8 text-gold mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-6">
                🔓 Vault Opened
              </h3>
              <div className="space-y-4 text-foreground/80 font-body text-sm leading-relaxed">
                <p>
                  hey dhriti, happy birthdayyy you're officially an adult now and you have already done so much in life, i am very proud of you
                </p>
                <p>
                  you are perfect the way you are and you dont need to be insecure about your hair they look really cool, and i am really happy to be your friend
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SecretSection;
