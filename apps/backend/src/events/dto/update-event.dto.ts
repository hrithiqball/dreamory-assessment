import { PartialType } from '@nestjs/mapped-types'
import type { Prisma } from '@prisma/client'
import { CreateEventDto } from './create-event.dto'

export class UpdateEventDto
  extends PartialType(CreateEventDto)
  implements Prisma.EventUpdateInput {}
