import { z } from "zod";
import { IUser } from "../database/models/user.model";
import { ArtistSchema } from "../validator";
import { IArtistRaw } from "@/utils/spotify/Spotify";

export interface IEvent {
  _id?: string,
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  imageUrl: string;
  location: string;
  price: number;
  isFree: boolean;
  modifiedAt: Date,
  organizer: IUser,
  artists?: Array<{
    spotifyData: IArtistRaw
  } & z.infer<typeof ArtistSchema>>
}

export interface IEventCreateParams {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  imageUrl: string;
  location: string;
  price: number;
  isFree: boolean;
  organizer: string;
  artists: Array<z.infer<typeof ArtistSchema>>
}