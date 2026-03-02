import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Cake, PartyPopper, AlertCircle } from "lucide-react";
import { playJumpSound, playCatchGood, playCatchBad, playCrashSound } from "@/lib/audio";

interface GameObject {
    id: number;
    x: number;
    y: number;
    type: "cake" | "error";
    speed: number;
}

const MonkeyGame = () => {
    const [gameState, setGameState] = useState<"idle" | "playing" | "won" | "over">("idle");
    const [score, setScore] = useState(0);
    const [playerY, setPlayerY] = useState(50);
    const [objects, setObjects] = useState<GameObject[]>([]);
    const gameRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>();
    const objectIdRef = useRef(0);
    const lastSpawnRef = useRef(0);

    const jump = useCallback(() => {
        if (gameState !== "playing") return;
        playJumpSound();
        setPlayerY((prev) => Math.max(10, prev - 15));
    }, [gameState]);

    const startGame = () => {
        setGameState("playing");
        setScore(0);
        setObjects([]);
        setPlayerY(50);
        objectIdRef.current = 0;
    };

    const update = useCallback((time: number) => {
        if (gameState !== "playing") return;

        // Gravity
        setPlayerY((prev) => Math.min(90, prev + 0.5));

        // Spawn objects
        if (time - lastSpawnRef.current > 1000) {
            const isCake = Math.random() > 0.4;
            setObjects((prev) => [
                ...prev,
                {
                    id: objectIdRef.current++,
                    x: 110,
                    y: 20 + Math.random() * 60,
                    type: isCake ? "cake" : "error",
                    speed: 0.5 + Math.random() * 0.5,
                },
            ]);
            lastSpawnRef.current = time;
        }

        // Move objects and collision check
        setObjects((prev) => {
            const next = prev
                .map((obj) => ({ ...obj, x: obj.x - obj.speed }))
                .filter((obj) => obj.x > -20);

            for (const obj of next) {
                // Simple aabb-ish collision
                if (obj.x > 15 && obj.x < 25 && Math.abs(obj.y - playerY) < 10) {
                    if (obj.type === "cake") {
                        playCatchGood();
                        setScore((s) => {
                            const newScore = s + 1;
                            if (newScore >= 18) setGameState("won");
                            return newScore;
                        });
                        return next.filter((o) => o.id !== obj.id);
                    } else {
                        playCrashSound();
                        setGameState("over");
                        return next;
                    }
                }
            }
            return next;
        });

        requestRef.current = requestAnimationFrame(update);
    }, [gameState, playerY]);

    useEffect(() => {
        if (gameState === "playing") {
            requestRef.current = requestAnimationFrame(update);
        } else if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [gameState, update]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.code === "Space" || e.code === "ArrowUp") {
                e.preventDefault();
                if (gameState === "idle" || gameState === "over" || gameState === "won") startGame();
                else jump();
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [gameState, jump]);

    return (
        <div className="min-h-screen bg-background text-foreground font-mono flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 text-9xl animate-bounce">🎈</div>
                <div className="absolute bottom-20 right-20 text-9xl animate-pulse delay-700">🎈</div>
            </div>

            <div className="z-10 w-full max-w-4xl">
                <div className="flex justify-between items-center mb-6">
                    <Link to="/" className="flex items-center gap-2 text-primary hover:underline">
                        <ArrowLeft size={16} /> Back to Hub
                    </Link>
                    <div className="text-xl text-gold font-bold">
                        Cakes Collected: {score}/18
                    </div>
                </div>

                <div
                    ref={gameRef}
                    className="relative w-full h-[60vh] bg-black/40 rounded-2xl border-2 border-primary/20 overflow-hidden cursor-pointer"
                    onClick={() => gameState === "playing" ? jump() : startGame()}
                >
                    {/* Player (Monkey) */}
                    <motion.div
                        className="absolute left-[20%] w-12 h-12 flex items-center justify-center text-4xl select-none"
                        style={{ top: `${playerY}%`, transform: "translate(-50%, -50%)" }}
                        animate={{ rotate: playerY > 50 ? 5 : -5 }}
                    >
                        🐒
                    </motion.div>

                    {/* Objects */}
                    {objects.map((obj) => (
                        <div
                            key={obj.id}
                            className="absolute flex flex-col items-center select-none"
                            style={{ left: `${obj.x}%`, top: `${obj.y}%`, transform: "translate(-50%, -50%)" }}
                        >
                            {obj.type === "cake" ? (
                                <div className="text-3xl animate-bounce">🎂</div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <div className="text-2xl text-destructive font-bold bg-destructive/10 border border-destructive/20 px-2 rounded">
                                        SUPABASE_ERROR
                                    </div>
                                    <AlertCircle className="text-destructive mt-1" size={20} />
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Overlays */}
                    <AnimatePresence>
                        {gameState === "idle" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-6"
                            >
                                <h2 className="text-3xl font-display font-bold text-primary mb-4">Dhriti's Birthday Blast</h2>
                                <p className="text-muted-foreground mb-8">
                                    Collect 18 cakes for 18 years of chaos! <br />
                                    Avoid the Supabase Errors at all costs.
                                </p>
                                <button className="neon-button">CLICK OR PRESS SPACE TO START</button>
                            </motion.div>
                        )}

                        {gameState === "over" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 bg-destructive/20 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6"
                            >
                                <h2 className="text-3xl md:text-5xl font-display font-bold text-destructive mb-2">SYSTEM CRASH</h2>
                                <p className="text-lg md:text-xl mb-8">The backend trauma was too much.</p>
                                <button onClick={startGame} className="neon-button border-destructive text-destructive hover:bg-destructive/10">TRY AGAIN</button>
                            </motion.div>
                        )}

                        {gameState === "won" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 bg-gold/20 backdrop-blur-md flex flex-col items-center justify-center text-center p-6"
                            >
                                <PartyPopper className="text-gold w-16 h-16 md:w-20 md:h-20 mb-4 animate-bounce" />
                                <h2 className="text-3xl md:text-5xl font-display font-bold text-gold mb-2">HAPPY 18TH BIRTHDAY!</h2>
                                <p className="text-lg md:text-xl mb-8">You survived the chaos and collected all the cakes.</p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button onClick={startGame} className="neon-button border-gold text-gold hover:bg-gold/10">PLAY AGAIN</button>
                                    <Link to="/" className="neon-button">BACK TO ARCHIVE</Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1 uppercase">Objective</div>
                        <div className="text-sm">Collect 18 Cakes</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1 uppercase">Controls</div>
                        <div className="text-sm">Click / Space to Jump</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1 uppercase">Vibe</div>
                        <div className="text-sm">Pure Monkey Energy</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonkeyGame;
