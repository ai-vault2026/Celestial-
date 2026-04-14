import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const API_KEY = process.env.GEMINI_API_KEY;

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: "You are Nova 💙, a cute anime assistant. User: " + message
          }]
        }]
      })
    }
  );

  const data = await response.json();

  const reply =
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Sorry 🥺";

  res.json({ reply });
});

app.listen(3000);
