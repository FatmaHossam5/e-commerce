import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./reviews.endPoint.js";
import * as review from './controller/review.js'
import { validation } from "../../middleware/validation.js";
import*as validator from './reviews.validation.js'
const router = Router({mergeParams:true})




router.post('/', auth(endPoint.createReview),validation(validator.addReview) ,review.createReview)



export default router