import Joi from "joi";

export let friendRespondActionSchema = () => {
  return Joi.object({
    respond: Joi.boolean().invalid(false),
    id: Joi.number().required()
  });
};
