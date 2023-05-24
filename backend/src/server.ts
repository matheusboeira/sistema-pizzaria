import { log, Type } from './utils/message'

import dotenv from 'dotenv'
import express from 'express'
import 'express-async-errors'
import { router } from './routes'

import cors from 'cors'
import path from 'path'
import { getErrors } from './middlewares/getErrors'
import { setLanguage } from './middlewares/language'

dotenv.config()

const server = express()
const port = process.env.PORT || 3000

server.use(express.json())
server.use(cors())
server.use(setLanguage)
server.use(router)
server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))
server.use(getErrors)

server.listen(port, () => {
  log(`\n🚀 Server started at`, Type.SUCCESS, `http://localhost:${port}`)
})
