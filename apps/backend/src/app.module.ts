import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { EventsModule } from './events/events.module'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { AuthGuard } from './auth/auth.guard'
import { PrismaService } from './prisma.service'

@Module({
  imports: [
    UsersModule,
    EventsModule,
    AuthModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }
    })
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuard, PrismaService]
})
export class AppModule {}
