/*
matchRoutes.js 

Brian Nguyen 
18-06-2025

Handles uploading a single resume and multiple job descriptions,
returns match scores for each job using OpenAI GPT API.
*/

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { parseResume } = require('../match/parser');
const { getMatchScore } = require('../services/openaiService');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.fields([
  { name: 'resume', maxCount: 1 },
  { name: 'job', maxCount: 10 }
]), async (req, res) => {
  try {
    const resumeFile = req.files['resume'][0];
    const resumeExt = path.extname(resumeFile.originalname).toLowerCase();
    const resumeText = await parseResume(resumeFile.path, resumeExt);

    const jobFiles = req.files['job'];
    const matchResults = [];

    for (const jobFile of jobFiles) {
      const jobExt = path.extname(jobFile.originalname).toLowerCase();
      const jobText = await parseResume(jobFile.path, jobExt);
      const score = await getMatchScore(resumeText, jobText);

      matchResults.push({
        job: jobFile.originalname,
        score
      });
    }

    res.json({
      resume: resumeFile.originalname,
      matches: matchResults
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    // Clean up all uploaded files
    for (const field in req.files) {
      req.files[field].forEach(file => {
        fs.unlink(file.path, err => {
          if (err) console.error('Error deleting file:', err);
        });
      });
    }
  }
});

module.exports = router;
