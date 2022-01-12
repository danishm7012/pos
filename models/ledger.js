const mongoose = require('mongoose')

const ledgerSchema = new mongoose.Schema(
  {
    serielNumber: {
      type: String,
      required: true,
    },
    particular: {
      type: String,
      required: true,
    },
    chqDate: {
      type: Date,
      required: true,
    },
    chequeNo: {
      type: Number,
      required: true,
    },
    debit: {
      type: Number,
      required: true,
    },
    credit: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Ledger = mongoose.model('Ledger', ledgerSchema)
module.exports.Ledger = Ledger
