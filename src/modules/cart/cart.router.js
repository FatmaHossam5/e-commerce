import { Router } from "express";
const router = Router()
import* as cart from './controller/cart.js'
import { endPoint } from "./cart.endPoint.js";
import { auth } from "../../middleware/auth.js";
import {validation} from "../../middleware/validation.js";
import * as validator from './cart.validation.js'



router.post('/',auth(endPoint.add), validation(validator.cartValidator),cart.addToCart)


export default router