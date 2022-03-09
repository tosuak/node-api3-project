const express = require('express');

const User = require('./users-model');
const Post = require('../posts/posts-model');
const {validateUserId, validateUser, validatePost} = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
  User.get()
    .then(users => {
      res.json(users);
    })
    .catch(next);
});

router.get('/:id', validateUserId, (req, res, next) => {
  User.getById(req.user)
    .then(user => {
      res.json(user);
    })
    .catch(next);
});

router.post('/', validateUser, (req, res, next) => {
  User.insert(req.body)
    .then(newPost => {
      res.status(201).json(newPost);
    })
    .catch(next)
});

router.put('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use()
module.exports = router;