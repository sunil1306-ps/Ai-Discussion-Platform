const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const questionSchema = require('./questionModel')
const axios = require('axios')
const { GoogleGenerativeAI } = require('@google/generative-ai')
require("dotenv").config()

const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            
    optionSuccessStatus:200
};
const app = express();
const port = 3000;
const db_string = "mongodb+srv://sunil:mangomango@cluster0.dsa6r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const genAI = new GoogleGenerativeAI("Google API Key");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const prompt = `You are an AI assistant specializing in providing helpful, well-structured answers based on insights from developer and community-driven platforms like Stack Overflow, Reddit, and Quora. When answering, adapt your response based on the type of question:

1️⃣ **Technical Questions (e.g., programming, debugging, best practices)**
   - Provide clear, concise, and structured solutions.
   - Include **code snippets**, examples, and best practices.
   - Reference common **errors, libraries, and frameworks**.

2️⃣ **Opinion-Based & Discussion Questions (e.g., "What is the best framework?", "Which is better, X or Y?")**
   - Provide a balanced perspective with **pros & cons**.
   - Encourage critical thinking rather than giving a single "correct" answer.

3️⃣ **General Knowledge & Explanatory Questions (e.g., "How does AI work?", "Explain databases")**
   - Answer in an **easy-to-understand, educational** style.
   - Use **analogies, examples, and real-world comparisons**.

4️⃣ **Personal & Career Advice Questions (e.g., "How do I get a remote dev job?", "Best way to learn Python?")**
   - Offer **actionable insights** with step-by-step guidance.

   #consider the following for every response...!
   You are answering a technical question. If the answer contains mathematical expressions, format them using Markdown and LaTeX syntax.

    For inline equations, use "$...$", like this: "$E=mc^2$".

    For block equations, use "$$...$$", like this:
    $$
    F(x) = \int_a^b f(t)dt
    $$

    Make sure all equations are properly enclosed in $ or $$ so they render correctly in Markdown.
    The answers should be precise and on point avoid extra information that might not needed keep answers as clean and short as possible


📌 **Tone & Style:**
- Keep responses **engaging yet professional**.
- Ensure clarity, avoiding unnecessary complexity.
Note: you don't need to include keywords like certainly! in the beginning of the response also don't provide the reasoning like This is a technical question related to programming and debugging, so I'll provide a clear, concise, and structured solution with code snippets and best practices.
start with the answer directly like a human who is explaining the doubts to other.
- Wrap the math equations in inline ($..$) or block ($$..$$) delimiters and also i am using react markdown with plugins like remarkMath and rehypeKatex keep that in mind and use proper delimiters for according to them in the response.

**Now, answer the following question using the most relevant approach based on its type:**
`;

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

mongoose.connect(db_string).then(
    () => {
        console.log('DB connected...');
    }
).catch((error) => {console.log(error)});


app.get('/', (req, res) => {
    res.send("<p>Server running...</p>")
});

app.post("/post-question", async (req, res) => {

    try {
        const { title, question } = req.body;
        const cleanedTitle = title.trim();
        const cleanedQuestion = question.trim();

        if(!cleanedQuestion || !cleanedTitle) {
            return res.status(400).json({ error: "Question or title is missing..." });
        }
        // mistral response api call
        const mresponse = await axios.post(
            MISTRAL_API_URL,
            {
                model: "mistral-large-latest", 
                messages: [
                    { role: "system", content: prompt },
                    { role: "user", content: cleanedQuestion }
                ],
            },
            {
                headers: {
                Authorization: `Bearer ${MISTRAL_API_KEY}`,
                "Content-Type": "application/json",
                },
            }
        );

        // google response api call
        const result = await model.generateContent(`${prompt} ${cleanedQuestion}`);

        const mistralResponse = mresponse.data.choices[0].message.content;
        const googleResponse = result.response.text();
    
        const newQuestion = new questionSchema({ title: cleanedTitle, question: cleanedQuestion, mistralResponse: mistralResponse, googleResponse: googleResponse });
        await newQuestion.save();

        res.json({message: "Question received successfully", newQuestion});

    } catch(error) {
        console.log("ai error:", error);
        res.status(500).json({error: "Internal server error"});
    }

});

app.get("/get-questions", async (req, res) => {

    try {
        const questions = await questionSchema.find();
        res.json({ questions });
    } catch(error) {
        res.status(500).json({ error: "Internal Server Error" });
        console.log(error);
    }

});

app.get("/get-questions/:id", async (req, res) => {

    try {
        const question = await questionSchema.findById(req.params.id);
        res.json({ question });
    } catch(error) {
        res.status(500).json({ error: "Internal Server Error" });
        console.log(error);
    }

});

app.delete("/api/questions/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedQuestion = await questionSchema.findByIdAndDelete(id);
  
      if (!deletedQuestion) return res.status(404).json({ error: "Question not found" });
  
      res.json({ message: "Question deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

app.listen(port, () => {
    console.log("server started at port " + port)
})
