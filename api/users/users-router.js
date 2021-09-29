const express = require('express');


const { validateUserId, validateUser, validatePost } = require('./../middleware/middleware'); 
const Users = require('./users-model');
const Posts = require('./../posts/posts-model');

const router = express.Router();

router.get('/', (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({
        message:'The users information could not be retrieved'
      });
    })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.post('/', validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(next)
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  const removedUser = await Users.getById(req.params.id)
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json(removedUser);
    })
    .catch(next)
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(next)
});

router.post('/:id/posts', validateUserId, validatePost, async(req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  
});

module.exports = router;