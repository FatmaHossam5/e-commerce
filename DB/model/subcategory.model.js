import { Schema, model, Types } from "mongoose";


const subCategorySchema = new Schema({

    name: {
        type: String,
        required: [true, 'name is required'],
        unique: [true, 'email must be unique value'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char']

    },
    image: {
        type: String,
  
        required: [true, 'image is required'],
    },
    createdBy: {
        type: Types.ObjectId,
        required: [true, 'createdBy is required'],
        ref:'User'
    },
    updatedBy: {
        type: Types.ObjectId,

        ref:'User'
    },
    deletedBy: {
        type: Types.ObjectId,
        ref:'User'
    },
   categoryId: {
        type: Types.ObjectId,
        ref:'Category'
    },
    deleted:{type:Boolean,default:false},
    imagePublicId:String,
    slug:String
   
}, {
    timestamps: true
})


const subcategoryModel = model('subCategory', subCategorySchema)
export default subcategoryModel