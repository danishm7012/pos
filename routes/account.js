const express = require("express");
const { Account } = require("../models/account");
const router = express.Router();

router.get("/get_all", async (req, res) => {
  try {
    const get_supplier = await Account.find({});
    if (get_supplier.length == 0)
      return res.json({
        success: false,
        error: "No account in list",
      });
    if (get_supplier.length > 0)
      return res.json({
        success: true,
        data: get_supplier,
      });
  } catch (ex) {
    res.json({
      success: false,
      message: "Server error occur",
    });
  }
});

module.exports = router;
