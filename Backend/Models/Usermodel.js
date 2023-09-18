import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({

    name: {
        type:String,
        required:true,
        trim:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    phone: {
        type: String,
        required:true
    },
    answer: {
        type: String,
        required:true
    },
    role: {
        type: Number,
        default: 0
    },
    DelieveryAddress :
        {
            PinCode:Number,
            FlatNumber_BuildingName: String,
            Locality_Area_Street: String,
            Landmark: String,
            City:String,
            Distict:String,
            State:String
        }

},{
    timestamps:true     // this will store the time at which user created account....
})

export default mongoose.model('users', UserSchema)
 