import joi from 'joi';


export const cartValidator = {
    body: joi
      .object()
      .required()
      .keys({
        products: joi.array().required(), 
      })
  };   