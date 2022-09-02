const express = require('express')
const { check_customer, add_customer } = require('../middlewares/customer')
const { Customer } = require('../models/customer')
const { Payment } = require('../models/payments')
const { Account } = require('../models/account')
const { Ledger } = require('../models/ledger')
const { customer_Validation } = require('../validations/customer')
const router = express.Router()

router.post('/add', add_customer, async (req, res) => {
  const result = customer_Validation(req.body)
  if (result.error != null) {
    return res.json({
      success: false,
      message: result.error.details[0].message,
    })
  }
  const new_customer = new Customer({
    customer_name: req.body.customer_name,
    contact_no: req.body.contact_no,
    address: req.body.address,
    customer_email: req.body.customer_email,
    previous_balance: req.body.previous_balance,
  })
  const add_customer = await new_customer.save()
  const new_account = new Account({
    userID: add_customer._id,
    balance: req.body.previous_balance,
  })
  const add_account = await new_account.save()
  add_customer.previous_balance = add_account.balance

  const new_record = new Ledger({
    userID: add_customer._id,
    particular: 'Opening balance',
    chqDate: 0,
    chequeNo: 0,
    debit: 0,
    credit: 0,
    balance: req.body.previous_balance,
  })

  await new_record.save()
  data = { customer: add_customer, customerAccount: add_account }
  //how to check validation add_customer return ok result
  return res.json({
    success: true,
    message: 'customer added Successfully...',
    data,
  })
})

router.post('/add_payment', async (req, res) => {
  let ammount
  Account.findOne({ userID: req.body.customerID })
    .then(async (account) => {
      if (req.body.debit) {
        ammount = account.balance - req.body.ammount
      } else {
        ammount = account.balance + req.body.ammount
      }

      account.balance = ammount
      await account.save()

      const debit = req.body.debit ? req.body.ammount : 0
      const credit = req.body.debit ? 0 : req.body.ammount
      const new_record = new Ledger({
        userID: req.body.customerID,
        particular: req.body.particular,
        chqDate: req.body.chqDate,
        chequeNo: req.body.chequeNo,
        debit,
        credit,
        balance: ammount,
      })

      const add_record = await new_record.save()
      res.json({
        success: true,
        message: 'Payment successfully!',
        data: { account, add_record },
      })
    })
    .catch((err) => {
      res.json({
        success: false,
        message: 'Account not found',
        data: err.message,
      })
    })
})

router.get('/get_all_payments', async (req, res) => {
  try {
    const get_payment = await Payment.find({ from: 'customer' })
    if (get_payment.length == 0)
      return res.json({
        success: false,
        error: 'No payment in list',
      })
    if (get_payment.length > 0)
      return res.json({
        success: true,
        data: get_payment,
      })
  } catch (ex) {
    res.json({
      success: false,
      message: 'Server error occur',
    })
  }
})
router.get('/get_all', async (req, res) => {
  try {
    const get_customer = await Customer.find({})
    if (get_customer.length == 0)
      return res.json({
        success: false,
        error: 'No customer in list',
      })
    if (get_customer.length > 0)
      return res.json({
        success: true,
        data: get_customer,
      })
  } catch (ex) {
    res.json({
      success: false,
      message: 'Server error occur',
    })
  }
})

router.put('/update/:customer_id', check_customer, async (req, res) => {
  try {
    const result = customer_Validation(req.body)
    if (result.error != null) {
      return res.json({
        success: false,
        message: result.error.details[0].message,
      })
    }
    const get_customer = await Customer.findOneAndUpdate(
      {
        _id: req.params.customer_id,
      },
      {
        customer_name: req.body.customer_name,
        contact_no: req.body.contact_no,
        customer_email: req.body.customer_email,
        address: req.body.address,
        previous_balance: req.body.previous_balance,
      },
      { new: true }
    )
    //apply condionif customer updated then fo followimg
    return res.json({
      success: true,
      message: 'customer Updated Successfully...',
      data: get_customer,
    })
  } catch (err) {
    res.json({
      success: false,
      message: err,
    })
  }
})

router.get('/get_all', async (req, res) => {
  try {
    const get_customer = await Customer.find({})
    if (get_customer.length == 0)
      return res.json({
        success: false,
        error: 'No customer in list',
      })
    if (get_customer.length > 0)
      return res.json({
        success: true,
        data: get_customer,
      })
  } catch (ex) {
    res.json({
      success: false,
      message: 'Server error occur',
    })
  }
})

router.get('/get/:customer_id', check_customer, async (req, res) => {
  try {
    return res.json({
      success: false,
      data: req.customer,
    })
  } catch (ex) {
    res.json({
      success: false,
      message: 'Server error occur',
    })
  }
})

router.delete('/delete/:customer_id', check_customer, async (req, res) => {
  try {
    const get_customer = await Customer.findOneAndRemove(
      { _id: req.params.customer_id },
      { new: true }
    )
    return res.json({
      success: false,
      error: 'customer deleted successfully',
    })
  } catch (ex) {
    res.json({
      success: false,
      message: 'Server error occur',
    })
  }
})

router.get('/total', async (req, res) => {
  try {
    const get_customer = await Customer.countDocuments({})
    if (get_customer == 0)
      return res.json({
        success: false,
        error: 'No customer in list',
      })
    if (get_customer > 0)
      return res.json({
        success: true,
        data: get_customer,
      })
  } catch (ex) {
    res.json({
      success: false,
      message: 'Server error occur',
    })
  }
})

module.exports = router
