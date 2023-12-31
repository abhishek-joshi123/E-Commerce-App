
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({

    products: [
        {
            type: mongoose.ObjectId,
            ref: 'products'
        }
    ],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
            ref: 'users'
    },
    status : {
        type: String,
        default: 'Not Processed',
        enum : ['Not Processed', 'Processing', 'Shipped', 'delievered', 'canceled']
    },   
}, {timestamps: true});

export default mongoose.model('Orders', OrderSchema);