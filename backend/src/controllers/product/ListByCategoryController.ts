import { Request, Response } from 'express'
import { ListByCategoryService } from '../../services/product/ListByCategoryService'

class ListByCategoryController {
	async handle(request: Request, response: Response) {
		const categoryId = request.query.categoryId as string
		const products = await new ListByCategoryService().execute({
			categoryId
		})
    return response.json(products)
	}
}

export { ListByCategoryController }
