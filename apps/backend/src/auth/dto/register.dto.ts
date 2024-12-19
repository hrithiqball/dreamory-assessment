import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class RegisterDto {
  @IsEmail()
  email: string

  @Length(8, 64)
  password: string

  @IsNotEmpty()
  name: string
}
