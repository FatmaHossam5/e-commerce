import joi from 'joi'

export const headersValidator ={
    headers:joi.object().required().options({allowUnknown:true}).keys({
        authorization:joi.string().required()
    })}


    export const addReview={
        body:joi.object().required().keys({
            message:joi.string().required(),
            rating:joi.number().required(),
           

        }),
        params:joi.object().required().keys({
            productId:joi.string().required().min(24).max(24)
        })
    }