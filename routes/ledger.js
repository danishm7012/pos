const express = require("express");

const { Ledger } = require("../models/ledger");
const { ledger_Validation } = require("../validations/ledger");
const router = express.Router();

router.post("/add", async (req, res) => {
  const result = ledger_Validation(req.body);
  if (result.error != null) {
    return res.json({
      success: false,
      message: result.error.details[0].message,
    });
  }
  const new_record = new Ledger({
    serielNumber: req.body.serielNumber,
    supplierID: req.body.supplierID,
    particular: req.body.particular,
    chqDate: req.body.chqDate,
    chequeNo: req.body.chequeNo,
    debit: req.body.debit,
    credit: req.body.credit,
    balance: req.body.balance,
  });

  const add_record = await new_record.save();

  return res.json({
    success: true,
    message: "Record added successfully",
    data: add_record,
  });
});

router.put("/update/:record_id", async (req, res) => {
  const result = ledger_Validation(req.body);
  if (result.error != null) {
    return res.json({
      success: false,
      message: result.error.details[0].message,
    });
  }
  const get_record = await Ledger.findOneAndUpdate(
    {
      _id: req.params.record_id,
    },
    {
      serielNumber: req.body.serielNumber,
      particular: req.body.particular,
      chqDate: req.body.chqDate,
      chequeNo: req.body.chequeNo,
      debit: req.body.debit,
      credit: req.body.credit,
      balance: req.body.balance,
    },
    { new: true }
  );
  //apply condionif supplier updated then fo followimg
  return res.json({
    success: true,
    message: "Record Updated Successfully...",
    data: get_record,
  });
  // }
  // catch (err) {
  //     res.json({
  //         success: false,
  //         message: err
  //     })
  //}
});

router.get("/all", async (req, res) => {
  try {
    const get_records = await Ledger.find({});
    if (get_records.length == 0)
      return res.json({
        success: false,
        error: "No record in ledger",
      });
    if (get_records.length > 0)
      return res.json({
        success: true,
        data: get_records,
      });
  } catch (ex) {
    res.json({
      success: false,
      message: "Server error occur",
    });
  }
});

router.get("/get/:record_id", async (req, res) => {
  Ledger.findById(req.params.record_id)
    .then((record) => {
      return res.json({
        success: true,
        record,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: "Record not found!",
      });
    });
});
router.get("/getsupplierledger/:supplierID", async (req, res) => {
  console.log(req.params.supplierID);
  Ledger.find({ supplierID: req.params.supplierID })
    .then((records) => {
      let total_credit = 0,
        total_debit = 0;

      records.forEach((x) => {
        total_credit = total_credit + x.credit;
        total_debit = total_debit + x.debit;
      });

      return res.json({
        success: true,
        data: { total_credit, total_debit, records },
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: "Record not found!",
      });
    });
});

router.delete("/delete/:record_id", async (req, res) => {
  try {
    const get_record = await Ledger.findOneAndRemove(
      { _id: req.params.record_id },
      { new: true }
    );
    return res.json({
      success: false,
      error: "record deleted successfully",
    });
  } catch (ex) {
    res.json({
      success: false,
      message: "Server error occur",
    });
  }
});

router.get("/total", async (req, res) => {
  try {
    const get_product = await Product.countDocuments({});
    if (get_product == 0)
      return res.json({
        success: false,
        error: "No product in list",
      });
    if (get_product > 0)
      return res.json({
        success: true,
        data: get_product,
      });
  } catch (ex) {
    res.json({
      success: false,
      message: "Server error occur",
    });
  }
});

module.exports = router;
