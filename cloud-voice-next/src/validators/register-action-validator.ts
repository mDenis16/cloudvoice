import Joi from "joi";

export let registerActionSchema = () => {
  return Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      "string.base": `Username should be a type of 'text'`,
      "string.empty": `Username cannot be an empty field`,
      "string.min": `Username should have a minimum length of {#limit}`,
      "any.required": `Username is a required field`,
    }),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .min(3)
      .max(20)
      .required()
      .messages({
        "string.base": `Email should be a type of 'email'`,
        "string.empty": `Email cannot be an empty field`,
        "string.min": `Email should have a minimum length of {#limit}`,
        "any.required": `Email is a required field`,
      }),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(3)
      .max(128)
      .required()
      .messages({
        "string.base": `Password should be a type of 'text'`,
        "string.empty": `Password cannot be an empty field`,
        "string.min": `Password should have a minimum length of {#limit}`,
        "any.required": `Password is a required field`,
      }),
    inviteCode: [Joi.string(), Joi.number()],
  });
};
