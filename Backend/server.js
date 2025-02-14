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
import analyticRoutes from './routes/analytic.routes.js'
import orderRoutes from './routes/payment.routes.js'

const app = express()
const PORT=ENV_VARS.PORT;

app.use(express.json({limit:'10mb'}))
app.use(cookieParser())

app.use('/api/auth',userRoutes);
app.use('/api/products',productRoutes);
app.use('/api/carts',cartRoutes)
app.use('/api/coupons',couponRoutes)
app.use('/api/payment',orderRoutes)
app.use('/api/analytics',analyticRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `)
    connectDb()
})