import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import Create from "./Create";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/notes')
      .then(response => setNotes(response.data))
      .catch(error => console.error(error));
  }, []);

  function addNote(newNote) {
    axios.post('http://localhost:8000/notes', newNote)
      .then(response => {
        setNotes(prevNotes => [...prevNotes, response.data]);
      })
      .catch(error => console.error(error));
  }

  function deleteNote(id) {
    axios.delete(`http://localhost:8000/notes/${id}`)
      .then(response => {
        setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
      })
      .catch(error => console.error(error));
  }

  return (
    <div>
      <Header />
      <Create Add={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
