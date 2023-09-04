import connectToMongo from './Config/db.js'
import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import AuthRoute from './Routes/Auth.js'
import CategoryRoute from './Routes/CategoryRoutes.js'
import ProductRoute from './Routes/ProductRoute.js'

// configure env
dotenv.config();

connectToMongo()

const app = express()

const port = process.env.PORT || 5000;

// const corsOptions = {    
//     origin: ["http://localhost:3000", "https://frontend-notebook.onrender.com"]
// }

// app.use(cors(corsOptions))
app.use(cors());
 
app.use(express.json())    //        this is a middleware ans is required to send request through json..

// available routes..
app.use('/api/auth', AuthRoute)
app.use('/api/category', CategoryRoute)
app.use('/api/product', ProductRoute) 


app.listen(port, () => {
    console.log(`Ajio backend is running at localhost:${port}`);
})
