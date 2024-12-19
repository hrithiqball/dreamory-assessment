import type { User as UserModel } from '@prisma/client'

export class User implements UserModel {
  id: number
  email: string
  password: string
  name: string | null
  createdAt: Date
  updatedAt: Date
}
