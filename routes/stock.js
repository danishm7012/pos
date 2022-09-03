const express = require("express");
const { check_stock } = require("../middlewares/stock");
const { Stock } = require("../models/stock");
const { Supplier } = require("../models/supplier");
const { Account } = require("../models/account");
const { stock_Validation } = require("../validations/stock");
const router = express.Router();

router.post("/add", async (req, res) => {
  const result = await stock_Validation(req.body);

  if (result.error != null) {
    return res.json({
      success: false,
      message: result.error.details[0].message,
    });
  }
  var supplier = await Supplier.findOne({
    supplier_name: req.body.supplier_name,
  });
  if (!supplier) {
    return res.json({
      success: false,
      message: "supplier not found!",
    });
  }

  Account.findOne({ userID: supplier._id })
    .then(async (account) => {
      Stock.findOne({ product_name: req.body.product_name })
        .then((stock) => {
          const stockFields = {
            product_name: req.body.product_name,
            supplier_name: req.body.supplier_name,
            buy_date: req.body.buy_date,
            quantity: req.body.quantity,
            buy_price: req.body.buy_price,
            sale_price: req.body.sale_price,
            total_bill: req.body.quantity * req.body.buy_price,
            paid_amount: req.body.paid_amount,
          };
          if (stock) {
            //updating quantity
            stockFields.quantity = parseInt(stock.quantity) + parseInt(stockFields.quantity);
            // Update
            Stock.findOneAndUpdate(
              { product_name: req.body.product_name },
              { $set: stockFields },
              { new: true }
            ).then((stock) =>
              res.json({
                success: true,
                message: "Stock updated successfully!",
                data: stock,
              })
            );
          } else {
            // Create

            new Stock(stockFields).save().then((stock) =>
              res.json({
                success: true,
                message: "New stock added successfully!",
                data: stock,
              })
            );
          }
        })
        .catch((err) =>
          res.json({
            success: false,
            message: err.message,
          })
        );
    })
    .catch((err) => {
      res.json({
        success: false,
        message: "account no found",
        data: err.message,
      });
    });

  // const get_stock = await Stock.findOne({
  //   product_name: req.body.product_name,
  //   supplier_name: req.body.supplier_name,
  //   buy_price: req.body.buy_price,
  //   sale_price: req.body.sale_price,
  // })
  // console.log('get stock:', get_stock)
  // if (get_stock != null) {
  //   var supplier = await Supplier.findOne({
  //     supplier_name: req.body.supplier_name,
  //   });
  //   if (!supplier) {
  //     res.json({
  //       success: false,
  //       message: "Supplier does not exist!",
  //     });
  //   }
  // }
  //   console.log("new record");

  //   console.log("inside  record");
  //   const new_stock = new Stock({
  //     product_name: req.body.product_name,
  //     supplier_name: req.body.supplier_name,
  //     buy_date: req.body.buy_date,
  //     product_per_carton: req.body.product_per_carton,
  //     quantity: req.body.quantity,
  //     buy_price: req.body.buy_price,
  //     sale_price: req.body.sale_price,
  //     total_bill: req.body.quantity * req.body.buy_price,
  //     paid_amount: req.body.paid_amount,
  //   });

  //   console.log("before saving");
  //   const add_stock = await new_stock.save();
  //   console.log("after saving");
  //   var total1 = add_stock.total_bill - add_stock.paid_amount;

  //   var supplier = await Supplier.findOne({
  //     supplier_name: req.body.supplier_name,
  //   });
  //   var find_supplier = await Supplier.findOneAndUpdate(
  //     {
  //       supplier_name: req.body.supplier_name,
  //     },
  //     {
  //       previous_balance: supplier.previous_balance + total1,
  //     }
  //   );

  //   return res.json({
  //     success: true,
  //     message: "Stock added successfully",
  //     data: add_stock,
  //   });
});

router.put("/update/:stock_id", check_stock, async (req, res) => {
  const result = stock_Validation(req.body);
  if (result.error != null) {
    return res.json({
      success: false,
      message: result.error.details[0].message,
    });
  }
  const get_stock = await Stock.findOneAndUpdate(
    {
      _id: req.params.stock_id,
    },
    {
      product_name: req.body.product_name,
      supplier_name: req.body.supplier_name,
      buy_date: req.body.buy_date,
      product_per_carton: req.body.product_per_carton,
      quantity: req.body.quantity,
      buy_price: req.body.buy_price,
      sale_price: req.body.sale_price,
    },
    { new: true }
  );
  //apply condionif supplier updated then fo followimg
  return res.json({
    success: true,
    message: "Stock Updated Successfully...",
    data: get_stock,
  });
  // }
  // catch (err) {
  //     res.json({
  //         success: false,
  //         message: err
  //     })
  //}
});

router.get("/get_all", async (req, res) => {
  try {
    const get_stock = await Stock.find({});
    if (get_stock.length == 0)
      return res.json({
        success: false,
        error: "No stock in list",
      });
    let stock_list = [];

    if (get_stock.length > 0)
      get_stock.forEach((stock) => {
        const index = stock_list.findIndex((object) => {
          return object.product_name == stock.product_name;
        });
        if (index === -1) {
          stock_list.push({
            ...stock,
          });
        } else {
          stock_list[index].quantity += stock.quantity;
        }
      });

    return res.json({
      success: true,
      data: get_stock,
    });
  } catch (ex) {
    res.json({
      success: false,
      message: "Server error occur",
    });
  }
});

router.get("/get_all/:supplier_name", async (req, res) => {
  try {
    const get_stock = await Stock.find({
      supplier_name: req.params.supplier_name,
    });
    if (get_stock.length == 0)
      return res.json({
        success: false,
        error: "No stock invoice  in list",
      });
    if (get_stock.length > 0)
      return res.json({
        success: true,
        data: get_stock,
      });
  } catch (ex) {
    res.json({
      success: false,
      message: "Server error occur",
    });
  }
});
router.get("/get/:stock_id", check_stock, async (req, res) => {
  try {
    return res.json({
      success: false,
      data: req.stock,
    });
  } catch (ex) {
    res.json({
      success: false,
      message: "Server error occur",
    });
  }
});

router.delete("/delete/:stock_id", check_stock, async (req, res) => {
  try {
    const get_stock = await Stock.findOneAndRemove(
      { _id: req.params.stock_id },
      { new: true }
    );
    return res.json({
      success: false,
      error: "stock deleted successfully",
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
    const get_stock = await Stock.countDocuments({});
    if (get_stock == 0)
      return res.json({
        success: false,
        error: "No stock in list",
      });
    if (get_stock > 0)
      return res.json({
        success: true,
        data: get_stock,
      });
  } catch (ex) {
    res.json({
      success: false,
      message: "Server error occur",
    });
  }
});

module.exports = router;
