const fs = require('fs')
const uuid = require('uuid/v4')

let posts = {
  "allPosts": [
    {
      "id": "nc93ngh9",
      "title": "TITLE",
      "body": "This is the initial test post.  This is the contents of the post."
    }
  ]
}

function getAll () {
  return posts.allPosts
}

function getOne (id) {
  return posts.allPosts.filter(post => post.id === id)
}

function create (title, body) {
  const post = { id: uuid().slice(0, 8), title, body }
  posts.allPosts.push(post)
  return post
}

function update (selectedPost, title, body) {
  posts.allPosts.forEach(post => {
    if (post.id === selectedPost.id) {
      post.title = title
      post.body = body
    }
  })

  return posts.allPosts.filter(post => post.id === selectedPost.id)
}

function remove (selectedPost) {
  posts.allPosts = posts.allPosts.filter(post => post.id !== selectedPost.id)
}

module.exports = { getAll, getOne, create, update, remove }
