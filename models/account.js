const mongoose = require("mongoose");

const account_Schema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
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

const Account = mongoose.model("Account", account_Schema);
module.exports.Account = Account;
