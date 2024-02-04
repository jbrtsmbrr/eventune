import { getEventById } from '@/lib/database/actions/event.action'
import React from 'react'
import Event from './Event'
import Spotify from '@/utils/spotify/Spotify'

interface IEventPageProps {
  params: { id: string },
  searchParams: Record<string, any>
}

const EventPage = async ({ params }: IEventPageProps) => {
  const spotifyInstance = await (new Spotify().initializeAccessToken());
  // await spotifyInstance.initializeAccessToken();
  const event = await getEventById(params.id);

  for (let artistIndex in event.artists) {
    const currentArtist = event.artists[artistIndex];
    const data = await spotifyInstance.getArtistById(currentArtist.artistSpotifyId);
    // console.log(data)
    currentArtist.spotifyData = data
  }

  // console.log(event)
  return (
    <Event event={event} />
  )
}

export default EventPage