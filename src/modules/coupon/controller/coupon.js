import { create, findByIdAndDelete, findOne, findOneAndUpdate } from "../../../../DB/DBMethods.js"
import couponModel from "../../../../DB/model/coupon.model.js"
import { asyncHandler } from "../../../services/errorhandling.js"


export const createCoupon = asyncHandler(
    async (req, res, next) => {

        const findCoupon = await findOne({
            model: couponModel,
            filter: { name: req.body.name }
        })

        if (findCoupon) {
            return next(new Error("Coupon name already exist", { cause: 409 }))
        }

        req.body.createdBy = req.user._id
        const coupon = await create({
            model: couponModel,
            data: req.body
        })
        return res.status(201).json({ message: "Done", coupon })
    }
)

export const updateCoupon = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params
        req.body.updatedBy = req.user._id
        const coupon = await findOneAndUpdate({
            model: couponModel,
            filter: { _id: id },
            data: req.body
        })
        return coupon ? res.status(200).json({ message: "Done", coupon }) : next(new Error('In-valid coupon Id', { cause: 404 }))
    }
)
export const deleteCoupon = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params
        const coupon = await findByIdAndDelete({
            model: couponModel,
            filter: id,
        })
        return coupon ? res.status(200).json({ message: "Done", coupon }) : next(new Error('In-valid coupon Id', { cause: 404 }))
    }
)