//?Module imports
import express from 'express'
import cookieParser from 'cookie-parser'

//?file imports
import { connectDb } from './config/connectdb.config.js'
import { ENV_VARS } from './config/env.config.js'
import userRoutes from './routes/user.routes.js'

const app = express()
const PORT=ENV_VARS.PORT;

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `)
    connectDb()
})