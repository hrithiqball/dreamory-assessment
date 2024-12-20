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
  Query,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { EventsService } from './events.service'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { AuthGuard } from 'src/guards/auth.guard'
import { RequestContext } from 'src/types/token'
import { Public } from 'src/auth/auth.decorator'
import { FileInterceptor } from '@nestjs/platform-express'
import { multerConfig } from 'src/config/multer.config'

@Controller('events')
@UseGuards(AuthGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('poster', multerConfig))
  async create(
    @Body() createEventDto: CreateEventDto,
    @Request() req: RequestContext,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!createEventDto || !file)
      throw new HttpException('Invalid request data', HttpStatus.BAD_REQUEST)

    return this.eventsService.createEvent(req, {
      ...createEventDto,
      status: 'ONGOING',
      posterUrl: `uploads/${file.filename}`,
      createdBy: { connect: { id: req.user.sub } }
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
  @UseInterceptors(FileInterceptor('poster', multerConfig))
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const event = await this.eventsService.event({ id: +id })
    if (!event) throw new HttpException('Event not found', HttpStatus.NOT_FOUND)

    if (file) {
      if (event.posterUrl) {
        const oldFileName = event.posterUrl.split('/').pop()
        await this.eventsService.deleteUploadedFile(oldFileName)
      }
    }

    return this.eventsService.updateEvent({
      data: { ...updateEventDto, posterUrl: `uploads/${file.filename}` },
      where: { id: +id }
    })
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
