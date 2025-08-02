import React, { useEffect, useState } from "react";
import {
    useTransform,
    motion,
    MotionValue,
    useMotionValue,
} from "framer-motion";
import { PROJECTS_LIST } from "@/utils/data";
import Image from "next/image";

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 1000;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
};

const PortfolioSection = ({
    scrollYProgress,
}: {
    scrollYProgress: MotionValue<number>;
}) => {
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

    const [imgIndex, setImgIndex] = useState(0);

    const dragX = useMotionValue(0);

    useEffect(() => {
        const intervalRef = setInterval(() => {
            const x = dragX.get();

            if (x === 0) {
                setImgIndex((pv) => {
                    if (pv === PROJECTS_LIST.length - 1) {
                        return 0;
                    }
                    return pv + 1;
                });
            }
        }, AUTO_DELAY);

        return () => clearInterval(intervalRef);
    }, []);

    const onDragEnd = () => {
        const x = dragX.get();

        if (x <= -DRAG_BUFFER && imgIndex < PROJECTS_LIST.length - 1) {
            setImgIndex((pv) => pv + 1);
        } else if (x >= DRAG_BUFFER && imgIndex > 0) {
            setImgIndex((pv) => pv - 1);
        }
    };

    return (
        <motion.section
            id="portfolio"
            style={{ scale, rotate }}
            className="relative transform-gpu bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 h-screen w-full pt-8 md:pt-28 pb-16 md:pb-0 flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Animated Background Elements */}
            <ModernBackground />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(255,255,255,0.05)_25px,rgba(255,255,255,0.05)_26px,transparent_27px,transparent_74px,rgba(255,255,255,0.05)_75px,rgba(255,255,255,0.05)_76px,transparent_77px),linear-gradient(rgba(255,255,255,0.05)_24px,transparent_25px,transparent_26px,rgba(255,255,255,0.05)_27px,rgba(255,255,255,0.05)_74px,transparent_75px,transparent_76px,rgba(255,255,255,0.05)_77px)] bg-[length:100px_100px]"></div>
            </div>

            {/* Floating Particles */}
            <FloatingParticles />

            <div className="relative z-10 overflow-hidden py-8 md:px-[15%] w-full h-full transform-gpu">
                <motion.div
                    drag="x"
                    dragConstraints={{
                        left: 0,
                        right: 0,
                    }}
                    style={{
                        x: dragX,
                    }}
                    animate={{
                        translateX: `-${imgIndex * 100}%`,
                    }}
                    transition={SPRING_OPTIONS}
                    onDragEnd={onDragEnd}
                    className="w-full h-full flex cursor-grab items-center active:cursor-grabbing"
                >
                    <Projects imgIndex={imgIndex} />
                </motion.div>

                <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
                <ArrowButtons imgIndex={imgIndex} setImgIndex={setImgIndex} />
            </div>
            <GradientEdges />
        </motion.section>
    );
};

export default PortfolioSection;

