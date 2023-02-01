import joi from 'joi';

export const headersValidator ={
    headers:joi.object().required().options({allowUnknown:true}).keys({
        authorization:joi.string().required()
    })}

    export const orderValidator={
        body:joi.object().required().keys({
            couponId:joi.string().required().min(24).max(24),
            products:joi.array().items({productId:joi.string().required().min(24).max(24),
                quantity:joi.number().required()
            }),
            phone:joi.string().required(),
            address:joi.string().required()
        })
    }