import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request
} from '@nestjs/common'
import { EventsService } from './events.service'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { RequestContext } from 'src/types/token'

@Controller('events')
@UseGuards(AuthGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Request() req: RequestContext, @Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(req, {
      ...createEventDto,
      status: 'ONGOING',
      createdBy: {
        connect: {
          id: req.user.sub
        }
      }
    })
  }

  @Get()
  findAll() {
    return this.eventsService.events({})
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.event({ id: +id })
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.updateEvent({ data: updateEventDto, where: { id: +id } })
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.deleteEvent({ id: +id })
  }
}
