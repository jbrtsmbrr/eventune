"use client"

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const Banner = () => {
  const overlayElementRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (overlayElementRef.current) {
      overlayElementRef.current.style.backgroundPosition = `35% calc(51% - ${window.scrollY * 0.55}px)`;
    }
  };


  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])

  return (
    <div className="banner" ref={overlayElementRef} style={{
      background: 'url(/assets/backgrounds/tyler-quick-CRIFa4B1Ozk-unsplash.jpg)',
      height: "100vh",
      backgroundPosition: `35% calc(51% - ${0 * 0.55}px)`,
      backgroundRepeat: "no-repeat",
      position: "relative",
      backgroundSize: "cover",
      // clipPath: 'polygon(100% 0, 100% 94%, 86% 100%, 71% 94%, 52% 100%, 29% 97%, 10% 100%, 0 95%, 0 0)'
    }}>
      {/* <div className="absolute h-full w-full bg-purple-950 bg-opacity-15"></div> */}
      <div className="z-10 absolute w-full top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] p-8 box-border flex items-center flex-col gap-8">
        <div className="group lg:w-1/2 md:w-full flex flex-col md:items-center md:text-center z-50">
          {/* <div> */}
            <p className="md:text-6xl text-5xl leading-7 text-gray-100 uppercase font-extrabold mb-2">
              Welcome to
            </p>
            <p className="md:text-6xl text-5xl text-gray-100 uppercase font-extrabold mb-2 flex">
              Eventune
            </p>
          {/* </div> */}
          <p className="text-gray-300 italic uppercase ">
            Never miss another music festival!
          </p>
          <Link href="/events" className="w-fit">
            <button className="group mt-6 uppercase md:pl-7 pl-4 md:pr-2 pr-1 md:py-2 py-1 shadow-lg bg-white/15 border-2 border-white hover:bg-black hover:bg-opacity-5 hover:text-gray-200 transition-all duration-500 font-bold tracking-wider rounded-full flex items-center gap-4">
              <span className="text-white tracking-widest md:text-lg text-xs">Get a ticket</span>
              <span className="p-3 flex items-center justify-center bg-white rounded-full">
                <ArrowUpRight color="black" size={20} className="group-hover:scale-125 transform ease-in-out duration-150" />
              </span>
            </button>
          </Link>
        </div>
        {/* <h1 className="relative font-sans banner-content text-8xl font-extrabold text-left uppercase text-white w-[400px] min-h-[400px] p-4 bg-gray-900 bg-opacity-50">
          Don't miss the gigs!
        </h1> */}
        {/* <div className="p-5 px-8 flex gap-4 rounded-full outline-none focus-within:ring-2 ring-gray-800 shadow-lg bg-white w-1/2 bg-opacity-70">
          <Image alt="searc-icon" src="/assets/icons/icons8-search.svg" width={25} height={25} />
          <input type="text" placeholder="Look for event" className="outline-none bg-transparent w-full"></input>
        </div> */}
      </div>
    </div>
  )
}

export default Banner