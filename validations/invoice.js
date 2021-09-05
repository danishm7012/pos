const Joi = require('joi');
function invoice_Validation(product) {
    const product_Schema = Joi.object
        ({
            customer_name: Joi.string().required().min(1).max(120),
            date: Joi.string().required(),
            products: Joi.string().required(),
            services: Joi.array().items(Joi.object
                ({
                    product_name: Joi.string().required(),
                    quantity: Joi.number().required(),
                    sale_price: Joi.number().required(),
                })),
        })
    return result = product_Schema.validate(product);
}

module.exports.invoice_Validation = invoice_Validation;


