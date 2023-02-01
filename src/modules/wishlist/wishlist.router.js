import { Router } from "express";
import * as wishlist from './controller/wishlist.js'
import {auth} from '../../middleware/auth.js'
import endPoint from "../wishlist/wishlist.endpoint.js";
import { validation } from "../../middleware/validation.js";
import * as Validator from "./wishlist.validation.js"
const router = Router({mergeParams:true})




router.patch('/add',auth(endPoint.addOrRemove),validation(Validator.wishListValidation),wishlist.createWishList )
router.patch('/remove',auth(endPoint.addOrRemove),validation(Validator.wishListValidation),wishlist.remove )





export default router