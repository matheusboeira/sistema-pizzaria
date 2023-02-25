import prisma from '../../prisma'

interface OrderRequest {
	orderId: string
}

class FinishOrderService {
	async execute({ orderId }: OrderRequest) {
    const order = await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        status: true
      }
    })
    return order
  }
}

export { FinishOrderService }
