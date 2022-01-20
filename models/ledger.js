const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema(
  {
    supplierID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Supplier",
    },
    serielNumber: {
      type: String,
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
);

const Ledger = mongoose.model("Ledger", ledgerSchema);
module.exports.Ledger = Ledger;
