import joi from'joi';

export const headersValidator ={
    headers:joi.object().required().options({allowUnknown:true}).keys({
        authorization:joi.string().required()
    })}

    export const addCategoryValidate={
        body:joi.object().required().keys({
            name:joi.string().required()
        })
    }

    export const updateCategoryValidate={
        body:joi.object().required().keys({
            name:joi.string().required()
        }),
        params:joi.object().required().keys({
            id:joi.string().required().min(24).max(24)
        })
    }
    export const CategoryValidate={
       
        params:joi.object().required().keys({
            id:joi.string().required().min(24).max(24)
        })
    }