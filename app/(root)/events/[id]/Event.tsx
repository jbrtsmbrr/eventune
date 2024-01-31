'use client'

import { Button } from '@/components/ui/button';
import { IEvent } from '@/lib/types/event';
import { useEffect, useRef, useState } from 'react'
import BandCard from './BandCard';
import { IArtistRaw } from '@/utils/spotify/Spotify';
import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from "@/lib/database/actions/order.action";
import Image from 'next/image';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Event = ({ event }: { event: IEvent }) => {
  const overlayElementRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (overlayElementRef.current) {
      overlayElementRef.current.style.backdropFilter = `blur(${(window.scrollY || 12) * 0.8}px)`
      overlayElementRef.current.style.backgroundColor = `rgba(18, 18, 18,${window.scrollY * 0.002})`
    }
    // setYOffset(window.scrollY)
  };


  useEffect(() => {
    if (overlayElementRef.current) {
      overlayElementRef.current.style.backdropFilter = `blur(${(window.scrollY || 12) * 0.8}px)`
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const onCheckout = async () => {
    const order = {
      eventTitle: event.name,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: "testuserid",
      imageUrl: event.imageUrl
    }

    await checkoutOrder(order);
  }

  return (
    <div>
      <div className='fixed top-0 left-0 h-full w-full'>

        {/* @ts-ignore */}
        <div style={{ "--event-image-url": `url(${event.imageUrl})` }} className={`absolute h-full w-full bg-[image:var(--event-image-url)] bg-cover bg-center bg-no-repeat`} />
        <div ref={overlayElementRef} className='absolute top-0 h-full w-full bg-opacity-10'>

        </div>
      </div>
      <div className='-translate-y-10 w-full'>
        <div className='h-screen xl:w-4/5 w-2/3 z-10 flex items-center mx-auto justify-center relative md:flex-row flex-col md:gap-8 py-8 box-border'>
          <div className='flex-1 relative h-2/3 w-full p-8'>
            <Image src={event.imageUrl} fill alt={event.imageUrl}
              objectFit='cover' className='h-full w-full' />
          </div>
          <div className="flex-1 h-2/3 w-full flex flex-col items-center justify-center gap-8 backdrop-blur-2xl p-8 border border-white border-opacity-20 bg-black bg-opacity-45">
            <p className="text-3xl md:text-5xl lg:text-7xl text-center text-white drop-shadow-md tracking-tighter font-extrabold">{event.name}</p>
            <form action={onCheckout} method="post">
              <Button className='text-sm py-6 px-8 text-black border-2 border-gray-100 bg-gray-100  hover:bg-gray-100 hover:bg-opacity-15 hover:text-gray-200  rounded-none transition-all duration-500 ease-in-out delay-150 uppercase tracking-widest font-extrabold'>Book Ticket</Button>
            </form>
          </div>
        </div>
        <div>
          <p className='text-white md:text-6xl text-5xl font-extrabold uppercase tracking-wide text-center my-12'>Who's performing?</p>
          <div className='relative xl:w-4/5 w-2/3 left-1/2 -translate-x-1/2 grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 min-h-[400px] h-fit gap-8'>
            {event?.artists?.map((artist) => {
              return <BandCard key={artist?._id} followers={artist?.spotifyData?.followers?.total} bandName={artist.spotifyData.name} images={artist.spotifyData.images} artistUrl={artist.spotifyData.external_urls.spotify} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Event