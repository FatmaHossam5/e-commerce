import { create, find, findOneAndUpdate } from "../../../../DB/DBMethods.js";
import brandModel from "../../../../DB/model/brand.model.js";
import cloudinary from "../../../services/cloudinary.js";
import { asyncHandler } from "../../../services/errorHandling.js";
import slugify from  'slugify'
import { paginate } from "../../../services/pagination.js";



export const createBrand = asyncHandler(
  async(req,res,next)=>{
    if(!req.file){
        return next(new Error ('image is required',{cause:400}))
    }else{
        const{ secure_url, public_id}= await cloudinary.uploader.upload(req.file.path,{folder:'category/brand'})
        const{name}=req.body;
        const brand = await create({
            model:brandModel,
            data: {
                name,
                slug: slugify(name),
                image: secure_url,
                imagePublicId: public_id,
                createdBy: req.user._id,
            }
           
        })
     
        return brand ? res.status(201).json({ message: "Done", brand }) :
        next(new Error('Fail to add new brand', { cause: 400 }))
      
    }
  }

)
export const updateBrand = asyncHandler(
    async(req,res,next)=>{
        const{id}=req.params
        if(req.file){
            const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:'category/brand'})
            req.body.image=secure_url;
            req.body.imagePublicId=public_id;
        }
        if(req.body.name){
            req.body.slug=slugify(req.body.name)
        }
        req.body.updatedBy = req.user._id
       
        const Brand = await findOneAndUpdate({
            model:brandModel,
            filter:{_id:id},
            data:req.body,
            options:{new:false}

        })
       
        if(Brand){
            if(req.file){
                await cloudinary.uploader.destroy(Brand.imagePublicId)
            }
            return res.status(200).json({ message: "Done", Brand })
        }else{
            await cloudinary.uploader.destroy(req.body.imagePublicId)
            return next(new Error('Fail to update this Brand', { cause: 400 }))

        }
    }
)
export const getBrands = asyncHandler(
    async(req,res,next)=>{
        const{limit,skip}=paginate({page: req.query.page, size: req.query.size })
        const brand = await find({
            model:brandModel,
           populate:[
           { path: "createdBy",
           select: "userName email image"}
           ], skip,limit
        })
        return res.status(200).json({ message: "Done", brand })
    }
)