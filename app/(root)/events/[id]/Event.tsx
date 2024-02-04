'use client'

import { Button } from '@/components/ui/button';
import { IEvent } from '@/lib/types/event';
import { useEffect, useRef, useState } from 'react'
import BandCard from './BandCard';
import { IArtistRaw } from '@/utils/spotify/Spotify';
import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from "@/lib/database/actions/order.action";
import Image from 'next/image';
import moment from 'moment';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Event = ({ event }: { event: IEvent }) => {
  const overlayElementRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (overlayElementRef.current) {
      overlayElementRef.current.style.backdropFilter = `blur(${(window.scrollY > 12 ? window.scrollY : 12) * 8}px)`
      overlayElementRef.current.style.backgroundColor = `rgba(18, 18, 18,${window.scrollY * 0.002})`
    }
    // setYOffset(window.scrollY)
  };


  useEffect(() => {
    if (overlayElementRef.current) {
      overlayElementRef.current.style.backdropFilter = `blur(${(window.scrollY > 12 ? window.scrollY : 12) * 8}px)`
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
      <div className='w-full relative top-[61px]'>
        <div className='md:h-screen h-fit xl:w-4/5 w-2/3 flex items-center mx-auto justify-center relative md:flex-row flex-col lg:gap-4'>
          <div className='flex-1 relative h-2/3 w-full p-8 hidden md:block'>
            <Image src={event.imageUrl} fill alt={event.imageUrl}
              objectFit='cover' className='h-full w-full' />
          </div>
          <div className="flex-1 h-2/3 w-full flex flex-col items-center justify-center gap-8 backdrop-blur-2xl p-8 border border-white border-opacity-20 bg-black bg-opacity-45">
            <div className='md:hidden h-[300px] w-full relative shadow-lg'>
              <Image src={event.imageUrl} fill alt={event.imageUrl}
                objectFit='cover' className='absolute h-full w-full rounded-md' />
            </div>
            <div>
              <p className="text-4xl md:text-5xl lg:text-6xl text-center text-white drop-shadow-md tracking-tighter font-extrabold">
                {event.name}
              </p>
            </div>
            <div>
              <p className='text-white font-bold text-center'>{moment(event.startDate).format("DD MMMM, hh:MM A")}</p>
              <p className='text-gray-400 text-center'>{event.location}</p>
            </div>
            <div className='flex gap-4 items-stretch justify-center w-full'>
              <div className='flex-1 border border-dashed border-gray-200 hover:border-gray-300 p-3 px-4 bg-white bg-opacity-15 cursor-pointer'>
                <p className='font-bold text-white'>{Intl.NumberFormat("PH-ph", { currency: "PHP", style: "currency" }).format(event.price)}</p>
                <p className='font-semibold text-gray-300 uppercase text-sm'>Standard price</p>
              </div>
              <div className='flex-1 border border-dashed border-gray-500 hover:border-gray-300 p-3 px-4 bg-gray-50 bg-opacity-5 cursor-pointer'>
                <p className='font-bold text-white'>{Intl.NumberFormat("PH-ph", { currency: "PHP", style: "currency" }).format(event.price + 300)}</p>
                <p className='font-semibold text-gray-300 uppercase text-sm'>VIP price</p>
              </div>
            </div>
            <form action={onCheckout} method="post" className='flex gap-4 items-center justify-center w-full'>
              {/* <div>
                <p className='font-bold text-white'>PHP 100.00</p>
                <p className='font-semibold text-gray-300 uppercase text-sm'>Standard price</p>
              </div> */}
              <Button className='text-sm py-6 px-8 text-black border-2 border-gray-100 bg-gray-100  hover:bg-gray-100 hover:bg-opacity-15 hover:text-gray-200  rounded-none transition-all duration-500 ease-in-out delay-150 uppercase tracking-widest font-extrabold lg:w-auto w-full'>Book Ticket</Button>
            </form>
          </div>
        </div>
        <div className='md:-translate-y-32'>
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