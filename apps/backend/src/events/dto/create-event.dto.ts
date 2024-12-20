import type { EventStatus, Prisma } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsDate, IsNotEmpty } from 'class-validator'

export class CreateEventDto implements Prisma.EventCreateInput {
  createdBy: Prisma.UserCreateNestedOneWithoutEventInput
  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  endDate: string | Date
  @IsNotEmpty()
  location: string
  posterUrl: string
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  startDate: string | Date
  status: EventStatus
}
