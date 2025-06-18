/*
matcher.js
Brian Nguyen
18-06-2025

Goal to match uploaded resumes and job descript using openai API

Supported file types: .pdf .docx  .txt


*/
const fs = require('fs');
const { getMatchScore } = require('../services/openaiService');

async function matchParsedFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);

  const resumeText = data.resume;
  const jobText = data.job;

  const score = await getMatchScore(resumeText, jobText);

  return { score };
}

module.exports = { matchParsedFile };
