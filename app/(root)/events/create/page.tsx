import React from 'react'
import EventForm from './Form/EventForm'
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";

const page = () => {

  return (
    <React.Fragment>
      <SignedIn>
        <div className='w-screen h-screen bg-[url(/assets/backgrounds/duncan-shaffer-0JTDHPIjkHc-unsplash.jpg)] bg-cover bg-center'>
          <div className='relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-fit backdrop-blur-[8px] p-4 form-event-shadow rounded-lg form-event-bg'>
            <EventForm />
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </React.Fragment>
  )
}

export default page