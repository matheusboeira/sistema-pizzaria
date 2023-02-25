import { Request, Response } from 'express'
import { AuthUserService } from '../../services/user/AuthUserService'

class AuthUserController {
	async handle(request: Request, response: Response) {
		const { email, password } = request.body
		const auth = await new AuthUserService().execute({ email, password })
		return response.json(auth)
	}
}

export { AuthUserController }
