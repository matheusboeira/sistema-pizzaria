import prisma from '../../prisma'
import { hash } from 'bcryptjs'

interface UserRequest {
	name: string
	email: string
	password: string
}

class CreateUserService {
	async execute({ name, email, password }: UserRequest) {
		this.emailIncorrect(email)
		await this.userAlreadyExists(email)

		const passwordHash = await hash(password, 8)

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: passwordHash
			},
			select: {
				id: true,
				name: true,
				email: true
			}
		})
		return user
	}

	emailIncorrect(email: string) {
		if (!email) {
			throw new Error('Email incorrect')
		}
	}

	async userAlreadyExists(email: string) {
		const userAlreadyExists = await prisma.user.findFirst({
			where: {
				email: email
			}
		})

		if (userAlreadyExists) {
			throw new Error('User already exists')
		}
	}
}

export { CreateUserService }
