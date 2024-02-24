"use client"

import * as z from "zod"

export const ArtistSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  artistSpotifyId: z.string()
})

const PriceSchema = z.object({
  label: z.string().min(3, "Please enter a label").max(45),
  amount: z.number().min(0).max(1_000_000_000)
}).strict()

export const EventSchemaValidator = z.object({
  name: z.string().min(3).max(200),
  description: z.string().max(300).optional(),
  startDate: z.date(),
  endDate: z.date(),
  imageUrl: z.string().url(),
  location: z.string().min(1, "Please enter a location").max(200),
  // price: z.number().min(0),
  isFree: z.boolean().default(false),
  organizer: z.string(),
  artists: z.array(ArtistSchema).min(1),
  pricing: z.array(PriceSchema).nonempty()
});
