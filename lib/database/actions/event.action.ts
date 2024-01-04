"use server";

import { IEvent } from "@/lib/types/event";
import { connect } from "..";
import Event from "../models/event.model";

export const createEvent = async (event: IEvent) => {
  try {
    await connect();
    const newEvent = await Event.create(event);

    console.log(newEvent)

    return JSON.parse(JSON.stringify(newEvent))
  } catch {
    throw new Error("Something went wrong while creating event.")
  }
}