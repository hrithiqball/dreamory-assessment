import type { Event as EventModel, EventStatus } from '@prisma/client'

export class Event implements EventModel {
  id: number
  name: string
  startDate: Date
  endDate: Date
  location: string
  status: EventStatus
  createdAt: Date
  createdById: number
  posterUrl: string
  updatedAt: Date
}
