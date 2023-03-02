import { log, Type } from './utils/message'

import dotenv from 'dotenv'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import { router } from './routes'

import cors from 'cors'
import path from 'path'

dotenv.config()

const server = express()
const port = process.env.PORT || 3000

server.use(express.json())
server.use(cors())
server.use(router)
server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

server.use(
	(err: Error, _request: Request, res: Response, _next: NextFunction) => {
		if (err instanceof Error) {
			return res.status(400).json({
				status: 'error',
				message: err.message
			})
		}
		return res.status(500).json({
			status: 'error',
			message: 'Internal server error'
		})
	}
)

server.listen(port, () => {
	log(`\n🚀 Server started at`, Type.SUCCESS, `http://localhost:${port}`)
})
