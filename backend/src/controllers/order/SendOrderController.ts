import { Request, Response } from 'express'
import { SendOrderService } from '../../services/order/SendOrderService'

class SendOrderController {
	async handle(request: Request, response: Response) {
		const { orderId } = request.body
		const order = await new SendOrderService().execute({ orderId })
    return response.json(order)
	}
}

export { SendOrderController }
