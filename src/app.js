import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bfhlRoutes from './routes/bfhlRoutes.js';

dotenv.config();

// 1️⃣ FIRST create app
const app = express();

// 2️⃣ THEN middleware
app.use(cors());
app.use(express.json());

// 3️⃣ THEN routes
app.use('/bfhl', bfhlRoutes);


// 4️⃣ health endpoint
app.get('/health', (req, res) => {
  res.json({
    is_success: true,
    official_email: process.env.OFFICIAL_EMAIL || "test@chitkara.edu.in"
  });
});
app.post('/test', (req, res) => {
  res.json({ msg: "test route works" });
});

// 5️⃣ THEN start server
const PORT = process.env.PORT || 3000;
console.log("Routes loaded");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
