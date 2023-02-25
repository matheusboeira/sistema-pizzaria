import { Request, Response } from 'express'
import { ListOrdersService } from '../../services/order/ListOrdersService'

class ListOrdersController {
	async handle(request: Request, response: Response) {
		const orders = await new ListOrdersService().execute()
		return response.json(orders)
	}
}

export { ListOrdersController }
