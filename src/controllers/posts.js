const model = require('../models/post')

function getAll (req, res, next) {
  const posts = model.getAll()
  res.status(200).json({ posts })
}

function getOne (req, res, next) {
  const { id }  = req.params
  if (!id) return next({ status: 400, message: `Post ID required.` })

  const post = model.getOne(id)[0]
  if (post === undefined) return next({ status: 404, message: `No post with ID: ${id}.` })

  res.status(200).json({ post })
}

function create (req, res, next) {
  const { title, body } = req.body
  if (!title || !body) return next({ status: 400, message: `Posts need a title and body.` })

  const post = model.create(title, body)
  res.status(201).json({ post })
}

function update (req, res, next) {
  const { id } = req.params
  if (!id) return next({ status: 400, message: `Post ID required.` })

  const { title, body } = req.body
  if (!title || !body) return next({ status: 400, message: `Posts need a title and body.` })

  let post = model.getOne(id)
  if (post === undefined) return next({ status: 404, message: `No post with ID: ${id}.` })

  post = model.update(post[0], title, body)
  res.status(200).json({ post })
}

function remove (req, res, next) {
  const { id } = req.params
  if (!id) return next({ status: 400, message: `Post ID required.` })

  const post = model.getOne(id)[0]
  if (post === undefined) return next({ status: 404, message: `No post with ID: ${id}.` })

  model.remove(post)
  res.status(204).json()
}

module.exports = { getAll, getOne, create, update, remove }
