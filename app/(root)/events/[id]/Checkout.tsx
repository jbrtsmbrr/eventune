import BaseButton from '@/components/common/BaseButton'
import { checkoutOrder } from '@/lib/database/actions/order.action'
import { IEvent, Price } from '@/lib/types/event'
import React, { useState } from 'react'

const Checkout = ({ event }: { event: IEvent }) => {
  const [ticketPrice, setTicketPrice] = useState(() => event.pricing[0]);
  const onCheckout = async () => {
    const order = {
      eventTitle: event.name,
      eventId: event._id,
      price: ticketPrice.amount,
      ticketType: ticketPrice.label,
      isFree: event.isFree,
      buyerId: "testuserid",
      imageUrl: event.imageUrl
    }

    await checkoutOrder(order);
  }

  const handleTicketChange = (item: Price) => {
    setTicketPrice(item)
  }

  return (
    <React.Fragment>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 md:gap-2 gap-2 xl:w-4/5 lg:w-full md:w-2/3'>
        {event.pricing.map(price => {
          const isSelected = ticketPrice.label === price.label;
          return <button
            key={`pricing---${price.label}`}
            onClick={() => handleTicketChange(price)}
            className={`text-left transition-all duration-300 ease-in-out bg-white/5 py-2 px-4 min-w-[135px] border border-white/10 cursor-pointer hover:border-white/30 ${isSelected ? '!border-white/80 !bg-white/15' : ''}`}
          >
            <p className='text-white font-bold tracking-wide'>{Intl.NumberFormat("PH-ph", { currency: "PHP", style: "currency" }).format(price.amount)}</p>
            <p className="text-gray-300">{price.label}</p>
          </button>
        })}
      </div>
      <form action={onCheckout} method="post" className='relative flex gap-4 items-center justify-center w-fit'>
        <BaseButton className='mt-6'>Book Ticket</BaseButton>
      </form>
    </React.Fragment>
  )
}

export default Checkout