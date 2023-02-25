import { Request, Response } from 'express'
import {
	AddItemService,
	ItemRequest
} from '../../services/order/AddItemService'

class AddItemController {
	async handle(request: Request, response: Response) {
		const { orderId, productId, amount } = request.body as ItemRequest
		const order = await new AddItemService().execute({
			orderId,
			productId,
			amount
		})
    return response.json(order)
	}
}

export { AddItemController }
