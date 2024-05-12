import Joi from "joi";

export let friendInviteActionSchema = () => {
  return Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      "string.base": `Username should be a type of 'text'`,
      "string.empty": `Username cannot be an empty field`,
      "string.min": `Username should have a minimum length of {#limit}`,
      "any.required": `Username is a required field`,
    }),
  });
};
