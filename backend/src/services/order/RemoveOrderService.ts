import prisma from '../../prisma'
import { Order } from '@prisma/client'

interface OrderRequest {
	orderId: string
}

class RemoveOrderService {
	async execute({ orderId }: OrderRequest) {
		const order = await prisma.order.delete({
			where: {
				id: orderId
			}
		})
		return order
	}
}

export { RemoveOrderService }
