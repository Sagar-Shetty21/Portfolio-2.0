import React, { useState, useEffect } from "react";
import { useTransform, motion, MotionValue } from "framer-motion";

const HomeSection = ({
    scrollYProgress,
}: {
    scrollYProgress: MotionValue<number>;
}) => {
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

    // Use state to ensure consistent dots between server and client
    const [dots, setDots] = useState<
        Array<{
            id: number;
            left: string;
            top: string;
            duration: number;
            delay: number;
        }>
    >([]);

    // Generate dots only on client side to avoid hydration mismatch
    useEffect(() => {
        setDots(
            Array.from({ length: 15 }, (_, i) => ({
                id: i,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
            }))
        );
    }, []);

    return (
        <motion.section
            id="home"
            style={{ scale, rotate }}
            className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 sticky top-0 flex flex-col-reverse justify-center gap-10 md:gap-0 md:grid md:grid-cols-2 h-screen md:px-[15%] pt-10 overflow-hidden"
        >
            {/* Simplified Background Elements - Reduced blur and complexity */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-red-500/10 rounded-full blur-lg md:blur-2xl"></div>
                <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-blue-600/8 rounded-full blur-lg md:blur-2xl"></div>
                <div className="absolute top-1/4 left-1/2 w-80 h-80 bg-purple-500/6 rounded-full blur-md md:blur-xl"></div>
            </div>

            {/* Simplified diagonal pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

            {/* Optimized floating particles with will-change */}
            <div className="absolute inset-0">
                {dots.map((dot) => (
                    <motion.div
                        key={dot.id}
                        className="absolute w-1 h-1 bg-cyan-400/25 rounded-full"
                        style={{
                            left: dot.left,
                            top: dot.top,
                            willChange: "transform", // Hint for GPU acceleration
                        }}
                        animate={{
                            y: [-15, 15, -15], // Reduced range
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            duration: dot.duration,
                            repeat: Infinity,
                            delay: dot.delay,
                            ease: "easeInOut", // More efficient easing
                        }}
                    />
                ))}
            </div>

            <div className="flex flex-col items-start justify-center">
                <div className="p-4 md:p-0 text-center md:text-start w-full">
                    <motion.p
                        className="text-[20px] md:text-[24px] font-semibold"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Hi There
                    </motion.p>
                    <motion.h1
                        className="text-[40px] md:text-[68px] font-bold"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        I&apos;m{" "}
                        <span className="text-[#f13c58]">Sagar Shetty</span>
                    </motion.h1>
                    <motion.h2
                        className="text-[30px] md:text-[48px]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        I am a Software Developer
                    </motion.h2>
                </div>
                <motion.div
                    className="flex items-center justify-center md:justify-start gap-4 md:gap-12 py-4 md:py-12 w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <a href="/assets/resume.pdf">
                        <button className="px-6 md:px-12 py-2 md:py-3 text-lg md:text-2xl font-semibold bg-[#f13c58] rounded-lg transform transition-transform hover:scale-105 active:scale-95">
                            Resume
                        </button>
                    </a>
                    <a href="mailto:dev.sagarshetty@gmail.com" target="_blank">
                        <button className="px-6 md:px-12 py-2 md:py-3 text-lg md:text-2xl font-semibold bg-[#52648c] rounded-lg transform transition-transform hover:scale-105 active:scale-95">
                            Contact Me
                        </button>
                    </a>
                </motion.div>
            </div>

            <motion.div
                className="flex items-center justify-center relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                {/* Simplified SVG blob */}
                <svg
                    id="sw-js-blob-svg"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full absolute scale-150 -z-10 opacity-20"
                    style={{ willChange: "transform" }}
                >
                    <defs>
                        <linearGradient
                            id="sw-gradient"
                            x1="0"
                            x2="1"
                            y1="1"
                            y2="0"
                        >
                            <stop
                                id="stop1"
                                stopColor="rgba(55, 65, 81, 1)"
                                offset="0%"
                            />
                            <stop
                                id="stop2"
                                stopColor="rgba(75, 85, 99, 1)"
                                offset="100%"
                            />
                        </linearGradient>
                    </defs>
                    <path
                        fill="url(#sw-gradient)"
                        d="M10.3,-15.9C15.3,-10.5,22.6,-10.1,28.2,-6.1C33.7,-2,37.5,5.7,37.2,13.8C36.9,21.8,32.5,30.2,25.6,32C18.7,33.7,9.4,28.9,-0.1,29.1C-9.6,29.3,-19.3,34.5,-22.3,31.5C-25.4,28.5,-21.9,17.2,-23.5,8.5C-25,-0.2,-31.7,-6.3,-31.4,-11.1C-31.1,-15.9,-23.9,-19.4,-17.5,-24.3C-11.1,-29.2,-5.5,-35.5,-1.5,-33.5C2.6,-31.5,5.3,-21.2,10.3,-15.9Z"
                        width="100%"
                        height="100%"
                        transform="translate(50 50)"
                        strokeWidth="0"
                    />
                </svg>
                <img
                    alt="person illustration"
                    src="/assets/person-illustration.png"
                    className="w-auto h-64 md:h-auto md:w-[80%] object-cover opacity-90"
                    loading="eager" // Ensure hero image loads immediately
                    decoding="async"
                />
            </motion.div>

            {/* Simplified Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }} // Reduced animation range
                    transition={{
                        duration: 2.5, // Slightly slower for smoother feel
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="flex flex-col items-center gap-2 text-gray-400"
                    style={{ willChange: "transform" }}
                >
                    <span className="text-xs font-mono tracking-wider">
                        SCROLL
                    </span>
                    <div className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent"></div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default HomeSection;
