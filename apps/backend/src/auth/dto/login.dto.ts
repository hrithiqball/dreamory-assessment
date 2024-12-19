import { IsEmail, Length } from 'class-validator'

export class LoginDto {
  @IsEmail()
  email: string

  @Length(8, 64)
  password: string
}
