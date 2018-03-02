const express = require('express')
const app = express()
const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
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

app.get('/products', (request, response) => {
  Product.findAll({ attributes: ['id', 'name', 'price' ]})
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

app.post('/products', (req, res) => {
  const product = req.body
  console.log(product)

  // insert the new data into our database
  Product.create(product).then(entity => {

    // send back the 201 Created status and the entity
    res.status(201).send(entity)
  })
})

app.put('/products/:id', (req, res) => {
  const productId = Number(req.params.id)
  const updates = req.body
  // find the product in the DB
  Product.findById(req.params.id)
    .then(entity => {
      // change the product and store in DB
      return entity.update(updates)
    })
    .then(final => {
      // respond with the changed product and status code 200 OK
      res.send(final)
    })
    .catch(error => {
      res.status(500).send({
        message: `Something went wrong`,
        error
      })
    })
})

app.delete('/products/:id', (req, res) => {
  const productId = Number(req.params.id)
  // delete the product from the DB
  // respond with 200 OK and a message
  Product.findById(req.params.id)
  .then(entity => {
    // change the product and store in DB
    return entity.destroy()
  })
  .then(_ => {
    // respond with the changed product and status code 200 OK
    res.send({
      message: 'The product was deleted succesfully'
    })
  })
  .catch(error => {
    res.status(500).send({
      message: `Something went wrong`,
      error
    })
  })
})
