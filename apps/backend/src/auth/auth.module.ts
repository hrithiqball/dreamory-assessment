import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PrismaService } from 'src/prisma.service'
import { UsersService } from 'src/users/users.service'
import { JwtModule } from '@nestjs/jwt'
import { env } from 'process'

@Module({
  imports: [
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UsersService]
})
export class AuthModule {}
