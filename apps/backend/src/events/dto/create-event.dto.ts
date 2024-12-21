import type { EventStatus, Prisma } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsDate, IsNotEmpty, IsString } from 'class-validator'

export class CreateEventDto implements Prisma.EventCreateInput {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  startDate: string | Date

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  endDate: string | Date

  @IsNotEmpty()
  @IsNotEmpty()
  @IsString()
  location: string
  posterUrl: string
  status: EventStatus
  createdBy: Prisma.UserCreateNestedOneWithoutEventInput
}
