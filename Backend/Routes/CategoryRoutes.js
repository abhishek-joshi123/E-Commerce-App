
import express  from "express";
import { isAdmin, requireSignIn } from "../Middleware/FetchUser.js";
import { CategoryController, 
         CreateCategoryController,
         DeleteCategoryController, 
         SingleCategoryController, 
         UpdateCategoryController } from "../Controller/categoryController.js";
import { body } from "express-validator";

const router = express.Router()

// routes

//  craete a new category..
router.post('/create-category', requireSignIn, isAdmin, [
    body('name', 'enter a valid name').isLength({min: 3})
], CreateCategoryController);


//  getAll categories..
router.get('/get-categories', CategoryController)


//  get single category..
router.get('/single-category/:slug', SingleCategoryController)


//  update a category..
router.put('/update-category/:id', requireSignIn, isAdmin,[
    body('name', 'enter a valid name').isLength({min: 3})
], UpdateCategoryController)


//  delete a category..
router.delete('/delete-category/:id', requireSignIn, isAdmin, DeleteCategoryController)

export default router