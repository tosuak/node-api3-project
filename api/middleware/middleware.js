const User = require('../users/users-model');

function logger(req, res, next) {
  const timeStamp = new Date().toLocaleString();
  console.log(`${req.method} ${req.url} ${timeStamp}`);
  next();
}

function validateUserId(req, res, next) {
  let id = req.params.id;
  
  User.getById(id)
    .then(id => {
      if (!id) {
        res.status(404).json({ message: 'user not found' });
      } 
    })
    .catch(err => console.log(err))

  req.user = id;
  next();
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: 'missing required name field' });
  }
  next();
}

function validatePost(req, res, next) {
  
  next();
}

module.exports = {logger, validateUserId, validateUser, validatePost}