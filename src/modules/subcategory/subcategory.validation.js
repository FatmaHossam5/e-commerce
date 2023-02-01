import joi from "joi";


 export const headersValidator ={
    headers:joi.object().required().options({allowUnknown:true}).keys({
        authorization:joi.string().required()
    })}

    export const addSubCategory ={
        body:joi.object().required().keys({
            name:joi.string().required()
        }),
        params:joi.object().required().keys({
            categoryId:joi.string().min(24).max(24).required()
        })
    }
    export const updateSubCategory ={
        body:joi.object().required().keys({
            name:joi.string().required()
        }),
        params:joi.object().required().keys({
            categoryId:joi.string().min(24).max(24).required(),
            id:joi.string().min(24).max(24).required(),
        })
    }
