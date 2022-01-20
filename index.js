const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const supplier = require('./routes/supplier')
const account = require('./routes/account')
const customer = require('./routes/customer')
const stock = require('./routes/stock')
const category = require('./routes/category')
const product = require('./routes/product')
const ledger = require('./routes/ledger')
const invoice = require('./routes/invoice')
const admin = require('./routes/admin')

const app = express()
const dotenv = require('dotenv')
dotenv.config()

//------Static file middleware-----//

console.log(process.env.ADMIN_PASSWORD)
app.use(express.static(__dirname))

//------Enable CORS-----//

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // For legacy browser support
}
app.use(cors(corsOptions))

//------express middleware-----//
app.use(express.json())

app.use('/api/supplier', supplier)
app.use('/api/account', account)
app.use('/api/customer', customer)
app.use('/api/stock', stock)
app.use('/api/admin', admin)
app.use('/api/category', category)
app.use('/api/product', product)
app.use('/api/ledger', ledger)
app.use('/api/invoice', invoice)
// app.use('/api/user', user)

// app.use('/api/manufactuer', car_manufactuer)
// app.use('/api/area', area);

//------Database connection-----//

console.log(process.env.DATABASE_CONECTION)

mongoose
  .connect(
    'mongodb+srv://Abubakar:DfohKvcRnMz7UOjm@cluster0.z1hqb.mongodb.net/pos_tabasum',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log('Connected to POS_tabasum....'))
  .catch((err) => console.log(err))

app.get('/', (req, res) => {
  res.send('helloo from pos....')
})

app.listen(process.env.PORT || 4001, () => {
  console.log('listening on port 4001')
  // console.log(process.env.NODE_ENV)
})
