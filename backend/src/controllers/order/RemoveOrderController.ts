import { Request, Response } from 'express'
import { RemoveOrderService } from '../../services/order/RemoveOrderService'

class RemoveOrderController {
	async handle(request: Request, response: Response) {
		const orderId = request.query.orderId as string
		const removeOrder = await new RemoveOrderService().execute({ orderId })
    return response.json(removeOrder)
	}
}

export { RemoveOrderController }
