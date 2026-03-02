import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const storyParts = [
    { text: "I also need to apologize for making you skip 4 days of classes for an Instagram reel lol.", delay: 0 },
    { text: "And the worst part? The reel was still ass and the second one we recorded didn't even get uploaded.", delay: 1 },
    { text: "But hey, it's the trauma that counts, right? We got the memories (even if we didn't get the content).", delay: 2 },
];

const ReelStory = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [visibleLines, setVisibleLines] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const timer = setInterval(() => {
            setVisibleLines((prev) => {
                if (prev >= storyParts.length) {
                    clearInterval(timer);
                    return prev;
                }
                return prev + 1;
            });
        }, 1500); // slightly slower pacing for this joke
        return () => clearInterval(timer);
    }, [isInView]);

    return (
        <section ref={ref} className="min-h-[70vh] flex items-center justify-center px-4 py-16">
            <div className="max-w-2xl w-full">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="font-mono text-sm text-destructive text-glow-destructive mb-2"
                >
                    {"// THE_INSTAGRAM_REEL.log"}
                </motion.h2>
                <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-3xl font-display font-bold text-foreground mb-8"
                >
                    The Great Class Skip
                </motion.h3>

                <div className="space-y-6 font-mono">
                    {storyParts.map((part, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={i < visibleLines ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5 }}
                            className="flex gap-4"
                        >
                            <span className="text-destructive/50 text-xl md:text-2xl mt-1 select-none">
                                {i === 0 ? "🎥" : i === 1 ? "😭" : "💀"}
                            </span>
                            <p className="text-foreground/90 text-lg md:text-xl leading-relaxed font-bold">
                                {part.text}
                            </p>
                        </motion.div>
                    ))}
                    {visibleLines < storyParts.length && isInView && (
                        <span className="text-destructive animate-blink ml-10 text-xl font-bold">█</span>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ReelStory;
