import { Request, Response } from 'express'

import { CreateCategoryService } from '../../services/category/CreateCategoryService'

class CreateCategoryController {
	async handle(request: Request, response: Response) {
		const { name } = request.body
		const category = await new CreateCategoryService().execute({ name })
		return response.json(category)
	}
}

export { CreateCategoryController }
