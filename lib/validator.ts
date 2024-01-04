"use client"

import * as z from "zod"

export const EventSchemaValidator = z.object({
  name: z.string().min(3).max(400),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  imageUrl: z.string().url(),
  location: z.string(),
  price: z.number().min(0),
  isFree: z.boolean().default(false)
});
