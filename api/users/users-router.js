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

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  User.update(req.user, req.body)
    .then(updatedUser => {
      res.json(updatedUser)
    })
    .catch(next)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  User.remove(req.user)
    .then(removedUser => {
      
    })
    .catch(next)
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

router.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: 'Error in database' });
});
module.exports = router;