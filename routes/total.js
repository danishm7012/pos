const express = require('express')
const router = express.Router()

const { Ledger } = require('../models/ledger')
const { Stock } = require('../models/stock')

router.get('/', async (req, res) => {
    // fetch where userID exists then aggregate the total
    const sumOfCustomer = await Ledger.aggregate([
        { $match: { userID: { $exists: true } } },
        { $group: { _id: null, total: { $sum: '$balance' } } },
    ])
    const sumOfSupplier = await Ledger.aggregate([
        { $match: { supplierID: { $exists: true } } },
        { $group: { _id: null, total: { $sum: '$balance' } } },
    ])

    const sumOfStock = await Stock.aggregate([
        { $group: { _id: null, total: { $sum: '$quantity' } } },
    ])

    res.send({
        sumOfSupplier: sumOfSupplier[0].total, sumOfCustomer: sumOfCustomer[0].total, sumOfStock: sumOfStock[0].total
    })
})

module.exports = router
