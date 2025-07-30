import React, { useState } from "react";
import { useTransform, motion, MotionValue } from "framer-motion";
import { EXPERIENCE_LIST } from "@/utils/data";

// Mock data - replace with your actual data
const SKILLS_LIST = [
    "React & Next.js",
    "Node.js & Express",
    "Python & Django",
    "TypeScript",
    "MongoDB & PostgreSQL",
    "AWS & Docker",
    "GraphQL & REST APIs",
    "Tailwind CSS",
];

const AboutSection = ({
    scrollYProgress,
}: {
    scrollYProgress: MotionValue<number>;
}) => {
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [0.8, 1, 1, 0.8]
    );
    const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

    return (
        <motion.section
            id="about"
            style={{ scale, opacity }}
            className="bg-gradient-to-br from-[#0a0f2e] via-[#001242] to-[#1a0f2e] sticky top-0 h-screen w-full overflow-hidden"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-md md:blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-md md:blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-md md:blur-2xl animate-pulse delay-2000"></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

            <div className="relative z-10 h-full flex items-center justify-center px-4 md:px-8">
                <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Header */}
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center gap-4"
                            >
                                <div className="w-12 h-px bg-gradient-to-r from-cyan-400 to-blue-500"></div>
                                <span className="text-cyan-400 font-mono text-sm tracking-wider">
                                    ABOUT ME
                                </span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl md:text-6xl font-bold text-white leading-tight"
                            >
                                Crafting Digital
                                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                                    Experiences
                                </span>
                            </motion.h2>
                        </div>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-4"
                        >
                            <p className="text-lg text-gray-300 leading-relaxed">
                                I&apos;m a passionate full-stack developer from{" "}
                                <span className="text-cyan-400 font-medium">
                                    Bengaluru
                                </span>{" "}
                                with expertise in modern web technologies.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                With{" "}
                                <span className="text-white font-semibold">
                                    15+ months
                                </span>{" "}
                                of professional experience, I specialize in
                                creating beautiful, responsive, and
                                user-friendly applications that solve real-world
                                problems.
                            </p>
                        </motion.div>

                        {/* Skills Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-4"
                        >
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-4">
                                Tech Stack
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {SKILLS_LIST.map((skill, index) => (
                                    <motion.div
                                        key={skill}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.6 + index * 0.1,
                                        }}
                                        onMouseEnter={() =>
                                            setHoveredSkill(index)
                                        }
                                        onMouseLeave={() =>
                                            setHoveredSkill(null)
                                        }
                                        className={`group flex items-center gap-3 p-2 md:p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                                            hoveredSkill === index
                                                ? "border-cyan-400/50 bg-cyan-400/5 transform translate-x-2"
                                                : "border-gray-700/50 bg-gray-800/20 hover:border-gray-600/50"
                                        }`}
                                    >
                                        <div
                                            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                                                hoveredSkill === index
                                                    ? "bg-cyan-400"
                                                    : "bg-gray-500"
                                            }`}
                                        ></div>
                                        <span
                                            className={`text-xs md:text-sm font-medium transition-colors duration-300 ${
                                                hoveredSkill === index
                                                    ? "text-cyan-400"
                                                    : "text-gray-300"
                                            }`}
                                        >
                                            {skill}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="hidden md:flex gap-4 pt-4"
                        >
                            {[
                                {
                                    icon: "🐙",
                                    label: "GitHub",
                                    href: "https://github.com/Sagar-Shetty21",
                                },
                                {
                                    icon: "💼",
                                    label: "LinkedIn",
                                    href: "https://linkedin.com/in/sagarshetty21",
                                },
                                {
                                    icon: "📧",
                                    label: "Email",
                                    href: "mailto:dev.sagarshetty@example.com",
                                },
                                {
                                    icon: "📝",
                                    label: "Blog",
                                    href: "https://mynotes-sagar.vercel.app/",
                                },
                            ].map((social, index) => (
                                <motion.a
                                    key={social.label + index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all duration-300"
                                >
                                    <span className="text-lg">
                                        {social.icon}
                                    </span>
                                    <span className="text-sm text-gray-400 group-hover:text-cyan-400 transition-colors">
                                        {social.label}
                                    </span>
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Experience Timeline */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative hidden lg:block"
                    >
                        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 h-full max-h-[600px] overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">
                                        🚀
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold text-white">
                                    Experience
                                </h3>
                            </div>

                            {/* Timeline */}
                            <div className="relative h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/50 pr-2">
                                <div className="absolute left-8 top-0 w-px h-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600"></div>

                                <div className="space-y-6 pb-8">
                                    {EXPERIENCE_LIST.map(
                                        (experience, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: 0.8 + index * 0.2,
                                                }}
                                                className="relative pl-12"
                                            >
                                                {/* Timeline dot */}
                                                <div className="absolute left-6 top-4 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 border-4 border-gray-900 shadow-lg shadow-cyan-400/20"></div>

                                                <motion.div
                                                    whileHover={{
                                                        scale: 1.02,
                                                        x: 4,
                                                    }}
                                                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 hover:border-cyan-400/30 hover:bg-gray-800/70 transition-all duration-300 group"
                                                >
                                                    <div className="flex justify-between items-start mb-3">
                                                        <h4 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                                            {experience.role}
                                                        </h4>
                                                        <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full font-mono">
                                                            {experience.time}
                                                        </span>
                                                    </div>

                                                    <h5 className="text-cyan-400 font-medium mb-3 text-sm">
                                                        {experience.company}
                                                    </h5>

                                                    <div className="space-y-2">
                                                        {experience.description.map(
                                                            (item, i) => (
                                                                <p
                                                                    key={i}
                                                                    className="text-sm text-gray-400 leading-relaxed flex items-start gap-2"
                                                                >
                                                                    <span className="text-cyan-400 mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0"></span>
                                                                    {item}
                                                                </p>
                                                            )
                                                        )}
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2"
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

export default AboutSection;
