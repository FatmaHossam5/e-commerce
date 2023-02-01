import { findById, findByIdAndUpdate } from "../../../../DB/DBMethods.js";
import productModel from "../../../../DB/model/product.model.js";
import userModel from "../../../../DB/model/user.model.js";
import { asyncHandler } from "../../../services/errorHandling.js";



export const createWishList =asyncHandler(
    async(req,res,next)=>{
        const{productId}=req.params;
        const product = await findById({
            model:productModel,
            filter:productId,
        })
        if(!product){
            return next(new Error ('invalid product id',{cause:404}))
        }
        await findByIdAndUpdate({
            model: userModel,
            filter:req.user._id,
            data: { $addToSet: { wishlist: productId } }
        })
        return res.status(200).json({ message: "Done" })
    }
)

export const remove = asyncHandler(async (req, res, next) => {
    const { productId } = req.params
    await findByIdAndUpdate({
        model: userModel,
        filter:req.user._id,
        data: { $pull: { wishlist: productId } }
    })
    return res.status(200).json({ message: "Done" })
})