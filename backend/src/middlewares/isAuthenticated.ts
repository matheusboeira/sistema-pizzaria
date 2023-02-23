import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { StatusCode } from '../utils/StatusCode'

interface PayLoad {
	sub: string
}

function isAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const authToken = request.headers.authorization

	if (!authToken) {
		return response.status(StatusCode.Unauthorized).end()
	}

	const [_, token] = authToken.split(' ')

	try {
		const { sub } = verify(token, process.env.JWT_SECRET as string) as PayLoad
    request.userId = sub
		return next()
	} catch (err) {
		return response.status(StatusCode.Unauthorized).end()
	}
}

export { isAuthenticated }
