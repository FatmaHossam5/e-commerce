import { Router } from "express";
import { fileValidation, myMulter } from "../../services/multer.js";
import * as subcategory from './controller/subCategory.js'
import {auth} from '../../middleware/auth.js'
import endPoint from "./subcategory.endPoint.js";
import { validation } from "../../middleware/validation.js";
import * as Validators from './subcategory.validation.js'
const router = Router({mergeParams:true})




router.post('/createSubCategory',auth(endPoint.add), myMulter(fileValidation.image).single('image'),validation(Validators.addSubCategory),subcategory.createSubCategory )
router.put('/:id',auth(endPoint.update), myMulter(fileValidation.image).single('image'),validation(Validators.updateSubCategory),subcategory.updateSubCategory )
router.get('/',subcategory.getAllSubCategory)
router.get('/:id',subcategory.getSubCategoryById)




export default router