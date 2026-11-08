const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');
const { authenticate } = require('../middleware/auth.middleware');

// Protected AI routes (Accessible to both Student and Faculty)
router.post('/chat', authenticate, aiController.chat);
router.get('/suggestions', authenticate, aiController.getSuggestions);

module.exports = router;

