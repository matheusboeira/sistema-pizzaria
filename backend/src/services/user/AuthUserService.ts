import prisma from '../../prisma'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface AuthRequest {
	email: string
	password: string
}

class AuthUserService {
	private MESSAGE_ERROR = 'Email or password incorrect'

	async execute({ email, password }: AuthRequest) {
		const user = await prisma.user.findFirst({
			where: {
				email: email
			}
		})

		if (!user) {
			throw new Error(this.MESSAGE_ERROR)
		}

		const passwordMatch = await compare(password, user.password)

		if (!passwordMatch) {
			throw new Error(this.MESSAGE_ERROR)
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