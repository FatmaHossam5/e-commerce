import { Router } from "express";
import * as registerController from './controller/registration.js'
import {validation} from '../../middleware/validation.js'
import * as validator from './auth.validation.js'
const router = Router()

//Register
router.post('/sign',validation(validator.signupValidator),registerController.signUp)
router.get('/confirmEmail/:token',validation(validator.confirmAndRefreshValidator),registerController.confirmEmail)
router.get('/requestToken/:token',validation(validator.confirmAndRefreshValidator),registerController.refreshToken)
router.post('/requestCode',validation(validator.sendCodeValidator),registerController.sendCode)
router.post('/forgetPassword',validation(validator.forgetPasswordValidator),registerController.forgetPassword)

//LogIn
router.post('/login',validation(validator.loginValidator),registerController.login)

export default router