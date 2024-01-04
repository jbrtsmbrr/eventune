import React from 'react'
import EventForm from './EventForm'

const page = () => {
  return (
    <div className='w-screen h-screen bg-[url(/assets/backgrounds/duncan-shaffer-0JTDHPIjkHc-unsplash.jpg)] bg-cover bg-center'>
      <div className='relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-fit backdrop-blur-[8px] p-4 form-event-shadow rounded-lg form-event-bg'>
        <EventForm />
      </div>
    </div>
  )
}

export default page