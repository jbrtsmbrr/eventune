"use client"

import Image from "next/image";
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
    <div ref={overlayElementRef} style={{
      background: 'url(assets/backgrounds/moshed-5-tyler-quick-CRIFa4B1Ozk-unsplash.jpg)',
      height: "100vh",
      backgroundPosition: `35% calc(51% - ${0 * 0.55}px)`,
      backgroundRepeat: "no-repeat",
      position: "relative",
      backgroundSize: "cover"
    }}>
      <div className="absolute h-full w-full bg-purple-950 bg-opacity-15"></div>
      <div className="absolute w-full top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] p-8 box-border flex items-center flex-col gap-8">
        <h1 className="text-7xl font-extrabold text-center uppercase">
          Don't miss the gigs!
        </h1>
        <div className="p-5 px-8 flex gap-4 rounded-full outline-none focus-within:ring-2 ring-gray-800 shadow-lg bg-white w-1/2 bg-opacity-70">
          <Image alt="searc-icon" src="/assets/icons/icons8-search.svg" width={25} height={25} />
          <input type="text" placeholder="Look for event" className="outline-none bg-transparent w-full"></input>
        </div>
      </div>
    </div>
  )
}

export default Banner