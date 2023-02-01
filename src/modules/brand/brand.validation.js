import joi from 'joi'

export const brandValidator = {
    body: joi.object().required().keys({
      name: joi.string().required(),
    })
  };

  export const updateBrandValidator = {
    body: joi.object().required().keys({
      name: joi.string(),
     
    }),
    params: joi
      .object()
      .required()
      .keys({
        _id: joi.string().max(24).min(24).required()
      })
  };