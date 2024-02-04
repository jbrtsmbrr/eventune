'use client'

import { IEvent } from '@/lib/types/event';
import React, { useEffect, useRef } from 'react'
import BandCard from './BandCard';
import EventBanner from './EventBanner';
// import { IArtistRaw } from '@/utils/spotify/Spotify';
// import { loadStripe } from '@stripe/stripe-js';
// import { checkoutOrder } from "@/lib/database/actions/order.action";
// import Image from 'next/image';
// import moment from 'moment';

const Event = ({ event }: { event: IEvent }) => {
  const overlayElementRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (overlayElementRef.current) {
      overlayElementRef.current.style.backdropFilter = `blur(${(window.scrollY > 12 ? window.scrollY : 12) * 1}px)`
      overlayElementRef.current.style.backgroundColor = `rgba(18, 18, 18,${window.scrollY * 0.002})`
    }
    // setYOffset(window.scrollY)
  };


  useEffect(() => {
    if (overlayElementRef.current) {
      overlayElementRef.current.style.backdropFilter = `blur(${(window.scrollY > 12 ? window.scrollY : 12) * 1}px)`
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])

  // useEffect(() => {
  //   // Check to see if this is a redirect back from Checkout
  //   const query = new URLSearchParams(window.location.search);
  //   if (query.get('success')) {
  //     console.log('Order placed! You will receive an email confirmation.');
  //   }

  //   if (query.get('canceled')) {
  //     console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
  //   }
  // }, []);

  return (
    <React.Fragment>
      <div className='fixed top-0 left-0 h-screen w-screen'>

        {/* @ts-ignore */}
        <div style={{ "--event-image-url": `url(${event.imageUrl})` }} className={`absolute h-full w-screen bg-[image:var(--event-image-url)] bg-cover bg-center bg-no-repeat grayscale`} />
        {/* <div className='absolute h-full w-screen banner'></div> */}
        <div ref={overlayElementRef} className='absolute top-0 h-full w-full bg-opacity-5 banner'>

        </div>
      </div>
      <div className='relative xl:w-4/5 w-2/3 mx-auto'>
        <div className='relative h-[calc(100vh/1.8)] top-[61px] flex items-center w-full'>
          <EventBanner event={event} />
        </div>
        {/* <div className='md:-translate-y-32'> */}
        <div className='relative left-1/2 -translate-x-1/2 top-[61px]'>
          <p className='text-white md:text-2xl text-5xl font-extrabold uppercase tracking-wide font-serif my-4 italic'>Who's performing?</p>
          <div className='grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 min-h-[400px] h-fit gap-4'>
            {event?.artists?.map((artist) => {
              return <BandCard key={artist?._id} followers={artist?.spotifyData?.followers?.total} bandName={artist.spotifyData.name} images={artist.spotifyData.images} artistUrl={artist.spotifyData.external_urls.spotify} />
            })}
          </div>
        </div>
        {/* </div> */}
      </div>
    </React.Fragment>
  )
}

export default Event