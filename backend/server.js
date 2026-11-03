import "dotenv/config"
import express from "express"
import multer from "multer"
import cors from "cors"
import fs from "fs"
import { GoogleGenAI } from "@google/genai"
import mongoose from "mongoose"
import Groq from "groq-sdk"

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((e) => console.log("MongoDB error:", e.message))

const app = express()
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use("/uploads", express.static("uploads"))

//For deleting an item
app.delete("/api/items/:id", async (req, res) => {
  try {
    const deleted = await item.findByIdAndDelete(req.params.id)   // ✅ item (lowercase)
    if (deleted) fs.unlink("uploads/" + deleted.image, () => {})
    res.json({ deleted: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})




const upload = multer({ dest: "uploads/" });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY})
const groq = new Groq({ apiKey: process.env.GROQ_KEY })

const itemSchema = new mongoose.Schema({
    image: String,
    category: String,
    subcategory: String,
    colors: [String],
    style: String,
    occasions: [String],
})

const item = mongoose.model("Item", itemSchema)


const MODELS = ["gemini-3.8-flash", "gemini-2.5-flash-lite", "gemini-2.5-flash"]


async function tagImage(imagePath, mimeType) {

    const b64 = fs.readFileSync(imagePath).toString("base64")

    const prompt = `Look at this clothing image and return ONLY a JSON object:
    {"category": "top|bottom|shoes|outerwear|dress|accessory",
     "subcategory": "short description",
     "colors": ["main colors"],
     "style": "casual|formal|party|sporty|smart-casual",
     "occasions": ["college","casual","date","party","formal"]}`;

     const timeoutPromise =  new Promise((_,reject) => 
        setTimeout(() => reject(new Error("AI request timed out - try again later")), 3000)
    )

     for(const modelName of MODELS) {
        try {
            console.log(`Trying model: ${modelName}...`)
            const apiPromise = ai.models.generateContent({
            model: modelName,
            contents: [
                {inlineData: { data: b64, mimeType: mimeType } },
                { text: prompt },
            ],
        });

        const result = await Promise.race([apiPromise, timeoutPromise])

        const text = result.text.replace(/```json|```/g, "").trim();
        return JSON.parse(text);

        } catch (e) {
            console.log(`${modelName} failed: ${e.message}`)
            if(modelName === MODELS[MODELS.length - 1]) throw e
        }
     }
}

async function tagImageGroq(b64, mimeType) {
  const prompt = `Look at this clothing image and return ONLY a JSON object:
{"category": "top|bottom|shoes|outerwear|dress|accessory",
 "subcategory": "short description (main color + item, e.g. 'White Jeans', 'Black Oversized T-shirt')",
 "colors": ["main colors"],
 "style": "casual|formal|party|sporty|smart-casual",
 "occasions": ["college","casual","date","party","formal"]}`

  const chat = await groq.chat.completions.create({
    model: "qwen/qwen3.8-27b",
    messages: [{
      role: "user",
      content: [
        { type: "image_url", image_url: { url: `data:${mimeType};base64,${b64}` } },
        { type: "text", text: prompt }
      ]
    }],
    response_format: { type: "json_object" }   // yeh JSON force karta hai — Gemini se better!
  })

  return JSON.parse(chat.choices[0].message.content)
}

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    console.log("Photuuu: ", req.file.originalname)

    let tags = null

    // Layer 1: Gemini (3 models try karega)
    // try {
    //   tags = await tagImage(req.file.path, req.file.mimetype)
    //   console.log("Gemini ne bola:", tags)
    // } catch (e) {
    //   console.log("Gemini failed:", e.message)
    // }

    // Layer 2: Groq (Gemini fail/timeout pe)
    if (!tags) {
      console.log("Falling back to Groq...")
      const b64 = fs.readFileSync(req.file.path).toString("base64")
      tags = await tagImageGroq(b64, req.file.mimetype)
      console.log("Groq ne bola:", tags)
    }

    const saved = await item.create({
      image: req.file.filename,
      ...tags,
    })
    console.log("Saved to DB: ", saved._id)

    res.json({
      ...tags,
      _id: saved._id,
      imageUrl: `http://localhost:3000/uploads/${saved.image}`,
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: "Dono AI providers busy hain",
      details: error.message,
    })
  }
})

app.get("/items", async (req,res) => {
    const items = await item.find()
    res.json(items.map(i => ({
        ...i.toObject(),
        imageUrl: `http://localhost:3000/uploads/${i.image}`
    })))
})

app.listen(3000, () => {
    console.log("Server chal rha hai")
})