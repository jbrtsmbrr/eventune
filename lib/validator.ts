"use client"

import * as z from "zod"

export const EventSchemaValidator = z.object({
  name: z.string().min(3).max(200),
  description: z.string().max(300).optional(),
  startDate: z.date(),
  endDate: z.date(),
  imageUrl: z.string().url(),
  location: z.string().min(1, "Please enter a location").max(200),
  price: z.number().min(0),
  isFree: z.boolean().default(false),
  organizer: z.string()
});
