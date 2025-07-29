import React from "react";
import { useTransform, motion, MotionValue } from "framer-motion";

const HomeSection = ({
    scrollYProgress,
}: {
    scrollYProgress: MotionValue<number>;
}) => {
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

    return (
        <motion.section
            id="home"
            style={{ scale, rotate }}
            className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 sticky top-0 flex flex-col-reverse justify-center gap-10 md:gap-0 md:grid md:grid-cols-2 h-screen md:px-[15%] pt-10 overflow-hidden"
        >
            {/* Animated Background Elements - Different from About section */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-red-500/15 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
                <div className="absolute top-1/4 left-1/2 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-pulse delay-1500"></div>
                <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-cyan-500/12 rounded-full blur-2xl animate-pulse delay-2000"></div>
            </div>

            {/* Diagonal lines pattern instead of grid */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

            {/* Floating particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [-20, 20, -20],
                            opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="flex flex-col items-start justify-center">
                <div className="p-4 md:p-0 text-center md:text-start w-full">
                    <p className="text-[20px] md:text-[24px] font-semibold">
                        Hi There
                    </p>
                    <h1 className="text-[40px] md:text-[68px] font-bold">
                        I&apos;m{" "}
                        <span className="text-[#f13c58]">Sagar Shetty</span>
                    </h1>
                    <h2 className="text-[30px] md:text-[48px]">
                        I am a Software Developer
                    </h2>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-4 md:gap-12 py-4 md:py-12 w-full">
                    <a href="/assets/resume.pdf">
                        <button className="px-6 md:px-12 py-2 md:py-3 text-lg md:text-2xl font-semibold bg-[#f13c58] rounded-lg">
                            Resume
                        </button>
                    </a>
                    <a href="mailto:dev.sagarshetty@gmail.com" target="_blank">
                        <button className="px-6 md:px-12 py-2 md:py-3 text-lg md:text-2xl font-semibold bg-[#52648c] rounded-lg">
                            Contact Me
                        </button>
                    </a>
                </div>
            </div>
            <div className="flex items-center justify-center relative">
                <svg
                    id="sw-js-blob-svg"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full absolute scale-150 -z-10 opacity-25"
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
                        style={{ transition: "0.3s" }}
                        stroke="url(#sw-gradient)"
                    />
                </svg>
                <img
                    alt="person illustration"
                    src="/assets/person-illustration.png"
                    className="w-auto h-64 md:h-auto md:w-[80%] object-cover opacity-90"
                />
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="flex flex-col items-center gap-2 text-gray-400"
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
