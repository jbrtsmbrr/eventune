import { getEventById } from '@/lib/database/actions/event.action'
import React from 'react'
import Event from './Event'

interface IEventPageProps {
  params: { id: string },
  searchParams: Record<string, any>
}

const EventPage = async ({ params } : IEventPageProps) => {
  const event = await getEventById(params.id)

  console.log(event)
  return (
    <div>
      <Event event={event} />
    </div>
  )
}

export default EventPage