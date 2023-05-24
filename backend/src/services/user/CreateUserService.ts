import { hash } from 'bcryptjs'
import prisma from '../../prisma'
import { isValidEmail } from '../../utils/validations'

interface UserRequest {
  name: string
  email: string
  password: string
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    if (!isValidEmail(email)) {
      throw new Error('Email is not valid')
    }

    const emailAlreadyExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    })

    if (emailAlreadyExists) {
      throw new Error('E-mail already in use')
    }

    const passwordHash = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })
    return user
  }
}

export { CreateUserService }
