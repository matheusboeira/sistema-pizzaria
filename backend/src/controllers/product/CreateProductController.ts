import { Request, Response } from 'express'
import { CreateProductService } from '../../services/product/CreateProductService'

class CreateProductController {
	async handle(request: Request, response: Response) {
		const { name, description, price, categoryId } = request.body

		if (!request.file) {
			throw new Error('Erro ao enviar a imagem.')
		}
		const { filename: banner } = request.file

		const product = await new CreateProductService().execute({
			name,
			description,
			price,
			banner,
			categoryId
		})
		return response.json(product)
	}
}

export { CreateProductController }
