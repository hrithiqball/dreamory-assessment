import type { EventStatus, Prisma } from '@prisma/client'

export class CreateEventDto implements Prisma.EventCreateInput {
  createdById: number
  createdBy: Prisma.UserCreateNestedOneWithoutEventInput
  name: string
  endDate: string | Date
  location: string
  posterUrl: string
  startDate: string | Date
  status: EventStatus
}
