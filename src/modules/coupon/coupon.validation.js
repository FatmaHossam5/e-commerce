import joi from 'joi';



export const couponValidator = {
    body: joi.object().required().keys({
        name: joi.string().required(),
        amount:joi.number().required(),
        expireDate:joi.date().required
   
    })
  };


  export const updateCouponValidator = {
    body: joi.object().required().keys({
      name: joi.string(),
      
      amount: joi.number()
    }),
    params: joi
      .object()
      .required()
      .keys({
        _id: joi.string().max(24).min(24).required()
      })
  };

  
  export const deleteCouponValidator = {
 
    params: joi
      .object()
      .required()
      .keys({
        _id: joi.string().max(24).min(24).required()
      })
  };