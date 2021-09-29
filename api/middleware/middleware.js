const yup = require('yup');
const Users = require('./../users/users-model');

function logger(req, res, next) {
  console.log(`This is a ${req.method} rquest to ${req.originalUrl}`);
  next();
}

async function validateUserId(req, res, next) {
  try{
    const validatedId = await Users.getById(req.params.id);

    if(!validatedId){
      next({ status: 404, message: 'user not found'})
    } else {
      req.user = validatedId;
      next();
    }
  }
  catch(err){
    next(err);
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}