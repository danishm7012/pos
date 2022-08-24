const Joi = require("joi");
function stock_Validation(product) {
  const stock_Schema = Joi.object({
    product_name: Joi.string().required().min(1).max(120),
    supplier_name: Joi.string().required().min(1).max(120),
    buy_date: Joi.date().required(),
    product_per_carton: Joi.number(),
    quantity: Joi.number().required().min(1),
    buy_price: Joi.number().required().min(1),
    sale_price: Joi.number().required().min(1),
    paid_amount: Joi.number(),
  });
  return (result = stock_Schema.validate(product));
}

module.exports.stock_Validation = stock_Validation;
