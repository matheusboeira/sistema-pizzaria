import prisma from '../../prisma'

interface ItemRequest {
	orderId: string
	productId: string
	amount: number
}

class AddItemService {
	async execute({ orderId, productId, amount }: ItemRequest) {
		const order = await prisma.item.create({
			data: {
				orderId,
				productId,
				amount
			}
		})
		return order
	}
}

export { AddItemService, ItemRequest }
