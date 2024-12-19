import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { EventsModule } from './events/events.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [UsersModule, EventsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
