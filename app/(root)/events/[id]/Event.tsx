'use client'

import { IEvent } from '@/lib/types/event';
import { useEffect, useState } from 'react'

const Event = ({ event }: { event: IEvent }) => {
  const [yOffset, setYOffset] = useState(0);

  const handleScroll = () => {
    setYOffset(window.scrollY)
  };


  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])

  return (
    <div>
      <div className='sticky top-0 left-0 h-screen w-full '>
        {/* @ts-ignore */}
        <div style={{ "--event-image-url": `url(${event.imageUrl})` }} className={`absolute h-full w-full bg-[image:var(--event-image-url)] bg-cover bg-center bg-no-repeat`} />
        <div style={{ backdropFilter: `blur(${yOffset * 0.04}px)`, backgroundColor: `rgba(36, 16, 44,${yOffset * 0.0008})` }} className='absolute top-0 h-full w-full bg-purple-700 bg-opacity-10'>

        </div>
      </div>
      <div className='relative w-2/3 left-1/2 -translate-x-1/2 -translate-y-20 grid lg:grid-cols-4 md:grid-cols-2 min-h-[400px] h-fit gap-8'>
        <div className='relative h-full group overflow-hidden min-h-[400px] rounded-sm'>
          <div className='relative h-full bg-[url(/assets/images/artists/german-lopez-sP45Es070zI-unsplash.jpg)] bg-cover bg-center bg-no-repeat' />
          <div className='transition-all duration-500 ease-in-out absolute top-0 w-full h-full bg-gradient-to-t from-purple-950 z-10 translate-y-[20%] group-hover:translate-y-0'></div>
          <div className='absolute bottom-0 h-fit w-full flex flex-col justify-center items-center text-center gap-2 z-10 translate-y-10 group-hover:-translate-y-10 transition-transform duration-500 ease-in-out'>
            <p className='text-sm font-semibold text-purple-400 drop-shadow-xl'>15 November, 2024</p>
            <span className='h-[3px] w-[80px] bg-white'></span>
            <p className='text-xl font-bold text-purple-100 mt-2'>City of Birmingham Symphony Orchestra</p>
            <button className='mt-8 text-sm border-purple-300 border py-2 px-4 text-purple-100 hover:bg-purple-400 hover:bg-opacity-20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out delay-200'>Book Ticket</button>
          </div>
        </div>

        <div className='relative h-full group overflow-hidden min-h-[400px] rounded-sm'>
          <div className='relative h-full bg-[url(/assets/images/artists/maxwell-hunt-0fh1QNs8KF0-unsplash.jpg)] bg-cover bg-center bg-no-repeat' />

          <div className='transition-all duration-500 ease-in-out absolute top-0 w-full h-full bg-gradient-to-t from-purple-950 z-10 translate-y-[20%] group-hover:translate-y-0'></div>
          <div className='absolute bottom-0 h-fit w-full flex flex-col justify-center items-center text-center gap-2 z-10 translate-y-10 group-hover:-translate-y-10 transition-transform duration-500 ease-in-out'>
            <p className='text-sm font-semibold text-purple-400 drop-shadow-xl'>15 November, 2024</p>
            <span className='h-[3px] w-[80px] bg-white'></span>
            <p className='text-xl font-bold text-purple-100 mt-2'>City of Birmingham Symphony Orchestra</p>

            <button className='mt-8 text-sm border-purple-300 border py-2 px-4 text-purple-100 hover:bg-purple-400 hover:bg-opacity-20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out delay-200'>Book Ticket</button>
          </div>

        </div>

        <div className='relative h-full group overflow-hidden min-h-[400px] rounded-sm'>
          <div className='relative h-full bg-[url(/assets/images/artists/douglas-bagg-zkqIRTLon4Q-unsplash.jpg)] bg-cover bg-center bg-no-repeat' />

          <div className='transition-all duration-500 ease-in-out absolute top-0 w-full h-full bg-gradient-to-t from-purple-950 z-10 translate-y-[20%] group-hover:translate-y-0'></div>
          <div className='absolute bottom-0 h-fit w-full flex flex-col justify-center items-center text-center gap-2 z-10 translate-y-10 group-hover:-translate-y-10 transition-transform duration-500 ease-in-out'>
            <p className='text-sm font-semibold text-purple-400 drop-shadow-xl'>15 November, 2024</p>
            <span className='h-[3px] w-[80px] bg-white'></span>
            <p className='text-xl font-bold text-purple-100 mt-2'>City of Birmingham Symphony Orchestra</p>

            <button className='mt-8 text-sm border-purple-300 border py-2 px-4 text-purple-100 hover:bg-purple-400 hover:bg-opacity-20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out delay-200'>Book Ticket</button>
          </div>
        </div>

        <div className='relative h-full group overflow-hidden min-h-[400px] rounded-sm'>
          <div className='relative h-full bg-[url(/assets/images/artists/tamara-gore-gr-0oDn91cE-unsplash.jpg)] bg-cover bg-center bg-no-repeat' />

          <div className='transition-all duration-500 ease-in-out absolute top-0 w-full h-full bg-gradient-to-t from-purple-950 z-10 translate-y-[20%] group-hover:translate-y-0'></div>
          <div className='absolute bottom-0 h-fit w-full flex flex-col justify-center items-center text-center gap-2 z-10 translate-y-10 group-hover:-translate-y-10 transition-transform duration-500 ease-in-out'>
            <p className='text-sm font-semibold text-purple-400 drop-shadow-xl'>15 November, 2024</p>
            <span className='h-[3px] w-[80px] bg-white'></span>
            <p className='text-xl font-bold text-purple-100 mt-2'>City of Birmingham Symphony Orchestra</p>

            <button className='mt-8 text-sm border-purple-300 border py-2 px-4 text-purple-100 hover:bg-purple-400 hover:bg-opacity-20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out delay-200'>Book Ticket</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Event