import { create, find, findById, findByIdAndUpdate, updateOne } from "../../../../DB/DBMethods.js";
import categoryModel from "../../../../DB/model/category.model.js";
import cloudinary from "../../../services/cloudinary.js";
import { asyncHandler } from "../../../services/errorHandling.js";
import { paginate } from "../../../services/pagination.js";

// add Category
export const createCategory = asyncHandler(async (req, res,next) => {
  if (!req.file) {
    return  next(new Error("image Required", { cause: 400 }));
  } else {
    const { name } = req.body;
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: "category" }
    );
    const category = await create({
      model: categoryModel,
      data: {
        image: secure_url,
        name,
        createdBy: req.user._id,
        imagePublicId: public_id,
      },
    });
    return res.status(201).json({ message: "Done", category });
  }
});

// update category
export const updateCategory = asyncHandler( async (req, res, next) => {
    const{id}=req.params;
    if(req.file){
        const{secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:'category'})
        req.body.image=secure_url;
        req.body.imagePublicId=public_id;
    }
    req.body.updatedBy=req.user._id
    const category=await findByIdAndUpdate({model:categoryModel,filter:{_id:id},data:req.body})
    if(req.file){
    await cloudinary.uploader.destroy(category.imagePublicId)

    }
    return   category? res.status(200).json({message:"Done" ,category}):next(new Error('fail to update this category',{cause:400}))
 

   
})

// get All Categories
 export const getAllCategory = asyncHandler(async (req, res, next) => {
   const { skip, limit } = paginate({
     page: req.query.page,
     size: req.query.size,
   });
   const category = await find({
     model: categoryModel,
     populate: [
       { path: "createdBy", select: "userName email image" },
       { path: "updatedBy", select: "userName email image" },
       {path:'subCategory'}
     ],
     skip,
     limit,
   });
   return res.status(200).json({ message: "Done", category });
 });
// get Category By Id
 export const getCategoryById = asyncHandler(async (req, res, next) => {
   const category = await findById({
     model: categoryModel,
     filter: { _id: req.params.id },
     populate: [
       { path: "createdBy", select: "userName email image" },
       {
         path: "updatedBy",
         select: "userName email image",
       },
     ],
   });
   return res.status(200).json({ message: "Done", category });
 });
 
