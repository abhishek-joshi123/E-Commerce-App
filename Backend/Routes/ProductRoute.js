
import  express  from "express";
import { isAdmin, requireSignIn } from "../Middleware/FetchUser.js";
import { DeleteProductController,
         FilterProductController,
         GetSingleProductController,
         ProductCountController,
         ProductListController,
         SearchController,
         SearchControllerTotal,
         UpdateProductController,
         braintreeController,
         braintreePaymentController,
         createProductController,
         filterAllCategoriesController,
         getAllProductsController,
         getImageController } 
from "../Controller/ProductController.js";
import { body } from "express-validator";
import formidable from 'express-formidable';

const router = express.Router()

//   routes..
 
//  create product...
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//  get All product...
router.get('/all-products', getAllProductsController)

//  get Single product...
router.get('/get-product/:slug', GetSingleProductController) 

//  get Single product...
router.get('/product-image/:id', getImageController)

//  update product...
router.put('/update-product/:id', requireSignIn, isAdmin, formidable(), UpdateProductController)

//  delete product...
router.delete('/delete-product/:id', requireSignIn, isAdmin, DeleteProductController)

//  filter product...
router.post('/filter-product', FilterProductController)
 
// product count..
router.get('/product-count', ProductCountController)

// product per page..
router.get('/product-list/:page', ProductListController)

// search count..
router.get('/search-count/:search', SearchControllerTotal)

// Searching a product..
router.get('/search-product/:page/:search', SearchController)

// Filtering a product Category..
router.get('/filter-products/:filter', filterAllCategoriesController)

//payment routes...
//token

router.get('/braintree/token', braintreeController)

//payments...

router.post('/braintree/payment', requireSignIn, braintreePaymentController)

export default router 