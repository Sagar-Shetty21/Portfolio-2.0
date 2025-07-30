"use client";
import { useScroll } from "framer-motion";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import MobileNavbar from "@/components/mobileNavbar";
import HomeSection from "@/components/home";
import AboutSection from "@/components/about";
import PortfolioSection from "@/components/portfolio";
import LoadingScreen from "@/components/loadingScreen";

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [activePage, setActivePage] = useState<
        "home" | "about" | "portfolio"
    >("home");
    const [isFullScreen, setIsFullScreen] = useState(false);
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = "hidden"; // Disable scroll
        } else {
            document.body.style.overflow = ""; // Restore scroll
        }

        // Clean up on unmount
        return () => {
            document.body.style.overflow = "";
        };
    }, [isLoading]);

    useEffect(() => {
        const handleLoad = () => {
            // Add a small delay to ensure smooth transition
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        };

        // Check if page is already loaded
        if (document.readyState === "complete") {
            handleLoad();
        } else {
            // Wait for all resources (images, CSS, JS) to load
            window.addEventListener("load", handleLoad);
        }

        return () => {
            window.removeEventListener("load", handleLoad);
        };
    }, []);

    useEffect(() => {
        // Reset scroll position to top on page load/reload
        window.scrollTo(0, 0);

        // ensure the active page is set to home
        setActivePage("home");
    }, []);

    // Memoize fullscreen toggle to prevent recreating on every render
    const toggleFullScreen = useCallback(async () => {
        const element = document.documentElement;
        try {
            if (!document.fullscreenElement) {
                await element.requestFullscreen();
                element.style.overflow = "auto";
                setIsFullScreen(true);
            } else {
                await document.exitFullscreen();
                element.style.overflow = "";
                setIsFullScreen(false);
            }
        } catch (error) {
            console.warn("Fullscreen operation failed:", error);
        }
    }, []);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    // Throttle scroll updates to reduce computation
    useEffect(() => {
        let ticking = false;
        const viewHeight = window.innerHeight;

        const updateActivePage = (progress: number) => {
            if (!ticking && container.current) {
                requestAnimationFrame(() => {
                    const scrollPosition =
                        progress *
                        (container.current!.scrollHeight - viewHeight);

                    let newActivePage: "home" | "about" | "portfolio";
                    if (scrollPosition < viewHeight * 0.5) {
                        newActivePage = "home";
                    } else if (scrollPosition < viewHeight * 1.5) {
                        newActivePage = "about";
                    } else {
                        newActivePage = "portfolio";
                    }

                    // Only update if the page actually changed
                    setActivePage((prev) =>
                        prev !== newActivePage ? newActivePage : prev
                    );
                    ticking = false;
                });
                ticking = true;
            }
        };

        const unsubscribe = scrollYProgress.onChange(updateActivePage);
        return () => unsubscribe();
    }, [scrollYProgress]);

    // Memoize scroll function to prevent recreation
    const scrollToSection = useCallback(
        (target: "home" | "about" | "portfolio") => {
            setActivePage(target);

            let targetOffset = 0;
            const vh = window.innerHeight;

            switch (target) {
                case "home":
                    targetOffset = 0;
                    break;
                case "about":
                    targetOffset = vh;
                    break;
                case "portfolio":
                    targetOffset = vh * 2;
                    break;
            }

            window.scrollTo({
                top: targetOffset,
                behavior: "smooth",
            });
        },
        []
    );

    // Memoize social links to prevent recreation
    const socialLinks = useMemo(
        () => [
            {
                href: "https://linkedin.com/in/sagarshetty21",
                alt: "linkedin",
                src: "/assets/linkedin.png",
            },
            {
                href: "https://github.com/Sagar-Shetty21",
                alt: "github",
                src: "/assets/github.png",
            },
            {
                href: "mailto:dev.sagarshetty@gmail.com",
                alt: "email",
                src: "/assets/email.png",
            },
        ],
        []
    );

    return (
        <div ref={container} className="h-[300vh] relative">
            {isLoading && <LoadingScreen />}
            {/* Social Links Sidebar - Desktop */}
            <div className="hidden fixed left-16 bottom-0 md:flex flex-col gap-6 items-center z-50">
                {socialLinks.map((link) => (
                    <a
                        key={link.alt}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transform transition-transform duration-200 hover:scale-125"
                    >
                        <img
                            alt={link.alt}
                            src={link.src}
                            className="h-8 w-8"
                            loading="lazy"
                        />
                    </a>
                ))}
                <div className="w-1 h-56 bg-white rounded-full"></div>
            </div>

            {/* Email Sidebar - Desktop */}
            <a
                href="mailto:dev.sagarshetty@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden fixed right-16 bottom-0 md:flex flex-col gap-6 items-center translate-x-16 hover:scale-110 transition-transform duration-200 cursor-pointer z-50"
            >
                <div className="rotate-90 -translate-y-24 whitespace-nowrap">
                    dev.sagarshetty@gmail.com
                </div>
                <div className="w-1 h-80 bg-white rounded-full"></div>
            </a>

            {/* Header */}
            <header className="px-6 md:px-[15%] py-4 md:py-8 flex items-center justify-between fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
                <div className="font-bold text-xl md:text-2xl">
                    <span>{"<"}</span>
                    <span className="text-[#f13c58]">{"Sagar"}</span>
                    <span>{"/>"}</span>
                </div>

                <nav className="flex text-lg items-center gap-20 font-semibold">
                    <button
                        onClick={() => scrollToSection("home")}
                        className={`hidden md:block cursor-pointer transition-colors ${
                            activePage === "home" ? "text-[#f13c58]" : ""
                        }`}
                        aria-label="Navigate to Home section"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => scrollToSection("about")}
                        className={`hidden md:block cursor-pointer transition-colors ${
                            activePage === "about" ? "text-[#f13c58]" : ""
                        }`}
                        aria-label="Navigate to About section"
                    >
                        About
                    </button>
                    <button
                        onClick={() => scrollToSection("portfolio")}
                        className={`hidden md:block cursor-pointer transition-colors ${
                            activePage === "portfolio" ? "text-[#f13c58]" : ""
                        }`}
                        aria-label="Navigate to Portfolio section"
                    >
                        Portfolio
                    </button>
                    <a
                        href="mailto:dev.sagarshetty@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="px-4 md:px-6 py-1 border-2 text-sm md:text-lg bg-[#536c89] transition-colors hover:bg-[#455a73] active:bg-[#3d4f63]">
                            Let&apos;s Talk
                        </button>
                    </a>
                </nav>
            </header>

            <MobileNavbar
                activePage={activePage}
                scrollToSection={scrollToSection}
            />

            {/* Fullscreen Toggle - Mobile */}
            <button
                onClick={toggleFullScreen}
                className="fixed bottom-4 right-4 md:hidden p-2 bg-[#040f16] active:bg-gray-700 rounded-lg transition-colors z-50 m-2 touch-manipulation"
                aria-label={
                    isFullScreen ? "Exit fullscreen" : "Enter fullscreen"
                }
            >
                <img
                    src={
                        isFullScreen
                            ? "/assets/expand.png"
                            : "/assets/collapse.png"
                    }
                    className="h-5 w-5 invert-[50%]"
                    alt=""
                    loading="lazy"
                />
            </button>

            {/* Main Sections */}
            <HomeSection scrollYProgress={scrollYProgress} />
            <AboutSection scrollYProgress={scrollYProgress} />
            <PortfolioSection scrollYProgress={scrollYProgress} />
        </div>
    );
}
