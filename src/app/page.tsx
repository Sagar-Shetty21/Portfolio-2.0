'use client'
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function Home() {

  const [activePage, setActivePage] = useState<'home' | 'about' | 'portfolio'>('home')

  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  }) 

  useEffect(() => {
    const viewHeight = window.innerHeight;
    const unsubscribe = scrollYProgress.onChange(progress => {
      // Calculate the scroll position in terms of window height
      if(container.current){
        const scrollPosition = progress * (container.current.scrollHeight - viewHeight);
  
        if (scrollPosition < viewHeight * 0.5) {
          setActivePage('home');
        } else if (scrollPosition < viewHeight * 1.5) {
          setActivePage('about');
        } else {
          setActivePage('portfolio');
        }
      }
    });

    return () => unsubscribe();
  },[scrollYProgress])

  const scrollToSection = (target: 'home' | 'about' | 'portfolio') => {
    setActivePage(target)

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
        <a href="https://linkedin.com/in/sagarshetty21" target="_blank"><img alt="linkedin" src="/assets/linkedin.png" className="h-8 w-8 hover:scale-125 transition-all"/></a>
        <a href="https://github.com/Sagar-Shetty21" target="_blank"><img alt="github" src="/assets/github.png" className="h-8 w-8 hover:scale-125 transition-all"/></a>
        <a href="mailto:dev.sagarshetty@gmail.com" target="_blank"><img alt="email" src="/assets/email.png" className="h-8 w-8 hover:scale-125 transition-all"/></a>
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

      <MobileNavbar activePage={activePage} scrollToSection={scrollToSection}/>

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
        <div className="p-4 md:p-0 text-center md:text-start w-full">
          <p className="text-[20px] md:text-[24px] font-semibold">Hi There</p>
          <h1 className="text-[40px] md:text-[68px] font-bold">I&apos;m <span className="text-[#f13c58]">Sagar Shetty</span></h1>
          <h2 className="text-[30px] md:text-[48px]">I am a Web Developer</h2>
        </div>
        <div className="flex items-center justify-center md:justify-start gap-4 md:gap-12 py-4 md:py-12 w-full">
          <a href='/assets/resume.pdf'><button className="px-6 md:px-12 py-2 md:py-3 text-lg md:text-2xl font-semibold bg-[#f13c58] rounded-lg">Resume</button></a>
          <a href="mailto:dev.sagarshetty@gmail.com" target="_blank"><button className="px-6 md:px-12 py-2 md:py-3 text-lg md:text-2xl font-semibold bg-[#52648c] rounded-lg">Contact Me</button></a>
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

const MobileNavbar = ({activePage, scrollToSection}: {activePage: string, scrollToSection: (target: "home" | "about" | "portfolio") => void}) => {
  return (
    <div className="flex items-center justify-center">
      <section className="mobileNavbarSection md:hidden fixed bottom-4 z-[50] w-full mx-4">
        <label title="home" htmlFor="home" className="label">
          <input 
            id="home" 
            name="page" 
            type="radio" 
            checked={activePage === 'home'}
            onChange={(e) => e.target.checked && scrollToSection('home')}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 21 20"
            height="20"
            width="21"
            className="icon home"
          >
            <path
              fill="inherit"
              d="M18.9999 6.01002L12.4499 0.770018C11.1699 -0.249982 9.16988 -0.259982 7.89988 0.760018L1.34988 6.01002C0.409885 6.76002 -0.160115 8.26002 0.0398848 9.44002L1.29988 16.98C1.58988 18.67 3.15988 20 4.86988 20H15.4699C17.1599 20 18.7599 18.64 19.0499 16.97L20.3099 9.43002C20.4899 8.26002 19.9199 6.76002 18.9999 6.01002ZM10.9199 16C10.9199 16.41 10.5799 16.75 10.1699 16.75C9.75988 16.75 9.41988 16.41 9.41988 16V13C9.41988 12.59 9.75988 12.25 10.1699 12.25C10.5799 12.25 10.9199 12.59 10.9199 13V16Z"
            ></path>
          </svg>
        </label>
        <label title="cart" htmlFor="cart" className="label">
          <input 
            id="cart" 
            name="page" 
            type="radio" 
            checked={activePage === 'about'}
            onChange={(e) => e.target.checked && scrollToSection('about')}
          />
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            fill="inherit"
            viewBox="0 0 24 24"
            height="24"
            width="28"
            className="icon cart"
          >
            <path fill="inherit" d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z"/>
            <path fill="inherit" d="M17.0809 14.1499C14.2909 12.2899 9.74094 12.2899 6.93094 14.1499C5.66094 14.9999 4.96094 16.1499 4.96094 17.3799C4.96094 18.6099 5.66094 19.7499 6.92094 20.5899C8.32094 21.5299 10.1609 21.9999 12.0009 21.9999C13.8409 21.9999 15.6809 21.5299 17.0809 20.5899C18.3409 19.7399 19.0409 18.5999 19.0409 17.3599C19.0309 16.1299 18.3409 14.9899 17.0809 14.1499Z"/>
          </svg>
        </label>
        <label title="favorite" htmlFor="favorite" className="label">
          <input 
            id="favorite" 
            name="page" 
            type="radio" 
            checked={activePage === 'portfolio'}
            onChange={(e) => e.target.checked && scrollToSection('portfolio')}
          />
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            fill="inherit"
            viewBox="0 0 24 22"
            height="22"
            width="20"
            className="icon favorite"
          >
            <path fill="inherit" d="M21.091 6.97953C20.241 6.03953 18.821 5.56953 16.761 5.56953H16.521V5.52953C16.521 3.84953 16.521 1.76953 12.761 1.76953H11.241C7.48101 1.76953 7.48101 3.85953 7.48101 5.52953V5.57953H7.24101C5.17101 5.57953 3.76101 6.04953 2.91101 6.98953C1.92101 8.08953 1.95101 9.56953 2.05101 10.5795L2.06101 10.6495L2.13847 11.4628C2.15273 11.6126 2.2334 11.7479 2.35929 11.8303C2.59909 11.9872 3.00044 12.2459 3.24101 12.3795C3.38101 12.4695 3.53101 12.5495 3.68101 12.6295C5.39101 13.5695 7.27101 14.1995 9.18101 14.5095C9.27101 15.4495 9.68101 16.5495 11.871 16.5495C14.061 16.5495 14.491 15.4595 14.561 14.4895C16.601 14.1595 18.571 13.4495 20.351 12.4095C20.411 12.3795 20.451 12.3495 20.501 12.3195C20.8977 12.0953 21.3093 11.819 21.6845 11.5484C21.7975 11.4668 21.8698 11.3408 21.8852 11.2023L21.901 11.0595L21.951 10.5895C21.961 10.5295 21.961 10.4795 21.971 10.4095C22.051 9.39953 22.031 8.01953 21.091 6.97953ZM13.091 13.8295C13.091 14.8895 13.091 15.0495 11.861 15.0495C10.631 15.0495 10.631 14.8595 10.631 13.8395V12.5795H13.091V13.8295ZM8.91101 5.56953V5.52953C8.91101 3.82953 8.91101 3.19953 11.241 3.19953H12.761C15.091 3.19953 15.091 3.83953 15.091 5.52953V5.57953H8.91101V5.56953Z"/>
            <path fill="inherit" d="M20.8733 13.7349C21.2269 13.5666 21.6342 13.8469 21.5988 14.2369L21.2398 18.1907C21.0298 20.1907 20.2098 22.2307 15.8098 22.2307H8.18984C3.78984 22.2307 2.96984 20.1907 2.75984 18.2007L2.41913 14.4529C2.38409 14.0674 2.78205 13.7874 3.13468 13.947C4.2741 14.4625 6.37724 15.3771 7.67641 15.7174C7.84072 15.7604 7.97361 15.878 8.04556 16.0319C8.65253 17.33 9.96896 18.0207 11.8698 18.0207C13.752 18.0207 15.085 17.3034 15.694 16.0021C15.766 15.8481 15.8991 15.7305 16.0635 15.6873C17.443 15.3243 19.6816 14.3019 20.8733 13.7349Z"/>
          </svg>
        </label>
      </section>
    </div>
  )
}