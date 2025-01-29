import React, { useRef } from 'react'
import { useTransform, motion, MotionValue } from "framer-motion";
import { EXPERIENCE_LIST, SKILLS_LIST } from '@/utils/data';




const AboutSection = ({scrollYProgress}:{scrollYProgress: MotionValue<number>}) => {
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, 5])
    const scrollRef = useRef(null);

    return (
        <motion.section id="about" style={{scale, rotate}} className="bg-[#0094C6] sticky top-0 h-screen w-full pt-10 flex flex-col items-center justify-center md:grid md:grid-cols-2 md:px-[10%] gap-10 md:py-16">
            <div className="flex items-center justify-between max-w-[1200px] p-8 gap-16">
                {/* Content Section */}
                <div className="">
                    <h2 className="text-2xl md:text-[2.8rem] font-bold mb-2 md:mb-6 text-cyan-400">
                        About Me
                    </h2>
                    <p className="text-sm md:text-xl leading-relaxed mb-8 text-slate-100">
                        I&apos;m a passionate full-stack developer out of Bengaluru with expertise in modern web technologies. 
                        With 15+ months of professional experience, I specialize in creating beautiful, responsive, 
                        and user-friendly applications. My toolkit includes React, Node.js, Python, 
                        and cloud technologies, which I use to transform complex problems into 
                        elegant solutions.
                    </p>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-2 gap-2 md:gap-4 mb-8">
                        {SKILLS_LIST.map((skill) => (
                            <div
                                key={skill}
                                className="flex items-center gap-2 text-sm md:text-lg text-slate-200 transition-transform hover:translate-x-2 cursor-default"
                            >
                                <span className="text-cyan-400">▹</span>
                                {skill}
                            </div>
                        ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-6">
                        <a
                            href="https://github.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-300 text-2xl hover:text-cyan-400 transition-colors"
                        >
                            <i className="fab fa-github"></i>
                        </a>
                        <a
                            href="https://linkedin.com/in/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-300 text-2xl hover:text-cyan-400 transition-colors"
                        >
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className='bg-[#07373c32] rounded-lg relative overflow-hidden hidden md:block'>
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0094C6] to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0094C6] to-transparent pointer-events-none"></div>

                <div 
                    className="relative h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-2 py-8"
                    ref={scrollRef}
                >

                    {/* Vertical line */}
                    <div className="absolute left-1/2 w-1 bg-gray-200 h-full -translate-x-1/2" />
                    <div className="relative space-y-8 pl-8 pr-8">
                        {EXPERIENCE_LIST.map((experience, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ root: scrollRef, once: true, margin: "-100px 0px -100px 0px" }}
                                transition={{ duration: 0.8, delay: (index + 1) * 0.1 }}
                                className="relative"
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-[-28px] top-6 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-lg" />
                                
                                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-xl font-semibold text-gray-900">
                                        {experience.role}
                                        </h3>
                                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                        {experience.time}
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-medium text-blue-600 mb-3">
                                        {experience.company}
                                    </h4>
                                    <div className="text-gray-600 leading-relaxed">
                                        {experience.description.map((item,i) => (
                                            <p key={i}>• {item}</p>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <i className="fas fa-chevron-down text-2xl"></i>
            </div> */}
        </motion.section>
    )
}

export default AboutSection