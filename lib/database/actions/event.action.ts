"use server";

import { IEventCreateParams } from "@/lib/types/event";
import { connect } from "..";
import Event from "../models/event.model";
import User from "../models/user.model";
import ArtistEvent from "../models/event_artist.model";

const saveArtists = async (artist: any) => {
  return ArtistEvent.create(artist);
}

export const createEvent = async (event: IEventCreateParams) => {
  try {
    await connect();
    const { artists, ...eventData } = event;
    const newEvent = new Event(eventData);

    if (newEvent) {
      const savedArtistsPromises = artists.map(artist => saveArtists({
        eventId: newEvent._id,
        artistSpotifyId: artist.artistSpotifyId,
        name: artist.name
      }))

      const savedArtists = await Promise.all(savedArtistsPromises);
      savedArtists.forEach(artist => {
        newEvent.artists.push(artist._id)
      })
      await newEvent.save();
    }

    return JSON.parse(JSON.stringify(newEvent))
  } catch {
    throw new Error("Something went wrong while creating event.")
  }
}

export const getAllEvents = async ({ limit = 0 } = {}) => {
  try {
    await connect();
    const events = await Event.find().sort({ modifiedAt: 'desc' }).limit(limit).populate({ path: "organizer", model: User, select: "_id firstName lastName" });

    // console.log(events)

    return JSON.parse(JSON.stringify(events))
  } catch (err) {
    console.log(err)
  }
}

export const getEventById = async (id: string) => {
  try {
    await connect();
    const event = await Event.findById(id).populate({ path: "artists", model: ArtistEvent, select: "_id name artistSpotifyId" });

    return JSON.parse(JSON.stringify(event))
  } catch {
    throw new Error(`Something went wrong while fetching event!`)
  }
}