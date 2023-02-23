import { Request, Response } from 'express'

import { CreateUserService } from '../../services/user/CreateUserService'

class CreateUserController {
	async handle(request: Request, response: Response) {
		const { name, email, password } = request.body
		const user = await new CreateUserService().execute({
			name,
			email,
			password
		})

		response.json(user)
	}
}

export { CreateUserController }
