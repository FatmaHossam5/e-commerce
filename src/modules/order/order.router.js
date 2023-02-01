import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./order.endPoint.js";
import * as order from './controller/order.js'
import { validation} from "../../middleware/validation.js";
import *as validators from './order.validation.js'
const router = Router()




router.post('/',auth(endPoint.create),validation(validators.orderValidator) , order.createOrder)




export default router