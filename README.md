## ⚙️ Setup Instructions

### 📦 Prerequisites

Before you begin, make sure you have the following installed:

* [Node.js](https://nodejs.org/) (v18 or newer recommended)
* [npm](https://www.npmjs.com/)
* [curl](https://curl.se/) or [Postman](https://www.postman.com/) for API testing
* An [OpenAI API key](https://platform.openai.com/account/api-keys)

---

### 📁 Project Installation

```bash
git clone https://github.com/your-username/resume-matcher.git
cd resume-matcher
npm install
```

---

### 🔐 Configure Environment

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxx
```

> Your OpenAI key is required to generate match scores.

---

### 🚀 Start the Server

```bash
node app.js
```

Server will start at:
👉 `http://localhost:3000`

---

### 📄 Upload Resume & Job Descriptions

You can test the API with `curl`:

```bash
curl -X POST http://localhost:3000/api/upload \
  -F "resume=@uploads/BrianNguyen.pdf" \
  -F "job=@uploads/job1.txt" \
  -F "job=@uploads/job2.txt"
```

Or use Postman to POST to `/api/upload`
Upload 1 resume + up to 10 job description files.

---

### ✉️ Optional: n8n Email Integration

If match score ≥ threshold (default `0.50`), results can be POSTed to a [n8n webhook](https://n8n.io/).

* Webhook is configurable in `matchRoutes.js`
* n8n email node can format & send match results

---

### 🧾 Example Match Response

```json
{
  "resume": "BrianNguyen.pdf",
  "matches": [
    {
      "job": "google_swe.txt",
      "score": 0.91
    },
    {
      "job": "startup_fullstack.txt",
      "score": 0.73
    }
  ]
}
```

## 📎 How to Format a Job Description for Best Matching Results 

To get the most accurate match score from the resume matching system, write job descriptions in a clear, structured, and realistic format. The system works best with job posts that resemble real-world listings found on LinkedIn, Indeed, or company career pages.

---

### ✅ Recommended Format (Plain Text or .docx/.pdf with clear structure)

```
Job Title: Software Engineer

Company: TechNova Inc.
Location: Remote / Toronto, ON

We are seeking a skilled Software Engineer to help build scalable backend systems and APIs.

Responsibilities:
- Design and develop backend APIs using Node.js and Express
- Work with PostgreSQL and Redis for data storage
- Write automated tests for all new features
- Collaborate in an agile team environment

Requirements:
- Bachelor's degree in Computer Science or related field
- 2+ years of experience with JavaScript and backend systems
- Proficiency with RESTful APIs
- Experience using Git, Docker, and AWS or GCP

Preferred:
- Experience with TypeScript
- Familiarity with CI/CD pipelines and microservices

Benefits:
- Flexible remote work
- Health and dental benefits
- Annual training stipend
```

---

### 📌 Formatting Tips

* Use **clear section headers** (e.g., Responsibilities, Requirements)
* Use **bullet points** for duties and qualifications
* Avoid walls of text or paragraphs longer than 3 lines
* Write using **standard job language** (e.g., "Develop", "Maintain", "Deploy")
* Keep content focused on **skills, experience, and expectations**

---

### ❌ What to Avoid

* Copy/paste from styled web pages with layout formatting
* Dense, marketing-style paragraphs with little technical detail
* Unstructured lists or long narrative descriptions
* Overly generic job descriptions (e.g., "We are looking for a rockstar!")

---

### 🔄 Supported File Types

* `.txt` (recommended for clarity)
* `.pdf` (structured, extractable content)
* `.docx` (plain layout, no textboxes/tables preferred)

---

By following this structure, you'll help the system extract key fields more reliably and generate more accurate match scores.
