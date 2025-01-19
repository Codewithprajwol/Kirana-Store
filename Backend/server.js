//?Module imports
import express from 'express'
import cookieParser from 'cookie-parser'

//?file imports
import { connectDb } from './config/connectdb.config.js'
import { ENV_VARS } from './config/env.config.js'
import userRoutes from './routes/user.routes.js'
import productRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'
import couponRoutes from './routes/coupon.routes.js'

const app = express()
const PORT=ENV_VARS.PORT;

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',userRoutes);
app.use('/api/products',productRoutes);
app.use('/api/carts',cartRoutes)
app.use('/api/coupons',couponRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `)
    connectDb()
})