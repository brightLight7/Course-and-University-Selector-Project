# Course & University Selector

A full-stack decision-support system that helps international students explore suitable UK courses and universities through a guided questionnaire and AI-assisted recommendations.

## Overview

Choosing a university can involve comparing large amounts of unfamiliar information. This project turns a student's preferences into a short, ranked set of suggestions drawn from a curated dataset. The recommendation layer explains why each result may suit the student's answers; it is designed as guidance rather than an automated admissions decision.

This project was developed as my final-year Computer Science project at Kingston University.

## Features

- Ten-step preference questionnaire
- Ranked course and university recommendations
- Personalised explanations generated from the user's answers
- Recommendations restricted to the curated application dataset
- Course comparison details, including assessment information
- Account registration and password hashing
- Saved recommendation attempts for registered users
- Responsive React interface

## How it works

1. The user completes the preference questionnaire.
2. The React frontend sends the answers to the Flask API.
3. The API loads the available courses and universities from PostgreSQL.
4. The recommendation layer asks the OpenAI model to rank only items from that dataset and return structured JSON.
5. The API enriches and returns the ranked results, which can optionally be saved to the user's account.

## Tech stack

| Area | Technology |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend | Python, Flask, Flask-CORS |
| AI integration | OpenAI API |
| Database | PostgreSQL, psycopg2 |
| Authentication | Werkzeug password hashing |

## Project structure

```text
src/
├── frontend/             # React views, questionnaire, and API services
├── backend/
│   ├── controller/       # Flask routes and recommendation pipeline
│   └── model/            # PostgreSQL connection and queries
├── data/                 # Prototype and test data
└── css/                  # Page-level styling
```

## Running locally

### Requirements

- Node.js and npm
- Python 3.10+
- PostgreSQL
- An OpenAI API key

Install the frontend dependencies:

```bash
npm install
npm run dev
```

Install the backend dependencies:

```bash
python -m venv .venv
python -m pip install -r src/backend/requirements.txt
```

The backend reads its configuration from environment variables:

```text
OPENAI_API_KEY=
DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_PORT=
PORT=5000
```

> The repository currently requires an existing database schema and curated course/university data. A reproducible migration and seed-data setup is a planned improvement.

## Responsible use

- Recommendations are advisory and should not replace independent research.
- The model is constrained to the courses and universities supplied by the application.
- The prototype uses a small curated dataset and does not scrape university websites.
- The questionnaire is not intended to collect sensitive personal data.

## Future improvements

- Add database migrations and seed data for one-command setup
- Validate model output against a strict JSON schema
- Add automated tests for API routes and recommendation constraints
- Expand the curated dataset and expose data provenance
- Add deployment documentation and a live demo


