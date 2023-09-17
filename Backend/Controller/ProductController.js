
import fs from 'fs'
import ProductModel from '../Models/ProductModel.js ';
import slugify from 'slugify';
import CategorYmodel from '../Models/CategorYmodel.js'
import OrderModel from '../Models/OrderModel.js';
import braintree from 'braintree'

let gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });


export const createProductController = async(req, res) => {

    try {
        
        const {name, description, price, category, quantity, discount } = req.fields;
        const {image} = req.files;
 
        switch(true) { 
            case !name:
                return res.status(400).send({success:false, message: 'name is required'})
            case !description:
                return res.status(400).send({success:false, message: 'description is required'})
            case !price:
                return res.status(400).send({success:false, message: 'price is required'})
            case !discount:
                return res.status(400).send({success:false, message: 'discount is required'})
            case !category:
                return res.status(400).send({success:false, message: 'category is required'})
            case !quantity:
                return res.status(400).send({success:false, message: 'quantity is required'})
            case !image || image.size > 1000000:
                return res.status(400).send({success:false, message: 'image is required and should be less than 1mb'})
        }  
        const product = new ProductModel({...req.fields, slug:slugify(name) })
        if(image){
            product.image.data = fs.readFileSync(image.path)
            product.image.ContentType = image.type
        }

        await product.save()

        res.status(200).send({
            success:true,
            message: 'product created successfully',
            product
        })
    } catch (error) { 
        res.status(400).send({
            success: false,
            message: 'some error occured',
            error
        })
    }
}

export const getAllProductsController = async(req, res) => {

    try {
        
        const products = await ProductModel.find({}).populate('category').select('-image').limit(50).sort({createdAt:-1})

        res.status(200).send({
            success: true,
            totalCount: products.length,
            message: 'all products listed',
            products
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'some error occured',
            error
        })
    }
}


export const GetSingleProductController = async(req, res) => {
    
    try {

        const product = await ProductModel.findOne({slug:req.params.slug}).populate('category').select('-image')
        if(!product){
            return res.status(400).send({
                success: false,
                message: 'No product found'
            })
        }

        res.status(200).send({
            success:true,
            message: 'product found successfully',
            product
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'some error occured',
            error
        })
    }
}


export const getImageController = async(req, res) => {

    try {
        const product = await ProductModel.findById(req.params.id).select('image')
        
        if(!product){
            return res.status(404).send({
                success: false,
                message: "Product Not found!"
            })
        } 

        res.set('Content-type', product.image.ContentType)
        return res.status(200).send(product.image.data)

    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'some error occured',
            error
        })
    }
}


export const UpdateProductController = async(req, res) => {
 
    try {

        const {name, description, price, category, quantity, discount } = req.fields;
        const {image} = req.files;

        switch(true) { 
            case !name:
                return res.status(400).send({success:false, message: 'name is required'})
            case !description:
                return res.status(400).send({success:false, message: 'description is required'})
            case !price:
                return res.status(400).send({success:false, message: 'price is required'})
            case !discount:
                return res.status(400).send({success:false, message: 'discount is required'})
            case !category:
                return res.status(400).send({success:false, message: 'category is required'})
            case !quantity:
                return res.status(400).send({success:false, message: 'quantity is required'})
            case !image || image.size > 1000000:
                return res.status(400).send({success:false, message: 'image is required and should be less than 1mb'})
        }  

        const {id} = req.params;
        const product = await ProductModel.findByIdAndUpdate(id, {...req.fields, slug:slugify(name) }, {new:true})

        if(image){
            product.image.data = fs.readFileSync(image.path)
            product.image.ContentType = image.type
        }  

        await product.save()

        res.status(200).send({
            success:true,
            message: 'product Updated successfully',
            product
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'some error occured',
            error
        })
    }
}


export const DeleteProductController = async(req, res) => {

    try {

        const {id} = req.params

        await ProductModel.findByIdAndDelete(id).select('-image')
        res.status(200).send({
            success:true,
            message: 'product deleted successfully'
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'some error occured',
            error
        })
    }
}

export const FilterProductController = async(req, res) => {

    try {
        const {checked, radio} = req.body
        let args = {}
        if(checked.length > 0)
            args.category = checked
        if(radio.length)
        args.price = {$gte: radio[0], $lte: radio[1]}

        const products = await ProductModel.find(args).select('-image')
        res.status(200).send ({
            success:true,
            message: `${products.length} products found`,
            products
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'some error occured',
            error 
        })
    }
}

export const ProductCountController = async(req, res) => {

    try {
        const total = await ProductModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success:true,
            total
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'some error occured',
            error 
        })
    }  
}

export const ProductListController = async(req, res) => {

    try {
        const perPage = 10;
        const page = req.params.page ? req.params.page : 1
        const products = await ProductModel.find({}).select('-image').skip((page-1) * perPage).limit(perPage).sort({createdAt: -1})
        res.status(200).send({
            success:true,
            products
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'some error occured',
            error 
        })  
    } 
}

export const SearchControllerTotal = async(req, res) => {

    try {

        const {search} = req.params

        const products = await ProductModel.find({
            $or: [
                {name: {$regex: search, $options: 'i'}},
                {description: {$regex: search, $options: 'i'}}
            ]
        })

        const total = products.length
        res.status(200).send({
            success: true,
            total
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'some error occured',
            error 
        })
    }
}

export const SearchController = async(req, res) => {

    try {

        const {search} = req.params
        const perPage = 10;
        const page = req.params.page ? req.params.page : 1

        const products = await ProductModel.find({
            $or: [
                {name: {$regex: search, $options: 'i'}},
                {description: {$regex: search, $options: 'i'}}
            ]
        }).select('-image').skip((page-1) * perPage).limit(perPage).sort({createdAt: -1})

        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'some error occured',
            error 
        })
    }
}

// export const SearchController = async(req, res) => {

//     try {

//         const {search} = req.params

//         const products = await ProductModel.find({
//             $or: [
//                 {name: {$regex: search, $options: 'i'}},
//                 {description: {$regex: search, $options: 'i'}}
//             ]
//         }).select('-image')

//         res.status(200).send({
//             success: true,
//             products
//         })
//     } catch (error) {
//         res.status(400).send({
//             success: false,
//             message: 'some error occured',
//             error 
//         })
//     }
// }


export const filterAllCategoriesController = async(req, res) => {

    try {

        const {filter} = req.params
        const matchingCategories = await CategorYmodel.find({
            name: { $regex: filter }
          });
          
          const categoryIds = matchingCategories.map(category => category._id);
    
          const products = await ProductModel.find({
            category: { $in: categoryIds }
          }).select('-image').populate('category');

          res.status(200).send({
            success: true,
            message: `${products.length} Products Available`,
            products 
        }) 
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'some error occured',
            error 
        })
    }
}

//  token...
export const braintreeController = async(req, res) => {
    try {
        gateway.clientToken.generate({}, function(error, response) {
            if(error) {
                return res.status(400).send(err)
            } else{
                res.send(response);
            }
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'some error occured',
            error 
        })
    }
}

// payment..
export const braintreePaymentController = async(req, res) => {
    try {
        const {cart, nonce} = req.body
        let total = 0;
        cart.map((item) => {total += item.price});
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement:true
            }
        },
        async (error, result) => {
            if(result) {
                const order = new OrderModel({
                    products: cart.map(item => item.id),
                    payment: result,
                    buyer: req.user._id,
                })
                await order.save();
                res.json({ok: true})
            } else{
                return res.status(400).send(error);
            }
        }
        )
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'some error occured',
            error 
        })
    }
}