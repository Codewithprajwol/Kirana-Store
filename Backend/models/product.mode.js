import mongoose from 'mongoose'

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        min:0,
        required:true
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