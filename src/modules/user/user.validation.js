import joi from'joi';

export const headersValidator ={
    headers:joi.object().required().options({allowUnknown:true}).keys({
        authorization:joi.string().required()
    })}
export const updatePassValidation={
    body:joi.object().required().keys({
        oldPassword: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        newPassword :joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
       
    })
}
export const blockValidation ={
    body:joi.object().required().keys({
        _id:joi.string().required().min(24).max(24),
    })
}

export const getUserByIdValidation={
    params:joi.object().required().keys({
        id:joi.string().required().min(24).max(24)
    })
}