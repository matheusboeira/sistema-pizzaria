import prisma from '../../prisma'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { isValidEmail } from '../../utils/validations'

import { i18n } from '../../i18n'

interface AuthRequest {
  email: string
  password: string
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    if (!isValidEmail(email)) {
      throw new Error(i18n('user.invalid-email'))
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    })

    if (!user) {
      throw new Error('User does not exists')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Email or password incorrect')
    }

    const token = sign(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    )

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token
    }
  }
}

export { AuthUserService }
