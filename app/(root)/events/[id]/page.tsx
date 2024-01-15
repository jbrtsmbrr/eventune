import { getEventById } from '@/lib/database/actions/event.action'
import React from 'react'
import Event from './Event'
import Spotify from '@/utils/spotify/Spotify'

interface IEventPageProps {
  params: { id: string },
  searchParams: Record<string, any>
}

const EventPage = async ({ params } : IEventPageProps) => {
  const spotifyInstance = new Spotify();
  const event = await getEventById(params.id);

  for (let artistIndex in event.artists) {
    const currentArtist = event.artists[artistIndex];
    const data = await spotifyInstance.getArtistById(currentArtist.artistSpotifyId); 
    currentArtist.spotifyData = data
  }

  console.log(event)
  return (
    <div>
      <Event event={event} />
    </div>
  )
}

export default EventPage