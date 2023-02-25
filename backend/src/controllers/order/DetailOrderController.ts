import { Request, Response } from 'express'
import { DetailOrderService } from '../../services/order/DetailOrderService'

class DetailOrderController {
	async handle(request: Request, response: Response) {
		const orderId = request.query.orderId as string
		const detailsOrder = await new DetailOrderService().execute({
			orderId
		})
    return response.json(detailsOrder)
	}
}

export { DetailOrderController }
