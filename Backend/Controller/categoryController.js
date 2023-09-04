
import { validationResult } from 'express-validator'
import slugify from 'slugify';
import CategorYmodel from '../Models/CategorYmodel.js'
 

export const CategoryController = async (req, res) => {

    try {
        
        const category = await CategorYmodel.find({});
        res.status(200).send({
            success:true,
            message: 'all categories listed',
            category
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'some error occured',
            error
        })
    }
}

export const SingleCategoryController = async (req, res) => {

    try {
        
        const category = await CategorYmodel.findOne({slug:req.params.slug});
        if(!category){
            return res.status(400).send({
                success: false,
                message: 'No category found'
            })
        }
        
        res.status(200).send({
            success:true,
            message: 'category found successfully',
            category
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'some error occured',
            error
        })
    }
}

export const CreateCategoryController = async(req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({
            success: false, 
            Esuccess: true,
            errors: errors.array()
        })
    }

    try {
        const {name} = req.body
        const existingCategory = await CategorYmodel.findOne({name})

        if(existingCategory){
            return res.status(400).send({ 
                success: false,
                Esuccess: false,
                message: 'category already exists'
            }) 
        }

        const category = await new CategorYmodel({name, slug:slugify(name)}).save()
        
        res.status(200).send({
            success:true,
            message: `new category ${category.name} is created`,
            category
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'some error occured',
            error
        })
    }
}

export const UpdateCategoryController = async(req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({
            success: false, 
            Esuccess: true,
            errors: errors.array()
        })
    }

    try {
        
        const {name} = req.body;
        const {id} = req.params

        const category = await CategorYmodel.findByIdAndUpdate( id, 
            {name, slug:slugify(name)}, 
            {new:true}
        )

        res.status(200).send({
            success: true,
            message: `Updated to ${category.name} Successfully`,
            category
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'some error occured',
            error
        })
    }
}

export const DeleteCategoryController = async (req, res) => {
    
    try {
        
        const {id} = req.params;

        const category = await CategorYmodel.findById(id);
        await CategorYmodel.findByIdAndDelete(id)

        res.status(200).send({
            success: true,
            message: `${category.name} deleted Successfully'`
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'some error occured',
            error
        })
    }
}