import { create, find, findById, findByIdAndUpdate, updateOne } from "../../../../DB/DBMethods.js";
import categoryModel from "../../../../DB/model/category.model.js";
import slugify from "slugify";
import subcategoryModel from "../../../../DB/model/subcategory.model.js";
import cloudinary from "../../../services/cloudinary.js";
import { asyncHandler } from "../../../services/errorHandling.js";
import { paginate } from "../../../services/pagination.js";

// add subCategory
export const createSubCategory = asyncHandler(async (req, res,next) => {
  if (!req.file) {
  return  next(new Error("image Required", { cause: 400 }));
  } else {
    const {categoryId}=req.params;
    const category = await findById({filter:categoryId,model:categoryModel})
    if(!category){
      return   next(new Error("In-valid CategoryId", { cause: 404 }));
    }else{ 
     const { name } = req.body;
    const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        { folder: `category/${category._id}` }
      );
      const subcategory = await create({
        model: subcategoryModel,
        data: {
          image: secure_url,
          name,
         slug:slugify(name),
          createdBy: req.user._id,
          imagePublicId: public_id,
          categoryId:category._id
        },
      });
      return  subcategory?res.status(201).json({ message: "Done", subcategory }):
      next(new Error("Fail Add New Category", { cause: 400 }));
  
   
    }
   
  }
});

// update subcategory
export const updateSubCategory = asyncHandler( async (req, res, next) => {
    const{categoryId,id}=req.params;
    if(req.file){
        const{secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`category/${categoryId}`})
        req.body.image=secure_url;
        req.body.imagePublicId=public_id;
    }
    if(req.body.name){
        req.body.slug=slugify(req.body.name)
    }
    req.body.updatedBy=req.user._id
    const category=await findByIdAndUpdate({model:subcategoryModel,filter:{_id:id, categoryId: categoryId},data:req.body,options:{new:false}})
    if(category){
        if(req.file){
            await cloudinary.uploader.destroy(category.imagePublicId)
        
            }return res.status(200).json({message:"Done" ,category})
    }else{
        await cloudinary.uploader.destroy(req.body.imagePublicId)
        return next(new Error('fail to update this subcategory',{cause:400}))
    }
    
   
 

   
})

// get All subCategories
 export const getAllSubCategory = asyncHandler(async (req, res, next) => {
    const{categoryId}=req.params;
   const { skip, limit } = paginate({
     page: req.query.page,
     size: req.query.size,
   });
   const category = await find({
     model: subcategoryModel,
     populate: [
       { path: "createdBy", select: "userName email image" },
       { path: "updatedBy", select: "userName email image" },
       {path:'categoryId'}
     ],
     skip,
     limit,
   });
   return   res.status(200).json({ message: "Done", category });
 });
// get Category By Id
 export const getSubCategoryById = asyncHandler(async (req, res, next) => {
   const subCategory = await findById({
     model: subcategoryModel,
     filter: { _id: req.params.id },
     populate: [
       { path: "createdBy", select: "userName email image" },
       {
         path: "updatedBy",
         select: "userName email image",
       },
       {path: 'categoryId'}
     ],
   });
   return   res.status(200).json({ message: "Done", subCategory });
 });