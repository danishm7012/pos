const Joi = require('joi')
function ledger_Validation(ledger) {
  const ledger_Schema = Joi.object({
    serielNumber: Joi.string().required(),
    particular: Joi.string().required(),
    chqDate: Joi.date().required(),
    chequeNo: Joi.number().required(),
    debit: Joi.number().required(),
    credit: Joi.number().required(),
    balance: Joi.number().required().min(1),
  })
  return (result = ledger_Schema.validate(ledger))
}

module.exports.ledger_Validation = ledger_Validation
