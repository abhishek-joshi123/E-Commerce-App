
import express  from "express";
import {logincontroller, registercontroller, TestController, forgotPasswordcontroller} from '../Controller/Auth.js'
import { body } from "express-validator";
import { requireSignIn, isAdmin } from '../Middleware/FetchUser.js';

// route object...
 
const router = express.Router();
 
// routing  
//  Register  ||  Method : POST
router.post('/register',[
    body('name','Enter a valid Name').isLength({min:3}),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password should contain atleast 8 characters').isLength({min:6}),
    body('phone', 'Enter a valid Phone number').isLength({min:10}),
    body('address', 'Enter a valid Address').isLength({min:3}),
    body('answer', 'Enter a valid answer').isLength({min:3})
], registercontroller)


//  Login  ||  Method : POST
router.post('/login',[
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password should contain atleast 8 characters').isLength({min:6})
], logincontroller)

router.post('/forgot-password',[
    body('email', 'Enter a valid Email').isEmail(),
    body('answer', 'Answer is required').isLength({min:3}),
    body('password', 'Password should contain atleast 8 characters').isLength({min:6})
], forgotPasswordcontroller)


// test routes.
router.get('/getuser', requireSignIn, isAdmin, TestController);


//  protected User Route Auth..
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ok:true});
})

//  protected Admin Route Auth..
router.get('/admin-auth', requireSignIn, isAdmin,  (req, res) => {
    res.status(200).send({ok:true});
})


 
export default router;