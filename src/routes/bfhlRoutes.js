import express from 'express';
import { askAI } from '../services/aiService.js';

const router = express.Router();

// ----- Helper Functions -----

const fibonacciSeries = (n) => {
  let fib = [0, 1];
  for (let i = 2; i <= n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib.slice(0, n + 1);
};

const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const lcm = (arr) => {
  const gcd = (a, b) => (!b ? a : gcd(b, a % b));
  return arr.reduce((a, b) => (a * b) / gcd(a, b));
};

const hcf = (arr) => {
  const gcd = (a, b) => (!b ? a : gcd(b, a % b));
  return arr.reduce((a, b) => gcd(a, b));
};

// ----- MAIN ROUTE -----

router.post('/',async (req, res) => {

  const body = req.body;

  const response = {
    is_success: true,
    official_email: process.env.OFFICIAL_EMAIL || "test@chitkara.edu.in",
    data: null
  };

  // 1. Fibonacci
  if (body.fibonacci !== undefined) {
    const n = body.fibonacci;

    if (typeof n !== 'number' || n < 0) {
      return res.status(400).json({
        is_success: false,
        official_email: response.official_email,
        data: "Invalid fibonacci input"
      });
    }

    response.data = fibonacciSeries(n);
    return res.json(response);
  }

  // 2. Prime
  if (body.prime !== undefined) {
    const arr = body.prime;

    if (!Array.isArray(arr)) {
      return res.status(400).json({
        is_success: false,
        official_email: response.official_email,
        data: "Prime expects array"
      });
    }

    response.data = arr.filter(isPrime);
    return res.json(response);
  }

  // 3. LCM
  if (body.lcm !== undefined) {
    const arr = body.lcm;

    response.data = lcm(arr);
    return res.json(response);
  }

  // 4. HCF
  if (body.hcf !== undefined) {
    const arr = body.hcf;

    response.data = hcf(arr);
    return res.json(response);
  }

  // 5. AI – next step
// 5. AI
if (body.AI !== undefined) {

  const question = body.AI;

  if (typeof question !== 'string') {
    return res.status(400).json({
      is_success: false,
      official_email: response.official_email,
      data: "AI expects string"
    });
  }

  try {
    const aiAns = await askAI(question);
    response.data = aiAns;
    return res.json(response);

  } catch (err) {
    return res.status(500).json({
      is_success: false,
      official_email: response.official_email,
      data: "AI service error"
    });
  }
}

  return res.status(400).json({
    is_success: false,
    official_email: response.official_email,
    data: "No valid key provided"
  });

});

export default router;
