import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { compare, hash } from 'bcrypt'
import { UsersService } from 'src/users/users.service'
import { LoginDto } from './dto/login.dto'
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

    if (!user || !(await compare(password, user.password)))
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED)

    return { access_token: this.createToken(user) }
  }

  async logout() {
    return { message: 'Logout successful' }
  }

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto

    const userExist = await this.userService.user({ email })
    if (userExist) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)

    const hashedPassword = await hash(password, 10)

    const user = await this.userService.createUser({ email, password: hashedPassword, name })
    return { access_token: this.createToken(user) }
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken)
      const user = await this.userService.user({ id: payload.sub })

      if (!user) throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)

      return { access_token: this.createToken(user) }
    } catch (e) {
      console.error(e)
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
  }

  createToken = (user: User) => {
    const payload = { email: user.email, sub: user.id }
    return this.jwtService.sign(payload)
  }
}
