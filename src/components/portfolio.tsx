import React, { useEffect, useState } from 'react'
import { useTransform, motion, MotionValue, useMotionValue } from "framer-motion";
import { PROJECTS_LIST } from '@/utils/data';

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 1000;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
};

const PortfolioSection = ({scrollYProgress}:{scrollYProgress: MotionValue<number>}) => {
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], [5, 0])

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
        <motion.section id="portfolio" style={{scale, rotate}} className="bg-[#001242] sticky h-screen w-full pt-8 md:pt-28 pb-16 md:pb-0 flex flex-col items-center justify-center">
            <div className="overflow-hidden py-8 md:px-[15%] w-full h-full">
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
                    <Projects imgIndex={imgIndex}/>
                </motion.div>
        
                <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
                <GradientEdges />
            </div>
        </motion.section>
    )
}

export default PortfolioSection

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
                        className='w-full h-full bg-gray-950 bg-opacity-20 backdrop-blur-xl rounded-lg shrink-0 md:grid md:grid-cols-2 flex flex-col-reverse gap-0 md:gap-6 p-0 md:p-4'
                    >
                        <div className='p-2 md:p-4 flex flex-col h-full overflow-y-auto'>
                            <div className='text-2xl md:text-[3.2rem] font-bold'>{project.title}</div>
                            <div className='text-sm md:text-lg font-semibold md:mt-4'>{project.description}</div>
                            <div className='flex-grow bg-[#001242] my-4 rounded-lg shadow-inner shadow-blue-950 p-3 md:p-6 font-mono text-sm md:text-lg flex flex-col overflow-y-auto'>
                                <div className="flex justify-between items-center">
                                    <div className="flex space-x-2 text-red-500">
                                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <p className="text-xs md:text-sm">bash</p>
                                </div>
                                <div className="mt-4 overflow-y-auto flex-grow">
                                    {project.points.map((p,i) => (
                                        <React.Fragment key={i}>
                                            <p className="text-green-400">$ {p.title}</p>
                                            <p className="text-white">{p.subTitle}</p>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col p-2 md:p-4">
                            <div className="relative group flex items-center justify-center">
                                <img
                                    src={`/assets/${project.placeholderImage}`}
                                    className="rounded-xl object-cover w-full md:h-[340px] h-[160px] transition-all duration-500 ease-in-out"
                                />
                                <a href={project.link} target='_blank' className="absolute cursor-pointer inset-0 flex items-center justify-center text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/30 text-white">
                                    Visit &#8599;
                                </a>
                                <span className='font-semibold px-3 py-1 absolute top-2 right-2 bg-slate-800 text-sm md:text-lg rounded-lg'>{project.date}</span>
                            </div>
                            <div className='flex items-center gap-4 py-6 flex-wrap'>
                                {project.techStack.map(name => (
                                    <button key={name} className="
                                        px-2 md:px-6 py-1 md:py-3 text-sm md:text-lg rounded-md text-white bg-[#001242] cursor-pointer border border-[#2c2c2c] 
                                        transition-all duration-300 shadow-[6px_6px_12px_#001a63,-6px_-6px_12px_#171717] 
                                        hover:border-black 
                                        active:shadow-[4px_4px_12px_#001a62,-4px_-4px_12px_#171717]
                                    ">
                                        {name}
                                    </button>
                                ))}
                            </div>
                            <div className='flex-grow flex items-end justify-center md:justify-end p-2'>
                                <a href={project.source} target='_blank' className="
                                    flex items-center justify-center px-2 md:px-4 py-2 gap-2 md:gap-4 
                                    bg-[#181717] outline outline-[3px] outline-[#181717] outline-offset-[-3px] 
                                    rounded-md border-none cursor-pointer transition-all duration-400 text-sm hover:scale-110
                                ">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z" fill="white"></path>
                                    </svg>
                                    <p className="text">Source Code</p>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </>
    );
};

const Dots = ({ imgIndex, setImgIndex }: { imgIndex: number, setImgIndex: React.Dispatch<React.SetStateAction<number>> }) => {
    return (
        <div className="md:mx-4 flex w-full justify-center gap-2">
            {PROJECTS_LIST.map((_, idx) => {
                return (
                    <button
                        key={idx}
                        onClick={() => setImgIndex(idx)}
                        className={`h-3 w-3 rounded-full transition-colors ${
                            idx === imgIndex ? "bg-neutral-50" : "bg-neutral-500"
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
            <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[15vw] max-w-[160px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[15vw] max-w-[160px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
        </>
    );
};