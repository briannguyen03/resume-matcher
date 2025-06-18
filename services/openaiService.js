const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function getMatchScore(resumeText, jobText) {
  const prompt = `
You are a recruiter for software companies that evaluates how well a candidate's resume matches a job description.

Return a single float score between 0 and 1 (no explanation).

Candidate Resume:
"""${resumeText}"""

Job Description:
"""${jobText}"""

Score (0 to 1):`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.2
  });

  const score = parseFloat(response.choices[0].message.content.trim());
  return score;
}

module.exports = { getMatchScore };
