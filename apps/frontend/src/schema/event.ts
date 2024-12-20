import { z } from 'zod'

export const CreateEventInputSchema = z.object({
  name: z.string().min(2),
  startDate: z.date(),
  endDate: z.date(),
  location: z.string().min(2),
  posterUrl: z.string().min(2)
})

export type CreateEventInput = z.infer<typeof CreateEventInputSchema>

export const UpdateEventInputSchema = z.object({
  name: z.string().min(2).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  location: z.string().min(2).optional(),
  posterUrl: z.string().min(2).optional(),
  status: z.enum(['ONGOING', 'COMPLETED']).optional()
})

export type UpdateEventInput = z.infer<typeof UpdateEventInputSchema>

export const DeleteEventSchema = z.object({
  password: z.string().min(1, 'Password is required')
})

export type DeleteEventInput = z.infer<typeof DeleteEventSchema>

export const EventSchema = z.object({
  id: z.number(),
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  location: z.string(),
  status: z.enum(['ONGOING', 'COMPLETED']),
  posterUrl: z.string(),
  createdBy: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string()
  }),
  createdAt: z.date(),
  updatedAt: z.date()
})

export type Event = z.infer<typeof EventSchema>

export type EventsResponse = {
  events: Event[]
  total: number
}
