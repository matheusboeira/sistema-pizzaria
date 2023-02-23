import prisma from '../../prisma'

class DetailUserService {
	async execute(userId: string) {
		const user = await prisma.user.findFirst({
			where: {
				id: userId
			},
			select: {
				id: true,
				name: true,
				email: true
			}
		})

		return user
	}
}

export { DetailUserService }
