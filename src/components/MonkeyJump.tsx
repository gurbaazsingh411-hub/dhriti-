import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import AchievementPopup from "./AchievementPopup";
import { playJumpSound, playCrashSound } from "@/lib/audio";

interface Block {
  id: number;
  x: number;
  y: number;
  speed: number;
}

const MonkeyJump = ({ onComplete }: { onComplete: () => void }) => {
  const [gameState, setGameState] = useState<"idle" | "playing" | "over">("idle");
  const [score, setScore] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [showAchievement, setShowAchievement] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();
  const blockIdRef = useRef(0);
  const playerX = 50;

  const jump = useCallback(() => {
    if (gameState !== "playing") return;
    playJumpSound();
    setPlayerY(1);
    setTimeout(() => setPlayerY(0), 500);
  }, [gameState]);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setBlocks([]);
    blockIdRef.current = 0;
  };

  useEffect(() => {
    if (gameState !== "playing") return;

    const spawnInterval = setInterval(() => {
      setBlocks((prev) => [
        ...prev,
        {
          id: blockIdRef.current++,
          x: 100 + Math.random() * 20,
          y: 0,
          speed: 1.5 + Math.random() * 1.5,
        },
      ]);
    }, 1200);

    const gameLoop = setInterval(() => {
      setBlocks((prev) => {
        const updated = prev
          .map((b) => ({ ...b, x: b.x - b.speed }))
          .filter((b) => b.x > -15);

        // Collision check
        for (const b of updated) {
          if (b.x > playerX - 8 && b.x < playerX + 8 && playerY === 0) {
            playCrashSound();
            setGameState("over");
            if (score >= 20) {
              setShowAchievement(true);
              onComplete();
            }
            return updated;
          }
        }

        return updated;
      });

      setScore((prev) => prev + 1);
    }, 100);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(gameLoop);
    };
  }, [gameState, playerY, score, onComplete]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (gameState === "idle") startGame();
        else jump();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameState, jump]);

  return (
    <div className="game-card">
      <h4 className="font-mono text-sm text-gold text-glow-gold mb-1">Game 1</h4>
      <h3 className="font-display text-xl font-bold text-foreground mb-4">
        Monkey Jump – Supabase Rage Mode
      </h3>

      <div
        ref={gameRef}
        className="relative w-full h-40 bg-background rounded-md border border-border overflow-hidden cursor-pointer select-none"
        onClick={() => {
          if (gameState === "idle") startGame();
          else jump();
        }}
      >
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-primary/30" />

        {/* Player */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-6 h-8 text-center text-lg"
          animate={{ bottom: playerY ? 60 : 16 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          style={{ left: `${playerX}%` }}
        >
          🐒
        </motion.div>

        {/* Blocks */}
        {blocks.map((block) => (
          <div
            key={block.id}
            className="absolute bottom-4 font-mono text-[10px] text-destructive font-bold bg-destructive/10 border border-destructive/30 px-1 rounded"
            style={{ left: `${block.x}%` }}
          >
            500
          </div>
        ))}

        {/* Score */}
        <div className="absolute top-2 right-3 font-mono text-xs text-primary">
          Score: {score}
        </div>

        {gameState === "idle" && (
          <div className="absolute inset-0 flex items-center justify-center font-mono text-sm text-muted-foreground">
            Tap / Space to start
          </div>
        )}

        {gameState === "over" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80">
            <p className="font-mono text-sm text-destructive mb-1">CRASHED!</p>
            <p className="font-mono text-xs text-muted-foreground mb-3">Score: {score}</p>
            <button onClick={startGame} className="font-mono text-xs text-primary hover:underline">
              Try again
            </button>
          </div>
        )}
      </div>
      <p className="font-mono text-[10px] text-muted-foreground mt-2">
        Avoid the Error 500 blocks. Score 20 for an achievement!
      </p>

      <AchievementPopup
        show={showAchievement}
        title="Achievement Unlocked!"
        description="Survived the Backend Apocalypse"
        onClose={() => setShowAchievement(false)}
      />
    </div>
  );
};

export default MonkeyJump;
