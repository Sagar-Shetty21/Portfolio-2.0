'use client'
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";

export default function Home() {

  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  }) 

  const scrollToSection = (target: string) => {
  let targetOffset = 0;

  if (target === 'home') {
    targetOffset = 0; // Scroll to the top 0vh
  } else if (target === 'about') {
    targetOffset = window.innerHeight; // Scroll to 100vh
  } else if (target === 'portfolio') {
    targetOffset = window.innerHeight * 2; // Scroll to 200vh
  }

  window.scrollTo({
    top: targetOffset,
    behavior: 'smooth',
  });
};

  
  return (
    <div ref={container} className="h-[300vh] relative">
      <div className="hidden fixed left-16 bottom-0 md:flex flex-col gap-6 items-center z-50">
        <a href="https://linkedin.com/in/sagarshetty21" target="_blank"><img alt="linkedin" src="/assets/linkedin.png" className="h-8 w-8"/></a>
        <a href="https://github.com/Sagar-Shetty21" target="_blank"><img alt="github" src="/assets/github.png" className="h-8 w-8"/></a>
        <a href="mailto:dev.sagarshetty@gmail.com" target="_blank"><img alt="email" src="/assets/email.png" className="h-8 w-8"/></a>
        <div className="w-1 h-56 bg-white rounded-full"></div>
      </div>
      <a href="mailto:dev.sagarshetty@gmail.com" target="_blank">
        <div className="hidden fixed right-16 bottom-0 md:flex flex-col gap-6 items-center translate-x-16 hover:scale-110 transition-all cursor-pointer z-50">
          <div className="rotate-90 -translate-y-24">dev.sagarshetty@gmail.com</div>
          <div className="w-1 h-80 bg-white rounded-full"></div>
        </div>
      </a>


      <section className="px-6 md:px-[15%] py-4 md:py-8 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <div className="font-bold text-xl md:text-2xl "><span>{"<"}</span><span className="text-[#f13c58]">{"Sagar"}</span><span>{"/>"}</span></div>
        <div className="flex text-lg items-center gap-20 font-semibold">
          <div onClick={() => scrollToSection('home')} className="hidden md:block cursor-pointer">Home</div>
          <div onClick={() => scrollToSection('about')} className="hidden md:block cursor-pointer">About</div>
          <div onClick={() => scrollToSection('portfolio')} className="hidden md:block cursor-pointer">Portfolio</div>
          <a href="mailto:dev.sagarshetty@gmail.com" target="_blank"><button className="px-4 md:px-6 py-1 border-2 text-sm md:text-lg bg-[#536c89]">Let&apos;s Talk</button></a>
        </div>
      </section>

      <HomeSection scrollYProgress={scrollYProgress}/>
      <AboutSection scrollYProgress={scrollYProgress}/>
      <PortfolioSection scrollYProgress={scrollYProgress}/>
    </div>
  );
}

const HomeSection = ({scrollYProgress}:{scrollYProgress: MotionValue<number>}) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5])

  return (
    <motion.section id="home" style={{scale, rotate}} className="bg-[#20345b] sticky top-0 flex flex-col-reverse justify-center gap-10 md:gap-0 md:grid md:grid-cols-2 h-screen md:px-[15%] pt-10 overflow-hidden">
      <div className="flex flex-col items-start justify-center">
        <div className="p-4 md:p-0 text-center w-full md:text-center">
          <p className="text-[16px] md:text-[24px] font-semibold">Hi There</p>
          <h1 className="text-[34px] md:text-[68px] font-bold">I&apos;m <span className="text-[#f13c58]">Sagar Shetty</span></h1>
          <h2 className="text-[26px] md:text-[48px]">I am a Web Developer</h2>
        </div>
        <div className="flex items-center justify-center md:justify-start gap-12 py-12 w-full">
          <a href='/assets/resume.pdf'><button className="px-8 md:px-12 py-2 md:py-3 text-lg md:text-2xl font-semibold bg-[#f13c58] rounded-lg">Resume</button></a>
          <a href="mailto:dev.sagarshetty@gmail.com" target="_blank"><button className="px-8 md:px-12 py-2 md:py-3 text-lg md:text-2xl font-semibold bg-[#52648c] rounded-lg">Contact Me</button></a>
        </div>
      </div>
      <div className="flex items-center justify-center relative">
        <svg
          id="sw-js-blob-svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full absolute scale-150 -z-10"
        >
          <defs>
            <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
              <stop id="stop1" stopColor="rgba(47, 50, 92, 1)" offset="0%" />
              <stop id="stop2" stopColor="rgba(47, 50, 92, 1)" offset="100%" />
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
        <img alt="person illustration" src="/assets/person-illustration.png" className="w-auto h-64 md:h-auto md:w-[80%] object-cover opacity-90" />
      </div>
    </motion.section>
  )
}

const AboutSection = ({scrollYProgress}:{scrollYProgress: MotionValue<number>}) => {
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, 5])

  return (
    <motion.section id="about" style={{scale, rotate}} className="bg-green-400 sticky top-0 h-screen w-full pt-10 text-[100px] flex flex-col items-center justify-center">
        <div>About section</div>
        <div className="text-sm">work in progress! should be done by 29th Jan 2025</div>
    </motion.section>
  )
}

const PortfolioSection = ({scrollYProgress}:{scrollYProgress: MotionValue<number>}) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0])

  return (
    <motion.section id="portfolio" style={{scale, rotate}} className="bg-blue-400 sticky h-screen w-full pt-10 text-[100px] flex flex-col items-center justify-center">
        <div>Portfolio section</div>
        <div className="text-sm">work in progress! should be done by 29th Jan 2025</div>
    </motion.section>
  )
}