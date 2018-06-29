const posts = require('../../data/posts')
const fs = require('fs')
const uuid = require('uuid/v4')

function getAll () {
  return posts.allPosts
}

function getOne (id) {
  return posts.allPosts.filter(post => post.id === id)
}

function create (title, body) {
  const post = { id: uuid().slice(0, 8), title, body }

  const postsFile = fs.readFileSync('./data/posts.json')
  const blog = JSON.parse(postsFile)
  blog.allPosts.push(post)

  fs.writeFileSync('./data/posts.json', JSON.stringify(blog), 'utf-8')

  return post
}

function update (selectedPost, title, body) {
  const postsFile = fs.readFileSync('./data/posts.json')
  let blog = JSON.parse(postsFile)
  let updatedBlog = []

  blog.allPosts.forEach(post => {
    if (post.id === selectedPost.id) {
      post.title = title
      post.body = body
    }
    updatedBlog.push(post)
  })

  blog.allPosts = updatedBlog
  fs.writeFileSync('./data/posts.json', JSON.stringify(blog), 'utf-8')

  return blog.allPosts.filter(blog => blog.id === selectedPost.id)
}

function remove (selectedPost) {
  const postsFile = fs.readFileSync('./data/posts.json')
  let blog = JSON.parse(postsFile)
  let updatedBlog = []

  blog.allPosts.forEach(post => { if (post.id !== selectedPost.id) updatedBlog.push(post) })

  blog.allPosts = updatedBlog
  fs.writeFileSync('./data/posts.json', JSON.stringify(blog), 'utf-8')

  return selectedPost
}

module.exports = { getAll, getOne, create, update, remove }
