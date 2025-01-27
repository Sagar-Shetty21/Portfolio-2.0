import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden flex flex-col relative">
      <div className="absolute left-16 bottom-0 flex flex-col gap-6 items-center">
        <Image alt="linkedin" src="/assets/linkedin.png" className="h-8 w-8"/>
        <Image alt="github" src="/assets/github.png" className="h-8 w-8"/>
        <Image alt="email" src="/assets/email.png" className="h-8 w-8"/>
        <div className="w-1 h-56 bg-white rounded-full"></div>
      </div>
      <div className="absolute right-16 bottom-0 flex flex-col gap-6 items-center translate-x-16 hover:scale-110 transition-all cursor-pointer">
        <div className="rotate-90 -translate-y-24">dev.sagarshetty@gmail.com</div>
        <div className="w-1 h-80 bg-white rounded-full"></div>
      </div>
      <section className="md:px-[15%] py-8 flex items-center justify-between">
        <div className="font-bold text-2xl "><span>{"<"}</span><span className="text-[#f13c58]">{"Sagar"}</span><span>{"/>"}</span></div>
        <div className="flex text-lg items-center gap-20 font-semibold">
          <div className="cursor-pointer">Home</div>
          <div className="cursor-pointer">About</div>
          <div className="cursor-pointer">Portfolio</div>
          <button className="px-6 py-1 border-2 bg-[#536c89]">Let's Talk</button>
        </div>
      </section>
      <section className="grid grid-cols-2 flex-grow md:px-[15%]">
        <div className="flex flex-col items-start justify-center">
          <div>
            <p className="text-[24px] font-semibold">Hi There</p>
            <h1 className="text-[68px] font-bold">I&apos;m <span className="text-[#f13c58]">Sagar Shetty</span></h1>
            <h2 className="text-[48px]">I am a Web Developer</h2>
          </div>
          <div className="flex items-center gap-12 py-12">
            <button className="px-12 py-3 text-2xl font-semibold bg-[#f13c58] rounded-lg">Resume</button>
            <button className="px-12 py-3 text-2xl font-semibold bg-[#52648c] rounded-lg">Contact Me</button>
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
          <image alt="person illustration" src="/assets/person-illustration.png" className="w-[80%] object-cover opacity-90" />
        </div>
      </section>
    </div>
  );
}
