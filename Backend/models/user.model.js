import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
      username:{
        type:String,
        required:[true,"Name is required"]
      },
      password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[6,"Password must be at least 6 characters long"]
      },
      email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        trim:true,
        lowercase:true,
      }
      ,
      cartItems:[{
        quantity:{
            type:Number,
            default:1,
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
        }
      }],
      role:{
        type:String,
        enum:['customer','admin'],
        default:'customer'
      }


}, { timestamps: true });

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) next();
    try{
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        next();
    }
    catch(err){
        next(err)
    }
})

userSchema.methods.comparePassword=async function(password){
   return await bcrypt.compare(password,this.password);
}

const User=mongoose.model('User',userSchema);

export default User;
