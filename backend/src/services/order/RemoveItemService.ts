import { Item } from '@prisma/client'
import prisma from '../../prisma'

interface ItemRequest {
	itemId: string
}

class RemoveItemService {
	async execute({ itemId }: ItemRequest) {
		const order = await prisma.item.delete({
			where: {
				id: itemId
			}
		})
		return order
	}
}

export { RemoveItemService }
