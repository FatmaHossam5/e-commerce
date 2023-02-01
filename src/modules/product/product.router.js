import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { fileValidation, myMulter } from "../../services/multer.js";
import endPoint from "./product.endPoint.js";
import * as productController from './controller/product.js'
import wishlistRouter from '../wishlist/wishlist.router.js'
import reviewsRouter from "../reviews/reviews.router.js"
import {validation} from '../../middleware/validation.js'
import * as validators from './product.validation.js'
const router = Router()


router.use('/:productId/wishlist',wishlistRouter)
router.use("/:productId/reviews",reviewsRouter)

router.post('/',auth(endPoint.add),myMulter(fileValidation.image).array('images',5),validation(validators.addProduct),productController.createProduct)
router.put('/:id',auth(endPoint.update),myMulter(fileValidation.image).array('images',5),validation(validators.updateProduct),productController.updateProduct)
router.get('/productList',productController.products)



export default router