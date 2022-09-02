const Joi = require('joi');
function category_Validation(category) {
    const category_Schema = Joi.object
        ({
            category_name: Joi.string().required().min(1).max(120),
        })
    return result = category_Schema.validate(category);
}

module.exports.category_Validation = category_Validation;


