import { Router } from "express";
import { fileValidation, myMulter } from "../../services/multer.js";
import * as category from './controller/category.js'
import {auth} from '../../middleware/auth.js'
import subcategoryRouter from '../subcategory/subcategory.router.js'
import endPoint from "./category.endPoint.js";
import {validation}from "../../middleware/validation.js";
import * as Validator from './category.validation.js'
const router = Router()


router.use('/:categoryId/subCategory',subcategoryRouter)

router.post('/createCategory',auth(endPoint.add), myMulter(fileValidation.image).single('image'),validation(Validator.addCategoryValidate),category.createCategory )
router.put('/:id',auth(endPoint.update), myMulter(fileValidation.image).single('image'),validation(Validator.updateCategoryValidate),category.updateCategory )
router.get('/getGat',category.getAllCategory)
router.get('/:id',validation(Validator.CategoryValidate),category.getCategoryById)




export default router