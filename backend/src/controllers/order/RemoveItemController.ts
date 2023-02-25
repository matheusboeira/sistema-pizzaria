import { Request, Response } from 'express'
import { RemoveItemService } from '../../services/order/RemoveItemService'

class RemoveItemController {
	async handle(request: Request, response: Response) {
		const itemId = request.query.itemId as string
		const order = await new RemoveItemService().execute({ itemId })
    return response.json(order)
	}
}

export { RemoveItemController }
