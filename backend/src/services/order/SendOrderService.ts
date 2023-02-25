import prisma from '../../prisma'

interface OrderRequest {
	orderId: string
}

class SendOrderService {
	async execute({ orderId }: OrderRequest) {
    const order = await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        draft: false
      }
    })
    return order
  }
}

export { SendOrderService }
