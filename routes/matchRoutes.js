/*
matchRoutes.js 

Brian Nguyen 
18-06-2025

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
    { name: 'job', maxCount: 1 }
  ]), async (req, res) => {
    try {
      const resumeFile = req.files['resume'][0];
      const jobFile = req.files['job'][0];
  
      const resumeExt = path.extname(resumeFile.originalname).toLowerCase();
      const jobExt = path.extname(jobFile.originalname).toLowerCase();
  
      const resumeText = await parseResume(resumeFile.path, resumeExt);
      const jobText = await parseResume(jobFile.path, jobExt);

      const score = await getMatchScore(resumeText, jobText);
  
      res.json({
        score,
        resume: resumeText,
        job: jobText
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    } finally {
      // Clean up uploaded files
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
