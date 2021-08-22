const Joi = require('joi');
function product_Validation(product) {
    const product_Schema = Joi.object
        ({
            product_name: Joi.string().required().min(1).max(120),
            supplier_name: Joi.string().required().min(1).max(120),
            buy_date: Joi.date().required().min(1).max(120),
            total_carton: Joi.number().required().min(1).max(120),
            quantity: Joi.number().required().min(1),
            buy_price: Joi.number().required().min(1),
            sale_price: Joi.number().required().min(1),
        })
    return result = product_Schema.validate(product);
}

module.exports.product_Validation = product_Validation;


