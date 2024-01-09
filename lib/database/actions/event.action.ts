"use server";

import { IEvent, IEventCreateParams } from "@/lib/types/event";
import { connect } from "..";
import Event from "../models/event.model";
import User from "../models/user.model";

export const createEvent = async (event: IEventCreateParams) => {
  try {
    await connect();
    const newEvent = await Event.create(event);

    return JSON.parse(JSON.stringify(newEvent))
  } catch {
    throw new Error("Something went wrong while creating event.")
  }
}

export const getAllEvents = async () => {
  try {
    await connect();
    const events = await Event.find().sort({ modifiedAt: 'desc' }).populate({ path: "organizer", model: User, select: "_id firstName lastName" });

    // console.log(events)

    return JSON.parse(JSON.stringify(events))
  } catch (err) {
    console.log(err)
  }
}

export const getEventById = async (id: string) => {
  try {
    await connect();
    const event = await Event.findById(id);

    return JSON.parse(JSON.stringify(event))
  } catch {
    throw new Error(`Something went wrong while fetching event!`)
  }
}