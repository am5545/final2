const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

// Create note schema
const noteSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Note = mongoose.model("Note", noteSchema);

const uri = "mongodb+srv://am5545:am5545@cluster0.rfcivnw.mongodb.net/?retryWrites=true&w=majority"

async function connect(){
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch(error){
    console.error(error);
  }
}

connect();


app.use(express.json());
app.use(cors());

app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post('/notes', async (req, res) => {
  const newNote = new Note(req.body);
  await newNote.save();
  res.json(newNote);
});

app.delete('/notes/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Note deleted' });
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
