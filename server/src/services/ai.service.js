/**
 * CampusOS AI Service powered by Google Gemini API
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Prioritized list of active Gemini models
const CANDIDATE_MODELS = [
  'gemini-3.5-flash',
  'gemini-3.1-flash-lite',
  'gemini-3.8-flash',
  'gemini-flash-latest',
];

/**
 * Clean & normalize history so turns strictly alternate: user -> model -> user -> model
 */
function sanitizeConversationHistory(history, currentPrompt) {
  const contents = [];
  let expectedRole = 'user';

  // Take up to the last 8 turns of conversation
  const recent = Array.isArray(history) ? history.slice(-8) : [];

  for (const item of recent) {
    if (!item || !item.text || typeof item.text !== 'string' || !item.text.trim()) continue;

    const itemRole = (item.role === 'model' || item.role === 'assistant') ? 'model' : 'user';

    if (itemRole === expectedRole) {
      contents.push({
        role: itemRole,
        parts: [{ text: item.text.trim() }]
      });
      expectedRole = expectedRole === 'user' ? 'model' : 'user';
    }
  }

  // Ensure currentPrompt is added as the final 'user' turn
  if (expectedRole === 'model' && contents.length > 0) {
    // If the last turn was 'user', we can append or replace
    contents.push({
      role: 'model',
      parts: [{ text: 'Understood. Please ask your question.' }]
    });
  }

  contents.push({
    role: 'user',
    parts: [{ text: currentPrompt.trim() }]
  });

  return contents;
}

/**
 * Generate AI Response with automatic model fallback
 * @param {Object} params
 * @param {string} params.prompt - Current user question/query
 * @param {Array} params.history - Previous messages in conversation [{role: 'user'|'model', text: string}]
 * @param {Object} params.user - Authenticated user details {firstName, lastName, role, ...}
 * @returns {Promise<{reply: string, model: string}>}
 */
async function generateAIResponse({ prompt, history = [], user = {} }) {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured on the server. Please check .env file.');
  }

  const role = user?.role || 'STUDENT';
  const userName = user?.firstName
    ? `${user.firstName} ${user.lastName || ''}`.trim()
    : (role === 'FACULTY' ? 'Professor' : 'Rahul Kumar');

  // Build specialized system instructions
  let systemInstruction = '';
  if (role === 'FACULTY') {
    systemInstruction = `You are the CampusOS Faculty Academic & Research Copilot, dedicated to assisting university professors and lecturers (such as Dr. ${userName}).
Your responsibilities:
1. Assist in creating course lesson plans, syllabus outlines, and lecture notes.
2. Generate examination question papers and assignment questions mapped to Bloom's Taxonomy levels (Remembering, Understanding, Applying, Analyzing, Evaluating, Creating).
3. Design grading rubrics, laboratory problem sets, and continuous assessment schemes.
4. Support academic research, grant proposal drafting, literature review structuring, and student project evaluation.
5. Provide professional, pedagogically sound, structured responses using clean Markdown, bold headers, and bullet points.`;
  } else {
    systemInstruction = `You are the CampusOS Student Academic Mentor, dedicated to helping student ${userName} (Enrollment: ${user?.studentProfile?.enrollmentNo || 'EN2024CS042'}, Semester 5 CSE).
Your responsibilities:
1. Explain academic concepts in clear, easy-to-understand terms with practical real-world examples and diagrams/tables where helpful.
2. Provide step-by-step guidance for programming subjects: Operating Systems (CPU scheduling, Paging, Deadlocks), Machine Learning, Computer Organization, Advanced Java, DevOps (RHCSA).
3. Help with exam preparation (CT-1, CT-2, Semester finals) by offering concise summaries, memory aids, and practice questions.
4. Answer university regulation doubts: Minimum 75% attendance required for semester exam hall tickets; On-Duty (OD) / Medical Leave (ML) permits up to 15% of scheduled slots; Continuous assessment internal weightage.
5. Be encouraging, precise, and format answers using Markdown, bullet points, and code blocks with syntax highlighting.`;
  }

  const contents = sanitizeConversationHistory(history, prompt);

  let lastError = null;

  // Try candidate models in order of priority
  for (const model of CANDIDATE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemInstruction }]
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (response.ok && data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return {
          reply: data.candidates[0].content.parts[0].text,
          model,
        };
      }

      const errMsg = data?.error?.message || `HTTP ${response.status}`;
      console.warn(`[AI Service] Model ${model} returned: ${errMsg}. Trying fallback...`);
      lastError = new Error(errMsg);
    } catch (err) {
      console.warn(`[AI Service] Error contacting model ${model}: ${err.message}. Trying fallback...`);
      lastError = err;
    }
  }

  throw new Error(lastError ? `AI Assistant temporarily unavailable: ${lastError.message}` : 'Failed to generate AI response.');
}

module.exports = {
  generateAIResponse,
};
