import { Request, Response } from 'express'

import { DetailUserService } from '../../services/user/DetailUserService'

class DetailUserController {
  async handle(request: Request, response: Response) {
    const userId = request.userId
    const user = await new DetailUserService().execute(userId)

    response.json(user)
  }
}

export { DetailUserController }
