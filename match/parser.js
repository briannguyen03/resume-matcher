/*
parser.js
Brian Nguyen
18-06-2025

Goal to parse uploaded resumes into plain text for matching logic. 

Supported file types: .pdf .docx  .txt

Upload using API endpoints

*/

const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

async function parseResume(filePath, ext) {
    const fs = require('fs');
    const pdfParse = require('pdf-parse');
    const mammoth = require('mammoth');
  
    if (ext === '.pdf') {
      const buffer = fs.readFileSync(filePath);
      const data = await pdfParse(buffer);
      return data.text;
    }
  
    if (ext === '.docx') {
      const buffer = fs.readFileSync(filePath);
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    }
  
    if (ext === '.txt') {
      return fs.readFileSync(filePath, 'utf-8');
    }
  
    throw new Error('Unsupported file type');
}
  
module.exports = { parseResume };
