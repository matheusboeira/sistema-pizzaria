import { Request, Response } from 'express'
import { FinishOrderService } from '../../services/order/FinishOrderService'

class FinishOrderController {
	async handle(request: Request, response: Response) {
		const { orderId } = request.body
		const order = await new FinishOrderService().execute({ orderId })
    return response.json(order)
	}
}

export { FinishOrderController }
