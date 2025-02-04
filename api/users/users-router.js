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
  User.getById(req.params.id)
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
  User.update(req.params.id, req.body)
    .then(updatedUser => {
      res.json(updatedUser)
    })
    .catch(next)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  User.remove(req.params.id)
    .then(user => {
      res.json(req.user)
    })
    .catch(next)
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  User.getUserPosts(req.params.id)
    .then(posts => {
      res.json(posts)
    })
    .catch(next)
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  Post.insert({ user_id: req.params.id, text: req.text})
    .then(post => {
      res.status(201).json(post)
    })
    .catch(next)
});

router.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: 'Error in database' });
});
module.exports = router;