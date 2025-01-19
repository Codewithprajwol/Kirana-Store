import mongoose from 'mongoose'

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
    },
    description:{
        type:String,
        required:[true,'description is required'],
    },
    price:{
        type:Number,
        min:0,
        required:[true,'price is required'],
    },
    image:{
        type:String,
        required:[true,'image is required']
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    category:{
        type:String,
        required:true
    },
},{timestamps:true})

const Product=mongoose.model('Product',productSchema);

export default Product;