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
      backgroundSize: "cover"
    }}>
      {/* <div className="absolute h-full w-full bg-purple-950 bg-opacity-15"></div> */}
      <div className="z-10 absolute w-full top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] p-8 box-border flex items-center flex-col gap-8">
        <div className="lg:w-1/3 md:w-1/2 flex flex-col md:items-center md:text-center z-50">
          <p className="text-7xl text-white uppercase font-extrabold tracking-tight mb-2">
            Welcome to Eventune
          </p>
          <p className="text-gray-300 italic uppercase">
            Never miss another music festival!
          </p>
          <Link href="/events">
            <button className="group mt-6 uppercase pl-7 pr-2 py-2 shadow-lg bg-white/15 border-2 border-white hover:bg-black hover:bg-opacity-5 hover:text-gray-200 transition-all duration-500 font-bold tracking-wider rounded-full flex items-center gap-4 w-fit">
              <span className="text-white tracking-widest">Get a ticket</span>
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