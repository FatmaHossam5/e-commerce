import joi from 'joi';

export const headersValidator ={
    headers:joi.object().required().options({allowUnknown:true}).keys({
        authorization:joi.string().required()
    })}



    export const wishListValidation={
        params:joi.object().required().keys({
            productId:joi.string().required().min(24).max(24)
        })
    }