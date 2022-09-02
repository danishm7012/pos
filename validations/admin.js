const Joi = require('joi');

function admin_Validation(admin) {
    const admin_Schema = Joi.object({
        first_name: Joi.string().required().min(3).max(120),
        last_name: Joi.string().required().min(3).max(120),
        email: Joi.string().email().required().min(3).max(120),
        password: Joi.string().min(6).max(30).required(),
        type: Joi.string()
    })
    return result = admin_Schema.validate(admin);
}
module.exports.admin_Validation = admin_Validation;

