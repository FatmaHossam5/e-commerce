import { Router } from "express";
import * as userController from './controller/user.js'
import * as authValidator from './user.validation.js'
import {auth} from '../../middleware/auth.js'
import {validation}from "../../middleware/validation.js"
import endPoint from "./user.endPoint.js";
const router = Router()




router.patch('/updatePass',auth(endPoint.update),validation(authValidator.updatePassValidation), userController.updatePassword)
router.delete('/softDelete',auth(endPoint.delete),userController.softDeleteAccount)
router.post('/block',auth(endPoint.block),validation(authValidator.blockValidation),userController.blockAccount)
router.get('/:id',validation(authValidator.getUserByIdValidation),userController.getUserById)




export default router