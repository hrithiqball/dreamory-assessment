import { Injectable } from '@nestjs/common'
import type { Event, Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { RequestContext } from 'src/types/token'

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async event(eventWhereUniqueInput: Prisma.EventWhereUniqueInput): Promise<Event | null> {
    return this.prisma.event.findUnique({
      where: eventWhereUniqueInput
    })
  }

  async events(params: {
    skip?: number
    take?: number
    cursor?: Prisma.EventWhereUniqueInput
    where?: Prisma.EventWhereInput
    orderBy?: Prisma.EventOrderByWithRelationInput
  }): Promise<Event[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.event.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        createdBy: {
          select: {
            name: true
          }
        }
      }
    })
  }

  async createEvent(ctx: RequestContext, data: Prisma.EventCreateInput): Promise<Event> {
    return this.prisma.event.create({ data })
  }

  async updateEvent(params: {
    where: Prisma.EventWhereUniqueInput
    data: Prisma.EventUpdateInput
  }): Promise<Event> {
    const { where, data } = params
    return this.prisma.event.update({
      data,
      where
    })
  }

  deleteEvent(where: Prisma.EventWhereUniqueInput): Promise<Event> {
    return this.prisma.event.delete({
      where
    })
  }
}
