import { log, Type } from './utils/message'

import dotenv from 'dotenv'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import { router } from './routes'
import cors from 'cors'

dotenv.config()

const server = express()
const port = process.env.PORT || 3000

server.use(express.json())
server.use(cors())
server.use(router)

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof Error) {
		res.status(400).json({
			status: 'error',
			message: err.message
		})
		console.log(err.message)
	}
	res.status(500).json({
		status: 'error',
		message: 'Internal server error'
	})
})

server.listen(port, () => {
	log(`\n🚀 Server is listening at`, Type.SUCCESS, `http://localhost:${port}`)
})
