import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    color: string;
}

const colors = [
    "bg-primary",
    "bg-electric",
    "bg-gold",
    "bg-chaos",
];

const FloatingParticles = () => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        // Generate particles only on client side to avoid hydration mismatch
        const newParticles: Particle[] = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: Math.random() < 0.5 ? Math.random() * 15 : 85 + Math.random() * 15, // Spawn on left or right 15% edges
            y: Math.random() * 100,
            size: Math.random() * 4 + 2, // 2px to 6px
            duration: Math.random() * 10 + 10, // 10s to 20s
            delay: Math.random() * 5,
            color: colors[Math.floor(Math.random() * colors.length)]
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className={`absolute rounded-full opacity-30 ${particle.color} shadow-[0_0_10px_currentColor]`}
                    style={{
                        left: `${particle.x}%`,
                        width: particle.size,
                        height: particle.size,
                    }}
                    initial={{ top: "110%", opacity: 0 }}
                    animate={{
                        top: "-10%",
                        opacity: [0, 0.4, 0.4, 0],
                        x: [0, Math.random() * 20 - 10, Math.random() * -20 + 10, 0] // Gentle swaying
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "linear",
                        times: [0, 0.2, 0.8, 1] // Opacity keyframes matching top position
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingParticles;
