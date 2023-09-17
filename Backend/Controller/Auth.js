
import userModel from '../Models/Usermodel.js'
import OrderModel from '../Models/OrderModel.js'
import {HashPassword, ComparePassword} from '../Helper/Auth.js'
import { validationResult } from 'express-validator';
import JWT from 'jsonwebtoken';
 

//  for registering user....
export const registercontroller = async(req, res) => {

        // if there are errors, return bad requests and the errors..
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({success:false, Esuccess:true, errors: errors.array()});
        }

        const {name, email, password, phone, address, answer} = req.body;

        try {

            // checking existing user...
            const existingUser = await userModel.findOne({email})
            if(existingUser) {
                return res.status(400).send({
                    success: false,
                    Esuccess:false,
                    message: 'User already exists'
                })
            }

            // hash the password..
            const HashedPassword = await HashPassword(password)

            //  save the user...
            const user = await new userModel({name, email, phone, address, answer, password:HashedPassword}).save()

            res.status(201).send({
                success: true,
                message: 'User registered successfully',
                user
            })

        } catch (error) {
            res.status(404).send({
                success: false,
                message: 'Error in Registration',
                error
            })
        }
}

//  for login user....

export const logincontroller = async (req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({success: false, Esuccess: true, errors: errors.array()})
    }

    try {
        
        const {email, password} = req.body;

        const isExistingUser = await userModel.findOne({email})
        if(!isExistingUser) {
            return res.status(400).send({
                success: false,
                Esuccess: false,
                message: "Please login with correct email or phone"
            })
        }

        const passwordCompare = await ComparePassword(password, isExistingUser.password)

        if(!passwordCompare) {
            return res.status(400).send({
                success: false,
                Esuccess: false,
                message: "Please enter the password correctly"
            })
        }

        const auth_token = JWT.sign({_id:isExistingUser._id}, process.env.JWT_SECRET, {expiresIn: "7d"})
        res.status(201).send({
            success: true,
            message: 'You are Loged in successfully',
            user: {
                name: isExistingUser.name,
                email: isExistingUser.email,
                address: isExistingUser.address,
                phone: isExistingUser.phone,
                DelieveryAddress: isExistingUser.DelieveryAddress,
                role: isExistingUser.role
            },
            auth_token
        })


    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in login",
            error 
        })
    }

}

//  forgotPasswordcontroller controller for reseting the password..

export const forgotPasswordcontroller = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({success: false, Esuccess: true, errors: errors.array()})
    }

    try {
        
        const {email, answer, password} = req.body

        const user = await userModel.findOne({email, answer})

        if(!user) {
            return res.status(400).send({
                success: false,
                Esuccess: false,
                message: "Wrong email or answer"
            })
        }

        const HashedPassword = await HashPassword(password);
        await userModel.findByIdAndUpdate(user._id, {password:HashedPassword})

        res.status(201).send({
            success: true,
            message: 'Password changed successfully',
            user
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Some error occured",
            error 
        })
    }
}


export const TestController = async (req, res) => {

        try {
            res.send(req.user)

        } catch (error) {
            success: false,
            res.status(400).send("Internal server Error")
            error 
        }
}


export const UpdateUserController = async(req, res) => {

    // if there are errors, return bad requests and the errors..
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success:false, Esuccess:true, errors: errors.array()});
    }

    
    try {
        const {name, email, phone, address} = req.body;
        const id = req.user._id
        const Logineduser = await userModel.findById(id)
        // checking existing user...
        const existingUser = await userModel.findOne({email})
        if(existingUser && ( existingUser.email !== Logineduser.email)) {
            return res.status(400).send({
                success: false,
                Esuccess:false,
                message: 'User already exists'
            })
        }
        const user = await userModel.findByIdAndUpdate(id, {name, email, phone, address}, {new:true})

        res.status(201).send({
            success: true,
            message: 'User Updated successfully',
            user
        })

    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'Error in Updating',
            error
        })
    }
}


export const UpdateDeliveryAddressController = async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success:false, Esuccess:true, errors: errors.array()});
    }

    try {
        const {PinCode, FlatNumber_BuildingName, Locality_Area_Street, Landmark, City, Distict, State} = req.body;
        const id = req.user._id
        const user = await userModel.findById(id)
        user.DelieveryAddress = {PinCode, FlatNumber_BuildingName, Locality_Area_Street, Landmark, City, Distict, State}
        const auth_token = JWT.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn: "7d"})
        await user.save()
        res.status(201).send({
            success: true,
            message: 'User Address updated successfully',
            user,
            auth_token
        })
    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'Error in Updating Delievery address',
            error
        })
    }
}

export const getOrdersControllers = async(req, res) => {
    try {
        const orders = await OrderModel.find({buyer:req.user._id}).populate('products', '-image').select('-buyer').sort({createdAt:-1});
        res.status(200).send({
            success: true,
            orders
        })
    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'Error in Getting Orders',
            error
        })
    }
}

export const getAllOrdersControllers = async(req, res) => {
    try {
        const orders = await OrderModel.find({}).populate('products', '-image').populate('buyer').sort({createdAt:-1});
        res.status(200).send({
            success: true,
            orders
        })
    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'Error in Getting Orders',
            error
        })
    }
}

export const statusUpdateController = async(req, res) => {
    try {
        const {OrderedId} = req.params;
        const {status} = req.body;
        const orders = await OrderModel.findByIdAndUpdate(OrderedId, {status}, {new:true});
        res.status(200).send({
            success: true,
            orders
        })
    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'Error in Upadting status of orders',
            error
        })
    }
}