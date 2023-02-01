 import joi from 'joi';

 export const headersValidator ={
    headers:joi.object().required().options({allowUnknown:true}).keys({
        authorization:joi.string().required()
    })}

    export const signupValidator = {
        body: joi
          .object()
          .required()
          .keys({
            userName: joi.string().required(),
            email: joi.string().email().required(),
            password: joi
              .string()
              .pattern(
                new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
              )
              .required(),
            cPassword: joi.string().valid(joi.ref("password")).required(),
            phone: joi.number(),
            DOB: joi.number(),
          
          })
      };   

      export const loginValidator = {
        body: joi
          .object()
          .required()
          .keys({
            email: joi.string().email().required(),
            password: joi
              .string()
              .pattern(
                new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
              )
              .required()
          })
      };
      export const confirmAndRefreshValidator = {
        params: joi.object().required().keys({
          token: joi.string().required()
        })
      };

      export const sendCodeValidator = {
        body: joi.object().required().keys({
          email: joi.string().email().required(),
        
        })
      };
      export const  forgetPasswordValidator = {
        body: joi
          .object()
          .required()
          .keys({
            code: joi.string().required(),
            password: joi
              .string()
              .pattern(
                new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
              )
              .required(),
              cPassword: joi.string().valid(joi.ref("password")).required()
          })
      };