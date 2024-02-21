import BaseButton from '@/components/common/BaseButton'
import { Button } from '@/components/ui/button'
import { checkoutOrder } from '@/lib/database/actions/order.action'
import { IEvent } from '@/lib/types/event'
import { loadStripe } from '@stripe/stripe-js'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'

const EventBanner = ({ event }: { event: IEvent }) => {

  // Make sure to call `loadStripe` outside of a component’s render to avoid
  // recreating the `Stripe` object on every render.
  loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

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
    <div className='relative lg:grid md:grid-cols-8 min-h-4/5 w-full gap-6 flex flex-col'>
      <div className='relative xl:col-span-3 lg:col-span-4 lg:h-full lg:min-h-0 min-h-[250px] lg:aspect-auto md:aspect-square lg:block hidden'>
        <Image src={event.imageUrl} fill alt={event.imageUrl}
          objectFit='cover' className='h-full w-full' />
      </div>
      <div className='flex flex-col justify-between h-full col-span-4  py-4'>
        <div className='flex flex-col gap-10'>
          <div>
            <p className='text-white text-4xl font-semibold tracking-wider mb-3'>{event.name}</p>
            <p className='text-gray-300 text-md'>
              {/* {moment(event.startDate).format("DD MMMM YYYY,")}<br />
          {moment(event.startDate).format("dddd hh:MM A")} */}
              {moment(event.startDate).format("DD MMMM, ddd hh:mm A")}
            </p>
            <p className='text-gray-300 text-md'>{event.location}</p>
          </div>
          <div>
            <p className='font-bold uppercase text-gray-200'>about</p>
            <p className='text-gray-300 max-w-[45ch]'>{event.description} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est, sit soluta dolorem ratione ipsum culpa vero dignissimos delectus corporis earum corrupti explicabo similique cumque non id natus nostrum et at.</p>
          </div>
          <div className='flex items-center gap-6'>
            <div>
              <p className='text-white font-bold'>{Intl.NumberFormat("PH-ph", { currency: "PHP", style: "currency" }).format(event.price)}</p>
              <p className="text-gray-300">Standard</p>
            </div>
            <div>
              <p className='text-white font-bold'>{Intl.NumberFormat("PH-ph", { currency: "PHP", style: "currency" }).format(event.price + 300)}</p>
              <p className="text-gray-300">VIP</p>
            </div>
          </div>
        </div>
        <form action={onCheckout} method="post" className='relative flex gap-4 items-center justify-center w-fit'>
          {/* <Button className='group mt-6 uppercase font-serif px-4 py-2 shadow-lg bg-white border-2 border-white hover:bg-opacity-100 hover:text-white transition-all duration-500 text-sm text-black rounded-none ease-in-out delay-150 tracking-widest'>
            <span className="block md:group-hover:translate-y-5 duration-0">Book Ticket</span>
          </Button> */}
          <BaseButton className='mt-6'>Book Ticket</BaseButton>
        </form>
      </div>
      {/* <div className="flex-1 h-2/3 w-full flex flex-col items-center justify-center gap-8 backdrop-blur-2xl p-8 border border-white border-opacity-20 bg-black bg-opacity-45">
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
      </div> */}
    </div>
  )
}

export default EventBanner