import prisma from '../../prisma'

interface ProductRequest {
	name: string
	description: string
	price: number
	banner: string
	categoryId: string
}

class CreateProductService {
	async execute({
		name,
		description,
		price,
		banner,
		categoryId
	}: ProductRequest) {
		const product = await prisma.product.create({
			data: {
				name,
				description,
				price: Number(price),
				banner,
				categoryId
			}
		})
		return product
	}
}

export { CreateProductService }
