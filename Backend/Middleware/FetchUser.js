import userModel from '../Models/Usermodel.js'
import JWT from "jsonwebtoken";

const Auth_token = process.env.JWT_SECRET

//  protected routes token base...
export const requireSignIn = async(req, res, next) => {
 
    const token = req.header('auth-token')
    if(!token){
        return res.status(400).send({error: "Please authenticate using a valid token"})
    }

    try {
        const decode = JWT.verify(token, Auth_token);
        req.user = decode
        next()
 
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Please authenticate using a valid token",
            error 
        }) 
    }

}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role != 1){
            return res.status(400).send({
                success: false,
                message: "Unothorized access"
            })
        }
        else{
            next()
        }
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Please authenticate using a valid token",
            error 
        }) 
    }
}