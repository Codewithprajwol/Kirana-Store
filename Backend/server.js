//?Module imports
import express from 'express'

//?file imports
import { connectDb } from './config/connectdb.config.js'
import { ENV_VARS } from './config/env.config.js'

const app = express()
const PORT=ENV_VARS.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `)
    connectDb()
})