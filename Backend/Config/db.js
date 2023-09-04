import mongoose from 'mongoose'
import dotenv from 'dotenv'
// configure env
dotenv.config();

const url = process.env.MONGO_URL;


const ConnectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectToMongo = () => {
    mongoose.connect(url, ConnectionParams).then(() => {
        console.log('connected successfully')
    }).catch((e) => {
        console.log('error : ', e);
    })
}

export default connectToMongo