const User = require('../users/users-model');

function logger(req, res, next) {
  const timeStamp = new Date().toLocaleString();
  console.log(`${req.method} ${req.url} ${timeStamp}`);
  next();
}

function validateUserId(req, res, next) {
  User.getById(req.params.id)
    .then(id => {
      if (!id) {
        res.status(404).json({ message: 'user not found' });
      } else {
      req.user = id;
    }
  }) 
    .catch(err => console.log(err))

  next();
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name || !name.trim()) {
    res.status(400).json({ message: 'missing required name field' });
  }
  next();
}

function validatePost(req, res, next) {
  
  next();
}

module.exports = {logger, validateUserId, validateUser, validatePost}