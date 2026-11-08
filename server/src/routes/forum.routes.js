const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forum.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.get('/posts', authenticate, forumController.getPosts);
router.post('/posts', authenticate, forumController.createPost);
router.get('/posts/:id', authenticate, forumController.getPostById);
router.post('/posts/:id/comments', authenticate, forumController.addComment);
router.post('/posts/:id/like', authenticate, forumController.toggleLike);

module.exports = router;

