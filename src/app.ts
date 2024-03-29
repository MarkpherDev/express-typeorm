import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import { router } from './routes'
import { AppDataSouce } from './config/datasource'
import 'reflect-metadata'

dotenv.config()
const app = express()

const PORT: number = Number(process.env.PORT) || 3000

app.use(cors())
app.use(express.json())
app.disable('x-powered-by')

AppDataSouce.initialize()
	.then(() => console.log('Database Conected'))
	.catch(console.error)

app.use('/api/v1', router)

app.listen(PORT, () => {
	console.log(`Api funcionando correctamente en http://localhost:${PORT}`)
})
