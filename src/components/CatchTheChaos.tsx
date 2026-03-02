import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCatchGood, playCatchBad } from "@/lib/audio";

interface FallingItem {
  id: number;
  emoji: string;
  label: string;
  x: number;
  y: number;
  isGood: boolean;
  speed: number;
}

const goodItems = [
  { emoji: "☕", label: "Coffee" },
  { emoji: "💻", label: "Laptop" },
  { emoji: "🤝", label: "Support" },
  { emoji: "🎉", label: "Vibes" },
];

const badItems = [
  { emoji: "🤯", label: "Overthinking" },
  { emoji: "📚", label: "Assignments" },
  { emoji: "🐛", label: "Bugs" },
  { emoji: "💀", label: "Deadlines" },
];

const CatchTheChaos = ({ onComplete }: { onComplete: () => void }) => {
  const [gameState, setGameState] = useState<"idle" | "playing" | "over">("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [itemId, setItemId] = useState(0);
  const [flash, setFlash] = useState<"good" | "bad" | null>(null);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setTimeLeft(30);
    setItems([]);
    setItemId(0);
  };

  // Timer
  useEffect(() => {
    if (gameState !== "playing") return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState("over");
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState, onComplete]);

  // Spawn items
  useEffect(() => {
    if (gameState !== "playing") return;
    const spawnInterval = setInterval(() => {
      const isGood = Math.random() > 0.4;
      const pool = isGood ? goodItems : badItems;
      const item = pool[Math.floor(Math.random() * pool.length)];
      setItemId((prev) => {
        setItems((prevItems) => [
          ...prevItems,
          {
            id: prev,
            ...item,
            x: 5 + Math.random() * 85,
            y: -10,
            isGood,
            speed: 1 + Math.random() * 2,
          },
        ]);
        return prev + 1;
      });
    }, 700);
    return () => clearInterval(spawnInterval);
  }, [gameState]);

  // Move items
  useEffect(() => {
    if (gameState !== "playing") return;
    const moveInterval = setInterval(() => {
      setItems((prev) =>
        prev.map((it) => ({ ...it, y: it.y + it.speed })).filter((it) => it.y < 110)
      );
    }, 50);
    return () => clearInterval(moveInterval);
  }, [gameState]);

  const catchItem = (item: FallingItem) => {
    if (item.isGood) {
      playCatchGood();
      setScore((prev) => prev + 10);
      setFlash("good");
    } else {
      playCatchBad();
      setScore((prev) => Math.max(0, prev - 15));
      setFlash("bad");
    }
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    setTimeout(() => setFlash(null), 200);
  };

  return (
    <div className="game-card">
      <h4 className="font-mono text-sm text-chaos text-glow-chaos mb-1">Game 2</h4>
      <h3 className="font-display text-xl font-bold text-foreground mb-4">
        Catch the Chaos
      </h3>

      <div
        className={`relative w-full h-48 bg-background rounded-md border overflow-hidden select-none transition-colors duration-200 ${
          flash === "good"
            ? "border-primary"
            : flash === "bad"
            ? "border-destructive"
            : "border-border"
        }`}
      >
        {gameState === "playing" && (
          <>
            <div className="absolute top-2 left-3 font-mono text-xs text-primary">
              Score: {score}
            </div>
            <div className="absolute top-2 right-3 font-mono text-xs text-destructive">
              {timeLeft}s
            </div>

            <AnimatePresence>
              {items.map((item) => (
                <motion.button
                  key={item.id}
                  className="absolute text-xl cursor-pointer hover:scale-125 transition-transform"
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  onClick={() => catchItem(item)}
                  exit={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 1.5 }}
                >
                  {item.emoji}
                </motion.button>
              ))}
            </AnimatePresence>
          </>
        )}

        {gameState === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="font-mono text-sm text-muted-foreground mb-3">
              Catch ☕💻🤝 — Avoid 🤯📚🐛
            </p>
            <button onClick={startGame} className="neon-button text-sm py-2 px-4">
              Start
            </button>
          </div>
        )}

        {gameState === "over" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80">
            <p className="font-mono text-sm text-foreground mb-1">Time's up!</p>
            <p className="font-mono text-lg text-primary text-glow mb-1">Score: {score}</p>
            <p className="font-mono text-xs text-muted-foreground mb-3">
              "You survived being Dhriti."
            </p>
            <button onClick={startGame} className="font-mono text-xs text-primary hover:underline">
              Play again
            </button>
          </div>
        )}
      </div>
      <p className="font-mono text-[10px] text-muted-foreground mt-2">
        Click the good items, avoid the bad ones. 30 seconds.
      </p>
    </div>
  );
};

export default CatchTheChaos;
