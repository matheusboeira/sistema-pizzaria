import { Request, Response } from 'express'

import { ListCategoryService } from '../../services/category/ListCategoryService'

class ListCategoryController {
	async handle(request: Request, response: Response) {
		const list = await new ListCategoryService().execute()
		return response.json(list)
	}
}

export { ListCategoryController }
