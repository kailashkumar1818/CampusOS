const { generateAIResponse } = require('../services/ai.service');
const { sendSuccess, sendError } = require('../utils/response.util');

/**
 * Handle AI Chat Query
 */
const chat = async (req, res, next) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return sendError(res, 'A non-empty prompt or message is required.', 400);
    }

    const aiResult = await generateAIResponse({
      prompt: message.trim(),
      history: Array.isArray(history) ? history : [],
      user: req.user,
    });

    return sendSuccess(res, 'AI response generated successfully', {
      reply: aiResult.reply,
      model: aiResult.model,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[AI Controller] Error:', error);
    return sendError(res, error.message || 'Unable to generate AI response. Please try again.', 500);
  }
};

/**
 * Get context-aware quick suggestions based on user role
 */
const getSuggestions = async (req, res, next) => {
  try {
    const role = req.user?.role || 'STUDENT';

    let suggestions = [];
    if (role === 'FACULTY') {
      suggestions = [
        'Draft a 5-question quiz for Operating Systems (Deadlocks & Semaphores)',
        'Create a Bloom\'s Taxonomy mapped question paper for Unit 3 Machine Learning',
        'Outline a lesson plan for Cloud DevOps CI/CD pipelines',
        'Draft a rubric for evaluating Final Year Capstone Projects',
        'Summarize recent research trends in Quantum Machine Learning for grant proposal',
        'Write an email announcement to students regarding continuous assessment test',
      ];
    } else {
      suggestions = [
        'Explain Virtual Memory & Page Replacement algorithms with examples',
        'What are the key differences between Process and Thread in OS?',
        'Give me 5 practice questions for Machine Learning Mid-term exam',
        'How is attendance percentage and OD/ML calculated in CampusOS?',
        'Show me Java code for Multi-threading using ThreadPoolExecutor',
        'Explain the Bellman-Ford algorithm step-by-step',
      ];
    }

    return sendSuccess(res, 'AI suggestions fetched', {
      role,
      suggestions,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  chat,
  getSuggestions,
};

