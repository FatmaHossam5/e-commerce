import joi from 'joi'
export const headersValidator ={
    headers:joi.object().required().options({allowUnknown:true}).keys({
        authorization:joi.string().required()
    })}
    export const addProduct={
        body:joi.object().required().keys({
            name:joi.string().required(),
            amount:joi.number().required(),
            price:joi.number().required(),
            subcategoryId:joi.string().required().min(24).max(24),
            categoryId:joi.string().required().min(24).max(24),
            brandId:joi.string().required().min(24).max(24),
            discount:joi.number()

        })
    }
    export const updateProduct={
        body:joi.object().required().keys({
            name:joi.string().required(),
            amount:joi.number().required(),
            price:joi.number().required(),
            subcategoryId:joi.string().required().min(24).max(24),
            categoryId:joi.string().required().min(24).max(24),
            brandId:joi.string().required().min(24).max(24),
            discount:joi.number()

        }),
        params:joi.object().required().keys({
            id:joi.string().required().min(24).max(24)
        })
    }