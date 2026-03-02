import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Video, BookOpen, GraduationCap, Sparkles } from "lucide-react";
import { playJumpSound, playCatchGood, playCrashSound } from "@/lib/audio";

interface GameObject {
    id: number;
    x: number;
    y: number;
    type: "prop" | "class";
    speed: number;
}

const ClassSkipperGame = () => {
    const [gameState, setGameState] = useState<"idle" | "playing" | "won" | "over">("idle");
    const [score, setScore] = useState(0);
    const [playerY, setPlayerY] = useState(80);
    const [isJumping, setIsJumping] = useState(false);
    const [objects, setObjects] = useState<GameObject[]>([]);
    const gameRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>();
    const objectIdRef = useRef(0);
    const lastSpawnRef = useRef(0);

    const jump = useCallback(() => {
        if (gameState !== "playing" || isJumping) return;
        playJumpSound();
        setIsJumping(true);

        let height = 0;
        const jumpInterval = setInterval(() => {
            height += 2; // Half the speed of height increment (takes twice as long)
            setPlayerY(80 - Math.sin((height * Math.PI) / 100) * 48); // Jump higher (48 instead of 40)
            if (height >= 100) {
                clearInterval(jumpInterval);
                setIsJumping(false);
                setPlayerY(80);
            }
        }, 12); // Slightly slower interval tick
    }, [gameState, isJumping]);

    const startGame = () => {
        setGameState("playing");
        setScore(0);
        setObjects([]);
        setPlayerY(80);
        objectIdRef.current = 0;
    };

    const update = useCallback((time: number) => {
        if (gameState !== "playing") return;

        // Spawn objects
        if (time - lastSpawnRef.current > 1200) {
            const isProp = Math.random() > 0.3;
            setObjects((prev) => [
                ...prev,
                {
                    id: objectIdRef.current++,
                    x: 110,
                    y: isProp ? 40 + Math.random() * 20 : 80,
                    type: isProp ? "prop" : "class",
                    speed: 0.8 + Math.random() * 0.4,
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
                // Collision check
                const playerXPos = 20;
                const dx = Math.abs(obj.x - playerXPos);
                const dy = Math.abs(obj.y - playerY);

                if (dx < 8 && dy < 12) {
                    if (obj.type === "prop") {
                        playCatchGood();
                        setScore((s) => {
                            const newScore = s + 1;
                            if (newScore >= 10) setGameState("won");
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
        <div className="min-h-screen bg-[#0a0a0a] text-foreground font-mono flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="z-10 w-full max-w-4xl">
                <div className="flex justify-between items-center mb-6">
                    <Link to="/" className="flex items-center gap-2 text-primary hover:underline">
                        <ArrowLeft size={16} /> Exit to Hub
                    </Link>
                    <div className="text-xl text-gold font-bold">
                        Props for the Reel: {score}/10
                    </div>
                </div>

                <div
                    ref={gameRef}
                    className="relative w-full h-[50vh] bg-neutral-900 rounded-2xl border-2 border-primary/10 overflow-hidden cursor-pointer"
                    onClick={() => gameState === "playing" ? jump() : startGame()}
                >
                    {/* Floor */}
                    <div className="absolute bottom-[10%] left-0 right-0 h-1 bg-primary/20" />

                    {/* Player (Dhriti/Monkey) */}
                    <motion.div
                        className="absolute left-[20%] w-14 h-14 flex flex-col items-center justify-center text-4xl select-none"
                        style={{ top: `${playerY}%`, transform: "translate(-50%, -50%)" }}
                    >
                        <span className="relative">
                            🐒
                            <Video className="absolute -top-4 -right-2 text-primary animate-pulse" size={20} />
                        </span>
                    </motion.div>

                    {/* Objects */}
                    {objects.map((obj) => (
                        <div
                            key={obj.id}
                            className="absolute flex flex-col items-center select-none"
                            style={{ left: `${obj.x}%`, top: `${obj.y}%`, transform: "translate(-50%, -50%)" }}
                        >
                            {obj.type === "prop" ? (
                                <div className="flex flex-col items-center gap-1">
                                    <Sparkles className="text-gold animate-spin-slow" size={24} />
                                    <div className="text-xs text-gold font-bold">REEL_PROP</div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-1 group">
                                    <div className="bg-destructive/20 p-2 rounded-lg border border-destructive/40 group-hover:scale-110 transition-transform">
                                        {Math.random() > 0.5 ? <BookOpen className="text-destructive" size={32} /> : <GraduationCap className="text-destructive" size={32} />}
                                    </div>
                                    <div className="text-[10px] text-destructive font-bold uppercase">Class_Reminder</div>
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
                                className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-6"
                            >
                                <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">Class Skipper Dash</h2>
                                <p className="text-sm md:text-base text-muted-foreground max-w-md mb-8">
                                    You have to skip 4 days of classes to make that Instagram reel. <br />
                                    Jump over the books and professors to collect 10 Reel Props!
                                </p>
                                <button className="neon-button">SKIP CLASS & START_</button>
                            </motion.div>
                        )}

                        {gameState === "over" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 bg-destructive/30 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6"
                            >
                                <h2 className="text-4xl md:text-5xl font-display font-bold text-destructive mb-2">CAUGHT!</h2>
                                <p className="text-lg md:text-xl mb-8">Attendance dropped too low. Professor caught you skipping.</p>
                                <button onClick={startGame} className="neon-button border-destructive text-destructive">RETRY SCAN_</button>
                            </motion.div>
                        )}

                        {gameState === "won" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 bg-gold/30 backdrop-blur-md flex flex-col items-center justify-center text-center p-6"
                            >
                                <h2 className="text-3xl md:text-5xl font-display font-bold text-gold mb-2">REEL COMPLETE!</h2>
                                <p className="text-lg md:text-xl mb-4">You collected all the props!</p>
                                <p className="text-xs md:text-sm text-muted-foreground italic mb-8">"Wait, the reel is still ass? And the other one didn't upload? Internal screaming intensifies."</p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button onClick={startGame} className="neon-button border-gold text-gold">RE-RECORD REEL_</button>
                                    <Link to="/" className="neon-button">BACK TO REALITY_</Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-neutral-900/50 rounded-2xl border border-white/5">
                        <h4 className="text-primary font-bold mb-2 uppercase text-xs">Mission Intel</h4>
                        <p className="text-sm text-muted-foreground"> skipping 4 days of BTech 1st year is risky business. Get those props and run before the dean sees you.</p>
                    </div>
                    <div className="p-6 bg-neutral-900/50 rounded-2xl border border-white/5">
                        <h4 className="text-gold font-bold mb-2 uppercase text-xs">Reel Metadata</h4>
                        <p className="text-sm text-muted-foreground">Status: ASS (Unpublished) <br /> Energy: PEAK MONKEY <br /> Friendship: UNBREAKABLE</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassSkipperGame;
