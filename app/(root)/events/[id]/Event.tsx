'use client'

import { Button } from '@/components/ui/button';
import { IEvent } from '@/lib/types/event';
import { useEffect, useRef, useState } from 'react'
import BandCard from './BandCard';
import { IArtistRaw } from '@/utils/spotify/Spotify';
import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from "@/lib/database/actions/order.action";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Event = ({ event }: { event: IEvent }) => {
  const overlayElementRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (overlayElementRef.current) {
      overlayElementRef.current.style.backdropFilter = `blur(${window.scrollY * 0.4}px)`
      overlayElementRef.current.style.backgroundColor = `rgba(18, 18, 18,${window.scrollY * 0.002})`
    }
    // setYOffset(window.scrollY)
  };


  useEffect(() => {
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
      <div className='fixed top-0 left-0 h-screen w-full'>

        {/* @ts-ignore */}
        <div style={{ "--event-image-url": `url(${event.imageUrl})` }} className={`absolute h-full w-full bg-[image:var(--event-image-url)] bg-cover bg-center bg-no-repeat`} />
        <div ref={overlayElementRef} className='absolute top-0 h-full w-full bg-opacity-10'>

        </div>
      </div>
      <div className='-translate-y-10 w-full'>
        <div className='h-screen w-2/3 z-10 flex items-center mx-auto justify-center'>
          <div className='flex-1'>
            left side
          </div>
          <div className="flex-1 h-1/2 flex flex-col items-center justify-center gap-8 backdrop-blur-md p-8 border border-white border-opacity-20 rounded-md">
            <p className=" text-3xl md:text-5xl lg:text-6xl text-center text-white font-bold">{event.name}</p>
            <form action={onCheckout} method="post">
              <Button className='text-lg py-6 px-8 border bg-purple-950/50 hover:bg-purple-950/80 rounded-none transition-all duration-500 ease-in-out delay-200'>Book Ticket</Button>
            </form>
          </div>
        </div>
        <div className='relative w-2/3 left-1/2 -translate-x-1/2 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 min-h-[400px] h-fit gap-8'>
          {event?.artists?.map((artist) => {
            return <BandCard key={artist?._id} followers={artist?.spotifyData?.followers?.total} bandName={artist.spotifyData.name} images={artist.spotifyData.images} artistUrl={artist.spotifyData.external_urls.spotify} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Event