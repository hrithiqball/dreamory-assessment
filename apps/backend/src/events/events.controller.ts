import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query
} from '@nestjs/common'
import { EventsService } from './events.service'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { RequestContext } from 'src/types/token'
import { Public } from 'src/auth/auth.decorator'

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

  @Public()
  @Get()
  async getEvents(@Query('skip') skip = '0', @Query('take') take = '10') {
    const [events, total] = await Promise.all([
      this.eventsService.events({
        skip: +skip,
        take: +take,
        orderBy: { createdAt: 'desc' }
      }),
      this.eventsService.count()
    ])

    return {
      events,
      total
    }
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
  remove(
    @Request() req: RequestContext,
    @Param('id') id: string,
    @Body('password') password: string
  ) {
    return this.eventsService.deleteEvent(req, { id: +id }, password)
  }
}
