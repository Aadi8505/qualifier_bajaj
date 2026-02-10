# Bajaj Finserv Health – BFHL API
## Live Deployment
Base URL: https://qualifier-bajaj.onrender.com

## Overview
This project implements two REST APIs as per the Bajaj Finserv Health qualifier.

POST /bfhl supports:
- fibonacci
- prime
- lcm
- hcf
- AI

GET /health returns success status and official email.

## Tech Stack
- Node.js
- Express
- Axios
- Google Gemini AI
- Render Deployment

## How to Run Locally

git clone <your-repo>
npm install

Create .env file:
OFFICIAL_EMAIL=your_email
GEMINI_API_KEY=your_key
PORT=3000

npm run dev

## Sample Requests

Fibonacci:
{ "fibonacci": 7 }

Prime:
{ "prime": [2,4,7,9,11] }

LCM:
{ "lcm": [12,18,24] }

HCF:
{ "hcf": [24,36,60] }

AI:
{ "AI": "Capital of Maharashtra?" }

## Features
- Input validation
- Correct HTTP codes
- Modular structure
- AI integration
- Public API

## Author
Aaditya Kumar  
Chitkara University  
aaditya1003.be23@chitkarauniversity.edu.in

