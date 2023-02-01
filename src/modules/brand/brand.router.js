import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { fileValidation, myMulter } from "../../services/multer.js";
import endPoint from "./brand.endPoint.js";
import * as brandController from './controller/brand.js'
import * as authValidation from '../auth/auth.validation.js'
import * as brandValidation from './brand.validation.js'
const router = Router()

router.use(validation(authValidation.headersValidator))

router.post('/addBrand',auth(endPoint.add),myMulter(fileValidation.image).single('image'),validation(brandValidation.brandValidator),brandController.createBrand)
router.put('/:id',auth(endPoint.update),myMulter(fileValidation.image).single('image'),validation(brandValidation.updateBrandValidator),brandController.updateBrand)
router.get('/Brands',brandController.getBrands)



export default router