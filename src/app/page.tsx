"use client";
import { useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MobileNavbar from "@/components/mobileNavbar";
import HomeSection from "@/components/home";
import AboutSection from "@/components/about";
import PortfolioSection from "@/components/portfolio";

export default function Home() {
    const [activePage, setActivePage] = useState<
        "home" | "about" | "portfolio"
    >("home");
    const [isFullScreen, setIsFullScreen] = useState(false);
    const container = useRef<HTMLDivElement>(null);

    const toggleFullScreen = () => {
        const element = document.documentElement; // or a specific ref
        if (!document.fullscreenElement) {
            element.requestFullscreen().then(() => {
                element.style.overflow = "auto"; // Allow scrolling
                setIsFullScreen(true);
            });
        } else {
            document.exitFullscreen().then(() => {
                element.style.overflow = ""; // Reset after exit
                setIsFullScreen(false);
            });
        }
    };

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        const viewHeight = window.innerHeight;
        const unsubscribe = scrollYProgress.onChange((progress) => {
            // Calculate the scroll position in terms of window height
            if (container.current) {
                const scrollPosition =
                    progress * (container.current.scrollHeight - viewHeight);

                if (scrollPosition < viewHeight * 0.5) {
                    setActivePage("home");
                } else if (scrollPosition < viewHeight * 1.5) {
                    setActivePage("about");
                } else {
                    setActivePage("portfolio");
                }
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    const scrollToSection = (target: "home" | "about" | "portfolio") => {
        setActivePage(target);

        let targetOffset = 0;

        if (target === "home") {
            targetOffset = 0; // Scroll to the top 0vh
        } else if (target === "about") {
            targetOffset = window.innerHeight; // Scroll to 100vh
        } else if (target === "portfolio") {
            targetOffset = window.innerHeight * 2; // Scroll to 200vh
        }

        window.scrollTo({
            top: targetOffset,
            behavior: "smooth",
        });
    };

    return (
        <div ref={container} className="h-[300vh] relative">
            <div className="hidden fixed left-16 bottom-0 md:flex flex-col gap-6 items-center z-50">
                <a href="https://linkedin.com/in/sagarshetty21" target="_blank">
                    <img
                        alt="linkedin"
                        src="/assets/linkedin.png"
                        className="h-8 w-8 hover:scale-125 transition-all"
                    />
                </a>
                <a href="https://github.com/Sagar-Shetty21" target="_blank">
                    <img
                        alt="github"
                        src="/assets/github.png"
                        className="h-8 w-8 hover:scale-125 transition-all"
                    />
                </a>
                <a href="mailto:dev.sagarshetty@gmail.com" target="_blank">
                    <img
                        alt="email"
                        src="/assets/email.png"
                        className="h-8 w-8 hover:scale-125 transition-all"
                    />
                </a>
                <div className="w-1 h-56 bg-white rounded-full"></div>
            </div>
            <a href="mailto:dev.sagarshetty@gmail.com" target="_blank">
                <div className="hidden fixed right-16 bottom-0 md:flex flex-col gap-6 items-center translate-x-16 hover:scale-110 transition-all cursor-pointer z-50">
                    <div className="rotate-90 -translate-y-24">
                        dev.sagarshetty@gmail.com
                    </div>
                    <div className="w-1 h-80 bg-white rounded-full"></div>
                </div>
            </a>

            <section className="px-6 md:px-[15%] py-4 md:py-8 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
                <div className="font-bold text-xl md:text-2xl ">
                    <span>{"<"}</span>
                    <span className="text-[#f13c58]">{"Sagar"}</span>
                    <span>{"/>"}</span>
                </div>
                <div className="flex text-lg items-center gap-20 font-semibold">
                    <div
                        onClick={() => scrollToSection("home")}
                        className="hidden md:block cursor-pointer"
                    >
                        Home
                    </div>
                    <div
                        onClick={() => scrollToSection("about")}
                        className="hidden md:block cursor-pointer"
                    >
                        About
                    </div>
                    <div
                        onClick={() => scrollToSection("portfolio")}
                        className="hidden md:block cursor-pointer"
                    >
                        Portfolio
                    </div>
                    <a href="mailto:dev.sagarshetty@gmail.com" target="_blank">
                        <button className="px-4 md:px-6 py-1 border-2 text-sm md:text-lg bg-[#536c89]">
                            Let&apos;s Talk
                        </button>
                    </a>
                </div>
            </section>

            <MobileNavbar
                activePage={activePage}
                scrollToSection={scrollToSection}
            />

            <button
                onClick={toggleFullScreen}
                className="fixed bottom-4 right-4 md:hidden p-2 bg-[#040f16] active:bg-gray-700 rounded-lg transition z-50 m-2"
            >
                {isFullScreen ? (
                    <img
                        src="/assets/expand.png"
                        className="h-5 w-5 invert-[50%]"
                    />
                ) : (
                    <img
                        src="/assets/collapse.png"
                        className="h-5 w-5 invert-[50%]"
                    />
                )}
            </button>

            <HomeSection scrollYProgress={scrollYProgress} />
            <AboutSection scrollYProgress={scrollYProgress} />
            <PortfolioSection scrollYProgress={scrollYProgress} />
        </div>
    );
}
