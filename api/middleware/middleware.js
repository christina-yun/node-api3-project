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

async function validateUser(req, res, next) {
  try{
    const { name } = req.body;
    if(!name || typeof name !== 'string' || !name.trim()) {
      next({ status: 400 , message: 'missing required name' })
    } else {
      next();
    }
  }
  catch(err){
    next();
  }
}
const postSchema = yup.object().shape({
  text: yup
    .string()
    .trim()
    .required('missing required text field')
    .min(1, 'min 1 char')
})
async function validatePost(req, res, next) {
  try{
    const validated = await postSchema.validate(req.body)

    req.body = validated;
    next();
  }
  catch(err){
    next({ status: 400, message: 'missing required text field'})
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}