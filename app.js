const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const uuid = require('uuid/v4')
const port = process.env.PORT || 5000
const app = express()

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(bodyParser.json())

const postsRouter = require('./src/routes/posts')
app.use('/', postsRouter)

app.use((req, res, next) => { next({ status: 404, message: 'Route not found' }) })

app.use((err, req, res, next) => {
  console.error(err)

  const errorToReturn = {}
  errorToReturn.status = err.status || 500
  errorToReturn.message = err.message || 'Something went wrong'
  if (process.env.NODE_ENV !== 'production') errorToReturn.stack = err.stack

  res.status(errorToReturn.status).json(errorToReturn)
})

const listener = () => { console.log(`Listening on port ${port}`) }
app.listen(port, listener)

module.exports = app
