import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./coupon.endPoint.js";
import{validation} from '../../middleware/validation.js'
import * as validator from './coupon.validation.js'
import * as coupon from './controller/coupon.js'
const router = Router()




router.post('/', auth(endPoint.createCoupon),validation(validator.couponValidator) , coupon.createCoupon)
router.put('/:id', auth(endPoint.updateCoupon) ,validation(validator.updateCouponValidator), coupon.updateCoupon)
router.patch('/remove/:id',auth(endPoint.deleteCoupon),validation(validator.deleteCouponValidator),coupon.deleteCoupon)




export default router