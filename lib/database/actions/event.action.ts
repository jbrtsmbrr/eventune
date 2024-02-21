"use server";

import { IEventCreateParams } from "@/lib/types/event";
import { connect } from "..";
import Event from "../models/event.model";
import User from "../models/user.model";
import ArtistEvent from "../models/event_artist.model";
import { IEventProps } from "@/app/(root)/events/page";
import moment from "moment";

const saveArtists = async (artist: any) => {
  return ArtistEvent.create(artist);
}

export const createEvent = async (event: IEventCreateParams) => {
  try {
    await connect();
    const { artists, ...eventData } = event;
    const newEvent = new Event({
      ...eventData,
      startDate: new Date(eventData.startDate),
      endDate: new Date(eventData.endDate)
    });

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

interface IGetAllEvents {
  limit?: number,
  dateRange?: {
    from: string,
    to: string
  } | null
}

export const getAllEvents = async ({ limit = 0, dateRange = undefined }: IGetAllEvents) => {
  let filterQueries: Record<any, any> = {}
  if (dateRange) {
    filterQueries.$and = [
      { startDate: { $gte: moment(`${dateRange.from} 00:00:00`).toISOString() } },
      { endDate: { $lte: moment(`${dateRange.to} 23:59:59`).toISOString() } },
    ]

    // filterQueries = {
    //   startDate: { $gte: new Date(dateRange.from) },
    //   endDate: { $lt: new Date(dateRange.to) }
    // }
  }

  console.log(filterQueries)

  try {
    await connect();
    const events = await Event.find(filterQueries)
      .sort({ modifiedAt: 'desc' })
      .limit(limit)
      .populate({ path: "organizer", model: User, select: "_id firstName lastName" });

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