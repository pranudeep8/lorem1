const express = require('express');
const { body } = require('express-validator/check');

const feedController = require('../controllers/feed');

const router = express.Router();

// GET /feed/posts
router.post('/post', feedController.getPosts);

// POST /feed/post
router.post(
  '/getByDate',
  feedController.getByDate
);

module.exports = router;
