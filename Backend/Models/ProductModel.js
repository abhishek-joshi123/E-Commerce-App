
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema( {
    name: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require:true
    },
    description: {
        type: String,
        require:true
    },
    price: {
        type: Number,
        require:true
    },
    discount: {
        type: Number,
        require:true
    },
    category: {
        type: mongoose.ObjectId,
        ref:'Category',
        require:true
    },
    quantity: {
        type: Number, 
        require:true
    },
    image: {
        data: Buffer,
        ContentType: String
    },
    shipping: {
        type: Boolean
    }
}, {timestamps: true})

export default mongoose.model('products', ProductSchema)