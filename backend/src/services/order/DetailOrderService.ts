import prisma from '../../prisma'

interface DetailRequest {
	orderId: string
}

class DetailOrderService {
	async execute({ orderId }: DetailRequest) {
		const orders = await prisma.item.findMany({
			where: {
				id: orderId
			},
      include: {
        product: true,
        order: true
      }
		})
    return orders
	}
}

export { DetailOrderService }
