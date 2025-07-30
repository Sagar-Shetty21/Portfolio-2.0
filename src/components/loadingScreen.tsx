const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 bg-[#0a192f] flex items-center justify-center z-[99999] overflow-hidden">
            {/* Subtle background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#f13c58]/5 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#f13c58]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(241,60,88,0.3) 1px, transparent 0)`,
                        backgroundSize: "40px 40px",
                    }}
                ></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 text-center">
                {/* Logo with glow */}
                <div className="mb-8 relative">
                    <div className="font-bold text-4xl md:text-6xl">
                        <span className="text-white">{"<"}</span>
                        <span className="text-[#f13c58] drop-shadow-lg">
                            {"Sagar"}
                        </span>
                        <span className="text-white">{"/>"}</span>
                    </div>

                    {/* Glowing line underneath */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-[#f13c58] opacity-60 animate-pulse"></div>
                </div>

                {/* Loading animation */}
                <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="w-2 h-2 bg-[#f13c58] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#f13c58] rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-[#f13c58] rounded-full animate-bounce delay-200"></div>
                </div>

                {/* Loading text */}
                <p className="text-white/60 text-sm tracking-wider animate-pulse">
                    Loading Portfolio...
                </p>

                {/* Progress indicator */}
                <div className="mt-6 w-32 mx-auto">
                    <div className="h-0.5 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-[#f13c58] rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/5 w-1 h-1 bg-[#f13c58]/40 rounded-full animate-ping delay-0"></div>
                <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-ping delay-700"></div>
                <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-[#f13c58]/50 rounded-full animate-ping delay-300"></div>
                <div className="absolute bottom-1/4 right-1/5 w-1 h-1 bg-white/40 rounded-full animate-ping delay-1000"></div>
            </div>

            {/* Corner brackets for tech aesthetic */}
            <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-[#f13c58]/30"></div>
            <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-[#f13c58]/30"></div>
            <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-[#f13c58]/30"></div>
            <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-[#f13c58]/30"></div>
        </div>
    );
};

export default LoadingScreen;