// Modern Background Component
const ModernBackground = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <>
            {/* Reduced Gradient Orbs - smaller blur, fewer orbs */}
            <motion.div
                className={`absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full ${
                    isMobile ? "blur-sm" : "blur-3xl"
                }`}
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: isMobile ? 12 : 8, // Slower on mobile
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {!isMobile && (
                <>
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-2xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            x: [0, -30, 0],
                            y: [0, 15, 0],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2,
                        }}
                    />

                    {/* Remove rotating orb on mobile - expensive */}
                    <motion.div
                        className="absolute top-3/4 left-1/3 w-32 h-32 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-full blur-xl"
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </>
            )}

            {/* Simplified Geometric Shapes - only one on mobile */}
            <motion.div
                className="absolute top-10 right-10 w-3 h-3 bg-cyan-400/40 rotate-45"
                animate={{
                    rotate: [45, 135],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: isMobile ? 8 : 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {!isMobile && (
                <>
                    <motion.div
                        className="absolute bottom-20 left-20 w-4 h-4 border border-purple-400/40 rounded-full"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.4, 0.8, 0.4],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    <motion.div
                        className="absolute top-1/2 right-1/3 w-2 h-2 bg-pink-400/50"
                        animate={{
                            y: [0, -15, 0],
                            x: [0, 10, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </>
            )}

            {/* Remove complex SVG animations on mobile */}
            {!isMobile && (
                <svg
                    className="absolute inset-0 w-full h-full opacity-20"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid slice" // Better performance
                >
                    <motion.path
                        d="M0,50 Q50,25 100,50"
                        stroke="url(#gradient1)"
                        strokeWidth="0.3"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <defs>
                        <linearGradient
                            id="gradient1"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop
                                offset="0%"
                                stopColor="#06b6d4"
                                stopOpacity="0"
                            />
                            <stop
                                offset="50%"
                                stopColor="#06b6d4"
                                stopOpacity="0.6"
                            />
                            <stop
                                offset="100%"
                                stopColor="#06b6d4"
                                stopOpacity="0"
                            />
                        </linearGradient>
                    </defs>
                </svg>
            )}
        </>
    );
};

// Floating Particles Component
const FloatingParticles = () => {
    const [particles, setParticles] = useState<
        {
            left: string;
            top: string;
            xMove: number;
            duration: number;
            delay: number;
        }[]
    >([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();

        // Reduce particles on mobile
        const particleCount = window.innerWidth < 768 ? 6 : 15;

        const generatedParticles = Array.from(
            { length: particleCount },
            (_, i) => ({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                xMove: Math.random() * 30 - 15, // Reduce movement range
                duration: Math.random() * 4 + 6, // Slower animations
                delay: Math.random() * 8 + i * 0.2, // Stagger more
            })
        );
        setParticles(generatedParticles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${
                        isMobile ? "w-0.5 h-0.5" : "w-1 h-1"
                    } bg-white/15 rounded-full`}
                    style={{
                        left: particle.left,
                        top: particle.top,
                    }}
                    animate={{
                        y: [0, -60, 0],
                        x: [0, particle.xMove, 0],
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: particle.delay,
                    }}
                />
            ))}
        </div>
    );
};

const ArrowButtons = ({
    setImgIndex,
}: {
    imgIndex: number;
    setImgIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const goToPrevious = () => {
        setImgIndex((prev) =>
            prev === 0 ? PROJECTS_LIST.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        setImgIndex((prev) =>
            prev === PROJECTS_LIST.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <>
            {/* Left Arrow */}
            <div className="absolute left-0 md:left-[15%] top-1/2 -translate-y-1/2 -translate-x-1/2 z-20">
                <motion.button
                    onClick={goToPrevious}
                    className="group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0.7 }}
                    whileInView={{ opacity: 1 }}
                >
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:border-cyan-400/50 group-hover:shadow-lg group-hover:shadow-cyan-400/25">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-white group-hover:text-cyan-400 transition-colors duration-300"
                        >
                            <path
                                d="M15 18L9 12L15 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </motion.button>
            </div>

            {/* Right Arrow */}
            <div className="absolute right-0 md:right-[15%] top-1/2 -translate-y-1/2 translate-x-1/2 z-20">
                <motion.button
                    onClick={goToNext}
                    className="group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0.7 }}
                    whileInView={{ opacity: 1 }}
                >
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:border-cyan-400/50 group-hover:shadow-lg group-hover:shadow-cyan-400/25">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-white group-hover:text-cyan-400 transition-colors duration-300"
                        >
                            <path
                                d="M9 18L15 12L9 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </motion.button>
            </div>
        </>
    );
};

const Projects = ({ imgIndex }: { imgIndex: number }) => {
    return (
        <>
            {PROJECTS_LIST.map((project, idx) => {
                return (
                    <motion.div
                        key={idx}
                        transition={SPRING_OPTIONS}
                        animate={{
                            scale: imgIndex === idx ? 0.95 : 0.85,
                        }}
                        className="transform-gpu relative w-full h-full bg-gradient-to-br from-gray-900/40 to-gray-950/60 md:backdrop-blur-xl rounded-2xl border border-white/10 shrink-0 md:grid md:grid-cols-2 flex flex-col gap-0 md:gap-6 p-0 md:p-4 shadow-2xl shadow-black/50"
                        style={{
                            backgroundImage: `
                                radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
                                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
                                radial-gradient(circle at 40% 40%, rgba(120, 200, 255, 0.05) 0%, transparent 50%)
                            `,
                        }}
                    >
                        {/* Card Glow Effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 blur-sm md:blur-xl opacity-50" />

                        <div className="relative p-2 md:p-4 flex flex-col h-full overflow-y-auto">
                            <div className="text-center md:text-left text-2xl md:text-[3.2rem] font-bold">
                                {project.title}
                            </div>
                            <div className="text-center md:text-left text-sm md:text-lg font-semibold md:mt-4 text-gray-200">
                                {project.description}
                            </div>
                            <div className="flex-grow bg-gradient-to-br from-[#001242] to-[#0a1630] my-4 rounded-lg shadow-inner shadow-blue-950/50 border border-blue-900/30 p-3 md:p-6 font-mono text-sm md:text-lg flex flex-col overflow-y-auto">
                                <div className="flex justify-between items-center">
                                    <div className="flex space-x-2 text-red-500">
                                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
                                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
                                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                                    </div>
                                    <p className="text-xs md:text-sm text-cyan-300">
                                        bash
                                    </p>
                                </div>
                                <div className="mt-4 overflow-y-auto flex-grow">
                                    {project.points.map((p, i) => (
                                        <React.Fragment key={i}>
                                            <p className="text-green-400">
                                                $ {p.title}
                                            </p>
                                            <p className="text-white">
                                                {p.subTitle}
                                            </p>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="relative flex flex-col-reverse md:flex-col p-2 md:p-4">
                            <div className="relative group flex items-center justify-center">
                                <Image
                                    alt={`${project.title} banner`}
                                    width={700}
                                    height={500}
                                    src={`/assets/${project.placeholderImage}`}
                                    className="rounded-xl object-cover w-full md:h-[340px] h-[160px] transition-all duration-500 ease-in-out shadow-xl shadow-black/30 border border-white/10"
                                />
                                <a
                                    href={project.link}
                                    target="_blank"
                                    className={`absolute cursor-pointer inset-0 flex items-center justify-center text-lg font-semibold md:opacity-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-black/50 to-black/30 md:backdrop-blur-sm text-white rounded-xl`}
                                >
                                    Visit &#8599;
                                </a>
                                <span className="font-semibold px-3 text-white py-1 absolute top-2 right-2 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm text-sm md:text-lg rounded-lg border border-white/20">
                                    {project.date}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 md:gap-4 py-4 md:py-6 flex-wrap">
                                {project.techStack.map((name) => (
                                    <button
                                        key={name}
                                        className="
                                        px-2 md:px-6 py-1 md:py-3 text-sm md:text-lg rounded-md text-white 
                                        bg-gradient-to-r from-[#001242] to-[#0a1630] cursor-pointer 
                                        border border-blue-500/30 backdrop-blur-sm
                                        transition-all duration-300 
                                        shadow-[0_4px_20px_rgba(59,130,246,0.15)] 
                                        hover:border-blue-400/50 hover:shadow-[0_6px_25px_rgba(59,130,246,0.25)]
                                        hover:scale-105 hover:bg-gradient-to-r hover:from-[#0a1630] hover:to-[#001242]
                                        active:scale-95
                                    "
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>
                            {project.source === "private" ? (
                                <div className="flex-grow flex items-end justify-center md:justify-end md:p-2">
                                    <div
                                        className="
                                            flex items-center justify-center px-2 md:px-4 py-2 gap-2 md:gap-4 
                                            bg-gradient-to-r from-[#4A4A4A] to-[#3A3A3A] 
                                            border border-gray-500/30 backdrop-blur-sm
                                            rounded-md cursor-not-allowed transition-all duration-400 text-sm
                                            shadow-lg shadow-black/20
                                        "
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M15.9965 16H16.0054"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M11.9955 16H12.0045"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M7.99451 16H8.00349"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <p className="text text-white">
                                            Private Repo
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-grow flex items-end justify-center md:justify-end md:p-2">
                                    <a
                                        href={project.source}
                                        target="_blank"
                                        className="
                                        flex items-center justify-center px-2 md:px-4 py-2 gap-2 md:gap-4 
                                        bg-gradient-to-r from-[#181717] to-[#0d1117] 
                                        border border-gray-600/30 backdrop-blur-sm
                                        rounded-md cursor-pointer transition-all duration-400 text-sm 
                                        hover:scale-110 hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)]
                                        hover:border-white/40 group
                                    "
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="group-hover:scale-110 transition-transform duration-300"
                                        >
                                            <path
                                                d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z"
                                                fill="white"
                                            ></path>
                                        </svg>
                                        <p className="text text-white">
                                            Source Code
                                        </p>
                                    </a>
                                </div>
                            )}
                        </div>
                    </motion.div>
                );
            })}
        </>
    );
};

const Dots = ({
    imgIndex,
    setImgIndex,
}: {
    imgIndex: number;
    setImgIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
    return (
        <div className="relative z-20 md:mx-4 flex w-full justify-center gap-2">
            {PROJECTS_LIST.map((_, idx) => {
                return (
                    <button
                        key={idx}
                        onClick={() => setImgIndex(idx)}
                        className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-all duration-300 ${
                            idx === imgIndex
                                ? "bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg shadow-cyan-400/50 scale-125"
                                : "bg-neutral-500 hover:bg-neutral-300 hover:scale-110"
                        }`}
                    />
                );
            })}
        </div>
    );
};

const GradientEdges = () => {
    return (
        <>
            <div className="hidden sm:block pointer-events-none absolute bottom-0 left-0 top-0 w-[15vw] max-w-[160px] bg-gradient-to-r from-[#0a0f2e]/80 to-transparent z-10" />
            <div className="hidden sm:block pointer-events-none absolute bottom-0 right-0 top-0 w-[15vw] max-w-[160px] bg-gradient-to-l from-[#0a0f2e]/80 to-transparent z-10" />
        </>
    );
};
