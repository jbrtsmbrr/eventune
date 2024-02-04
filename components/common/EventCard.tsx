import { IEvent } from '@/lib/types/event'
import Image from 'next/image'
import React from 'react'
import moment from "moment"
import Link from 'next/link'

const EventCard = ({ event }: { event: IEvent }) => {

  return (
    <div className='bg-[#101010] group p-3 min-h-[380px] shadow-lg rounded-sm space-y-3 flex flex-col'>
      <div className='relative overflow-hidden rounded-sm shadow-2xl flex-1 max-h-[200px]'>
        <Image alt="event-image" src={event.imageUrl} width={500} height={500} className='w-full h-full object-cover group-hover:scale-125 transition-all duration-500 ease-in-out' />
        <div className='absolute top-0 bg-purple-900/15 h-full w-full'></div>
      </div>
      <div className='text-gray-100'>
        <Link href={`/events/${event._id}`}>
          <p className='text-lg font-semibold leading-6 tracking-wide group-hover:underline underline-offset-4 group-hover:text-purple-500'>{event.name}</p>
        </Link>
        <p className='text-gray-400 font-semibold text-sm tracking-wide'>Organizer: {event?.organizer?.firstName} {' '}  {event?.organizer?.lastName}</p>
      </div>
      <div className='space-y-3 text-gray-300'>
        <div className='flex items-center gap-2'>
          <Image alt="calendar-image" src="/assets/icons/icons8-calendar-50-outlined (1).png" width={18} height={18} />
          <p className="text-xs">{moment(new Date(event.startDate)).format("LLLL")}</p>
        </div>
        <div className='flex items-center gap-2'>
          <Image alt="calendar-image" src="/assets/icons/icons8-location-50-outlined (1).png" width={18} height={18} />
          <p className="text-xs">{event.location}</p>
        </div>
        <div className='flex items-center gap-2'>
          <Image alt="calendar-image" src="/assets/icons/icons8-ticket-50-outlined (1).png" width={18} height={18} />
          <p className="text-xs">{event.isFree ? "FREE" : `${new Intl.NumberFormat("ph-PH", {
            style: "currency",
            currency: "PHP"
          }).format(event.price)}`}</p>
        </div>
      </div>
    </div>
  )
}

export default EventCard