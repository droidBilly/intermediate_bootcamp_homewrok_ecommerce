const express = require('express')
const app = express()
const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres')

app.listen(4001, () => console.log('Running on port 4001'))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})

const Product = sequelize.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: Sequelize.STRING
}, {
  tableName: 'products',
  timestamps: false
})

Product.findAll()
  .then(result => {
    console.log({result} )
  })

app.get('/products', (request, response) => {
  Product.findAll()
    .then(result => {
      response.send( result )
    })
    .catch(err => {
      response.code(404)
      response.send( { message: 'Sorry, no products found!' })
    })
})


app.get('/products/:id', (request, response) => {
  const productId = request.params.id
  Product.findById(productId).then(product => {
    if (product) {
      response.send(product)
    }
    else {
      response.status(404)
      response.json ({ message: "No product with this id!"})
    }
  })
})
