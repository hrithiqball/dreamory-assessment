import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UsersService } from 'src/users/users.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UsersService]
})
export class AuthModule {}
