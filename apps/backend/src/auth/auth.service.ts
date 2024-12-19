import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { verify, hash } from 'argon2'
import { UsersService } from 'src/users/users.service'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto

    const user = await this.userService.user({ email })
    if (!user || (await verify(password, user.password)))
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED)

    const payload = { email: user.email, sub: user.id }

    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto

    const user = await this.userService.user({ email })
    if (user) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)

    const hashedPassword = await hash(password)

    return this.userService.createUser({ email, password: hashedPassword, name })
  }
}
